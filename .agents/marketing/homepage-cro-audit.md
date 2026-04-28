# MCI Eyelashes — Homepage CRO Audit

> Skill: page-cro v1.1.0 · Generated: 2026-04-18  
> Page: mci-eyelashes.com (Homepage)  
> Goal: Wholesale inquiry submissions / sample requests  
> Traffic: Organic search, cold outreach, international B2B referrals  

---

## Summary

The homepage is visually polished and signals premium quality well. The core problem is **conversion friction at the decision layer** — visitors who are ready to buy don't have a fast path, and visitors who aren't ready have nothing to keep them warm. The page optimizes for aesthetics over commerce.

**Estimated conversion opportunity:** Medium-high. The product and trust signals are strong; the gaps are structural.

---

## Quick Wins (Implement Now)

### 1. Fix the CTA hierarchy in the hero

**Current:** "View Products" (primary) + "Request Wholesale" (secondary)

**Problem:** "View Products" sends warm wholesale buyers deeper into the page when they already know what they want. The primary CTA should drive the highest-value action.

**Fix:**
```
Primary CTA:   "Request Wholesale Pricing →"   (links to #contact)
Secondary CTA: "Browse Collections"             (links to #products)
```

For cold/organic traffic unfamiliar with MCI, the current order works. But test swapping for paid/cold-email traffic where prospect intent is already established.

---

### 2. The contact form opens an email client — this kills conversions

