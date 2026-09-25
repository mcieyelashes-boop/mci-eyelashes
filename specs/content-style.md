# Content style and quality bar

Read this before writing any landing page or blog post. `npm run check:content`
enforces the mechanical half of it, and the build refuses to run if a new page
fails. The other half is judgment, so the process at the bottom is not optional.

## The point

A page earns its place when a buyer, or an AI assistant answering a buyer, can
use it to make a decision. One good page beats two padded ones. If a queue item
cannot reach that bar with confirmed facts, hold it (see "Holding an item").

## Facts

- Only owner-confirmed facts about MCI. The short list is in the weekly prompt,
  `CLAUDE.md`, and `specs/confirmed-facts.json`. Product details come from
  `src/pages/Catalogue.jsx`, read fresh each run.
- General industry knowledge (how curls differ, what a band is, how sampling
  works) is allowed when it is true, stated plainly, and not tied to an
  invented number. If you are not sure it is true, leave it out.
- No prices, percentages, market sizes, "typical" lead times, years in business,
  client counts, certifications, rankings, or named competitors. The gate blocks
  most of these. A worked example with made-up numbers is allowed only when the
  paragraph says it is an example.
- Unknown value? Write around it. Never fill the gap with something plausible.

## What earns the words

Landing pages need at least 500 words of body text, blog posts 600. Get there
with material a buyer can use, never with restating the same fact:

- Who this product suits and who it does not. Saying "not for you if" builds trust.
- How to choose between the real options (the series and styles in the catalogue).
- What a first order looks like: sample, then 100 pairs per style, mix and match.
- What to put in the inquiry so the quote comes back faster.
- The questions buyers actually ask, answered in full sentences with the real terms.
- Where this page sits next to the others, with links a reader would want.

Each page needs a different angle from every page already on the site. The gate
compares wording, but the real test is whether a reader who saw the other page
learns something new here.

## Voice

Write as the factory speaking to one buyer. Use "we" and "you". Short words.
Name the real thing: the collection, the material, the series, the number of
working days. Mix sentence lengths. Start some sentences with the buyer's
problem, not our product.

Do not write:

- Empty vocabulary: unlock, elevate, seamless, cutting-edge, robust, leverage,
  empower, world-class, industry-leading, journey, testament, landscape.
- Rhythm tells: "not just X, but Y", three-part lists for every idea, runs of
  short fragments for drama, "from A to Z" ranges.
- Announcements and filler: "let's dive in", "it is important to note",
  "in order to", "look no further", "get started today".
- Em dashes, en dashes, double hyphens, emoji, ALL-CAPS emphasis, bold on every
  key term, quotation marks around ordinary words.
- Generic headings (Introduction, Conclusion, Final thoughts). A heading says
  what the section tells the reader. Do not close with an upbeat summary; end
  on the last useful fact or a specific next step.
- Trust claims with nothing behind them. If it cannot be shown, cut it.

Before: "Unlock seamless sourcing with our world-class factory."
After: "Send us the styles and pair counts you want and we quote from the catalogue."

## Process for every page

1. Draft from confirmed facts and the catalogue.
2. Audit your own draft and write down two answers: what in this reads as
   machine-written, and which sentence states something not in the source.
   Fix both.
3. Run `npm run check:content`. It must end with "Content quality gate passed".
   Read every warning too. A warning on a new page is a reason to rewrite, not
   to ignore.
4. Read the page aloud in your head. If a sentence could sit on any competitor's
   site unchanged, replace it with something only MCI can say, or delete it.
5. Only then build, commit and push.

## Holding an item

If the item cannot pass without inventing a fact or padding, do not publish it.
Change its row in `specs/seo-content-queue.md` to `held (short reason)`, add a
Log line saying what the owner would need to supply, and use the next pending
item instead. Publishing fewer pages is fine. Publishing a weak page is not.
