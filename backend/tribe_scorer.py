"""
TRIBE v2 brain-response scorer.

In production (GPU server):
  pip install tribev2 @ git+https://github.com/facebookresearch/tribev2.git torch

Without GPU / model weights, falls back to deterministic mock scores so the
API still runs and returns valid JSON.
"""

import hashlib
import logging
from pathlib import Path

import numpy as np

log = logging.getLogger(__name__)

BRAIN_REGIONS = ["visual", "auditory", "limbic", "pfc", "motor"]

# ── Try to load TRIBE v2 ────────────────────────────────────

_model = None
_tribe_available = False

try:
    from tribev2 import TribeModel  # type: ignore
    _model = TribeModel.from_pretrained("facebook/tribev2")
    _tribe_available = True
    log.info("TRIBE v2 model loaded from HuggingFace")
except Exception as exc:
    log.warning("TRIBE v2 not available (%s). Using mock scores.", exc)


# ── fMRI activation → virality region scores ───────────────

def _preds_to_scores(preds: np.ndarray) -> dict[str, int]:
    """
    Convert TRIBE v2 fMRI predictions to per-region virality scores (0–100).

    preds: (n_segments, n_vertices) — fsaverage5 cortical mesh activations.

    The temporal decomposition (early/mid/late) is a principled proxy:
    early TR windows capture rapid sensory responses (V1/A1),
    mid windows capture limbic integration,
    late windows capture prefrontal and motor preparation.
    """
    n_t = preds.shape[0]
    thirds = max(1, n_t // 3)

    early = np.abs(preds[:thirds]).mean(axis=0)
    mid   = np.abs(preds[thirds:2 * thirds]).mean(axis=0)
    late  = np.abs(preds[2 * thirds:]).mean(axis=0)
    full  = np.abs(preds).mean(axis=0)

    # Raw scores from percentile activations across cortical vertices
    raw = {
        "visual":   float(np.percentile(early, 80)),
        "auditory": float(np.percentile(early, 65)),
        "limbic":   float(np.percentile(mid,   85)),
        "pfc":      float(np.percentile(late,  75)),
        "motor":    float(np.percentile(late,  82)),
    }

    # Normalise to [45, 90] — range that yields meaningful virality labels
    peak = max(raw.values()) or 1.0
    return {k: min(100, max(0, int(45 + (v / peak) * 45))) for k, v in raw.items()}


# ── Mock fallback ───────────────────────────────────────────

def _mock_scores(seed: str) -> dict[str, int]:
    digest = int(hashlib.sha256(seed.encode()).hexdigest(), 16)
    scores = {}
    for i, region in enumerate(BRAIN_REGIONS):
        scores[region] = 45 + ((digest >> (i * 8)) & 0xFF) % 46
    return scores


def _overall(regions: dict[str, int]) -> int:
    return round(sum(regions.values()) / len(regions))


# ── Public API ──────────────────────────────────────────────

def score_file(path: str | Path) -> dict:
    """Score a local video file using TRIBE v2 or mock fallback."""
    path = Path(path)

    if _tribe_available and _model is not None:
        try:
            df = _model.get_events_dataframe(video_path=str(path))
            preds, _ = _model.predict(events=df)
            regions = _preds_to_scores(np.array(preds))
            return {"overall": _overall(regions), "regions": regions, "model": "tribev2"}
        except Exception as exc:
            log.error("TRIBE v2 inference failed for %s: %s", path, exc)

    regions = _mock_scores(path.name)
    return {"overall": _overall(regions), "regions": regions, "model": "mock"}


def score_url(video_url: str) -> dict:
    """
    Score a video from a URL.

    Downloads to a temp file, then runs score_file().
    Falls back to mock if download or inference fails.
    """
    import tempfile
    import httpx

    if _tribe_available and _model is not None:
        try:
            with tempfile.NamedTemporaryFile(suffix=".mp4", delete=False) as tmp:
                with httpx.stream("GET", video_url, follow_redirects=True, timeout=60) as r:
                    r.raise_for_status()
                    for chunk in r.iter_bytes(chunk_size=1 << 20):
                        tmp.write(chunk)
                tmp_path = tmp.name
            return score_file(tmp_path)
        except Exception as exc:
            log.error("URL download/scoring failed for %s: %s", video_url, exc)

    regions = _mock_scores(video_url)
    return {"overall": _overall(regions), "regions": regions, "model": "mock"}