**Current behavior:** Submitting the form runs `window.location.href = mailto:...` which opens the visitor's email client. This:
- Fails entirely on mobile in many browsers
- Creates a jarring UX break
- Has zero submission tracking (can't see where leads come from)
- Can fail silently

**Fix:** Wire the form to a real backend (Resend, SendGrid, or Klaviyo form endpoint). A simple Resend/Vercel serverless function handles this in ~20 lines. Alternatively, a Netlify/Vercel form with email notification.

This is the highest-ROI technical fix on the page.

---

### 3. Add a "Request Samples" CTA near the top of the page

**Problem:** Sample requests are buried in the FAQ and Gallery. For B2B buyers, samples are the primary trust-building step — they should be offered proactively, not discovered.

**Fix:** Add a persistent secondary CTA strip or banner just below the hero stats:

> "Not ready to order yet? Request a sample kit — credited toward your first order."  
> [Request Samples] button → pre-fills the form with Inquiry Type: "Sample Request"

---

### 4. Subheadline is too vague

**Current:** *"Supplying premium handcrafted eyelashes to salons, distributors, and beauty brands worldwide. Private label & OEM services available with competitive wholesale pricing."*

**Problem:** Every lash supplier says this. It doesn't differentiate, and it doesn't say why MCI specifically.

**Alternatives (test one):**

- *"Factory-direct lashes from Indonesia. MOQ 100 pairs. Ships in 3–7 days. ISO 9001 certified."* — specificity over aspiration
- *"500+ lash brands and salons in 50 countries trust MCI as their manufacturer. ISO 9001 · CE · FDA compliant."* — social proof anchored
- *"Private label lashes from the factory. 500-unit MOQ, full custom packaging, ready in 6–10 weeks."* — OEM-focused for brand founders

Pick one based on primary audience. The current headline is optimized for no one.

---

### 5. The "Response Time" contact detail is buried

**Current:** "Within 24 hours" appears as a small item in the contact section.

**Problem:** International B2B buyers worry about being ghosted or waiting days for a reply. 24-hour response is a genuine differentiator — it should appear near every CTA, not just in the footer.

**Fix:** Add "We reply within 24 hours" as a micro-copy line directly below both hero CTAs and the contact form submit button.

---

## High-Impact Changes (Prioritize)

### 6. The contact section doesn't earn commitment

**Problem:** The contact form is generic. Wholesale buyers at decision stage need reassurance immediately before they fill out a form. Right now there's nothing between scrolling to the contact section and seeing a blank form.

**Fix — Add a conversion banner above the form:**
```
★★★★★ Trusted by 500+ lash businesses in 50 countries
"Switched from our old supplier 3 years ago — never looked back." — Luxe Lash Studio, USA

ISO 9001  ·  CE Certified  ·  FDA Compliant  ·  Cruelty-Free  ·  PETA Approved
```

This puts social proof and trust signals exactly where the conversion decision is being made, not three scrolls earlier in the testimonials section.

---

### 7. No urgency or scarcity signal anywhere

**Problem:** The page has no reason to act now vs. later. Wholesale buyers in research mode will close the tab and never return.

**Fix options (pick the most honest one):**

- *"Production slots for Q2 are filling — OEM orders placed before May 15 ship in June."* — honest if true
- *"Sample kits are allocated monthly — request yours before the current batch ships."* — creates soft scarcity
- *"New wholesale accounts this month receive free shipping on their first order."* — incentive-based

Even a weak urgency signal lifts conversion meaningfully for buyers who are on the fence.

---

### 8. Pricing tiers don't tell buyers which tier is theirs

**Current tiers:** Starter (100+), Growth (500+), Scale (1,000+) — displayed in the contact section.

**Problem:** A new visitor doesn't know if they're a "Starter" or "Growth" buyer. The tier names are internal language. Buyers think in order size and use case, not tier names.

**Fix — Reframe as buyer profiles:**

| Instead of... | Use... |
|---|---|
| Starter | "New to wholesale" — 100+ pairs, mix & match |
| Growth | "Established salon / brand" — 500+ pairs, private label available |
| Scale | "Distributor / volume buyer" — 1,000+ pairs, net terms, free shipping |

Add a one-line "Who this is for" description under each. Buyers self-select faster.

---

### 9. Products section has no conversion path for browsers

**Current:** Products section ends with a "Request Quote" mailto link per product.

**Problem:** Visitors browsing products who aren't ready to request a quote have nowhere to go. You lose them.

**Fix — Add two micro-CTAs per product:**
1. "Request a sample of this style" → pre-fills form
2. "Get wholesale pricing" → jumps to contact with type pre-filled

Additionally, the current layout shows specs but no pricing range. Even a "From $2.50/pair wholesale" anchor price would reduce email back-and-forth and qualify prospects earlier.

---

### 10. Mobile experience: hero stats likely wrap poorly

**Current:** 4 stats in a flex row with `gap: 40px`. On mobile (<430px), this likely wraps into a 2x2 grid with awkward spacing.

**Check:** Test on iPhone 13 mini. If the stats are wrapping, change the flex row to a 2-column CSS grid with consistent cell sizes. Stats are a key trust signal — they should always look intentional.

---

## Test Ideas

### A: Hero headline variant

- Control: "World-Class Eyelash Manufacturer"
- Variant A: "Premium Lash Manufacturer. Factory-Direct Pricing."
- Variant B: "Your Lash Supplier — ISO Certified, Ships Worldwide"

Hypothesis: Specificity + proof ("ISO certified," "factory-direct") outperforms aspiration ("World-Class") with B2B buyers who are evaluating multiple suppliers.

---

### B: Primary CTA copy

- Control: "View Products" + "Request Wholesale"
- Variant A: "Get Wholesale Pricing" + "Browse Collections"
- Variant B: "Request a Sample Kit" + "See Products"

Hypothesis: Changing primary CTA from product-browsing to pricing/sampling intent will increase contact form fills from warm visitors.

---

### C: Social proof placement

- Control: Testimonials section appears after Gallery (~5 scrolls down)
- Variant: Add a single testimonial card directly in the hero, below stats

Hypothesis: One well-chosen testimonial in the hero ("500+ partners in 50 countries trust MCI — here's why") will increase time-on-page and contact form fills from first-time visitors.

---

### D: Form friction reduction

- Control: 5-field form (Name, Company, Email, Inquiry Type, Message)
- Variant: 3-field form (Name, Email, Message) with inquiry type auto-populated based on referral source

Hypothesis: Fewer fields increases form completion rate. Company name and inquiry type can be gathered in the follow-up email.

---

## Copy Alternatives

### Hero Headline Options

1. **Specificity play:**  
   "Premium Lashes.  
   Factory-Direct.  
   100 Pair MOQ."

2. **Social proof play:**  
   "500+ Lash Brands  
   Start Here."

3. **OEM-first play:**  
   "Build Your Lash Brand.  
   We're the Factory Behind It."

---

### Contact Section Headline Options

| Current | Alternative |
|---|---|
| "Start Your Wholesale Partnership" | "Get Wholesale Pricing in 24 Hours" |
| — | "Order Samples. Test the Quality. Then Decide." |
| — | "Your Factory Partner, From 100 Pairs to 100,000" |

---

### Form CTA Button Options

| Current | Alternative |
|---|---|
| "Send Inquiry →" | "Get Wholesale Pricing" |
| — | "Request My Sample Kit" |
| — | "Start My Order" |

---

## Implementation Priority

| Priority | Item | Effort | Impact |
|---|---|---|---|
| 1 | Fix form to real backend (stop mailto) | Medium | Very High |
| 2 | Swap hero CTA order | Low | High |
| 3 | Add social proof banner above contact form | Low | High |
| 4 | Add sample request CTA below hero | Low | Medium-High |
| 5 | Rewrite hero subheadline | Low | Medium |
| 6 | Reframe pricing tiers with buyer profiles | Low | Medium |
| 7 | Add urgency signal | Low | Medium |
| 8 | Add anchor pricing to product cards | Medium | Medium |
| 9 | A/B test hero CTA copy | Medium | Medium |
| 10 | Audit mobile hero stats layout | Low | Low-Medium |
