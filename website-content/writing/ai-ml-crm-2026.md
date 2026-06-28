---
title: "What AI/ML is actually capable of in CRM in 2026"
date: 2026-06-24
summary: "A practitioner's read on the achievable band for AI/ML-driven CRM — the four platform shapes, the lifecycle of a single message, and where predictive and generative models each earn their keep, anchored to the public results that bound every number."
publication: Self
tags: [ai, ml, crm, communications, growth]
featured: true
---

Modern CRM runs on AI/ML — systems that decide, per user and in real time, who gets a message, what it says, and when and where it lands. The gains are real but bounded, and they materialise only on two conditions: the right number measured, and the stack built in the right order. Most programmes satisfy neither, then conclude the literature overpromised. It did not; they undershipped.

What follows is the version without the marketing: what is achievable, in what order, and what specifically must hold for it to be real. The references stay inline — Pinterest, Twitter, Kuaishou — because they're the public anchors any programme should be benchmarked against, and because most of what's quietly working in production was published years ago. The techniques aren't secret. The order of operations is where everyone goes wrong.

## Why this article exists

Almost every CRM review opens with the wrong number. The team points at open or click-through rate, argues whether last month's headline refresh moved either, and leaves with a hypothesis that was never measurable to begin with. That number reflects *what the user did after seeing the message* — not *what the message caused*. On a properly measured pipeline, those are not the same thing.

There's only one number that anchors the conversation: incremental lift on a Global Control Group (GCG) — the share of business outcomes that would not have happened without the message. Most teams don't measure it. The ones that do find a band of achievable outcomes far narrower than the vendor decks suggest, and a much sharper picture of which mechanics in the stack are actually paying for themselves.

One distinction runs through the whole thing: the AI/ML in a comms stack isn't one model but a family of them — predictive models that decide who and when, and generative models that write what. Almost every number in the band below comes from the predictive side; the generative side earns its keep in a few specific places. The section on where AI/ML plugs in maps which job goes to which.

## The achievable envelope

Before any architecture debate, settle the envelope. These are the bands mature CRM programmes at scale operate inside — each anchored to a published result, not a vendor promise. The headroom is narrower than the decks suggest.

<figure class="fig">
<div class="viz">
<div class="bands">
<div class="band"><div class="bandhead"><span class="bandname">Incremental lift on GCG</span><span class="bandval">1–3%</span></div><div class="track"><div class="fill" style="left:25%;width:50%"></div><div class="tick" style="left:75%"><span>Pinterest +3%</span></div></div></div>
<div class="band"><div class="bandhead"><span class="bandname">Unsubscribe rate</span><span class="bandval">under 1%</span></div><div class="track"><div class="fill" style="left:8.3%;width:16.7%"></div><div class="tick" style="left:83.3%"><span>1% ceiling</span></div></div></div>
<div class="band"><div class="bandhead"><span class="bandname">Engagement lift (content + send-time)</span><span class="bandval">8–15%</span></div><div class="track"><div class="fill" style="left:40%;width:35%"></div><div class="tick" style="left:39.8%"><span>Twitter +7.96%</span></div><div class="tick" style="left:70.4%"><span>Kuaishou +14.08%</span></div></div></div>
<div class="band"><div class="bandhead"><span class="bandname">Volume cut at parity engagement</span><span class="bandval">20–30%</span></div><div class="track"><div class="fill" style="left:57.1%;width:28.6%"></div><div class="tick" style="left:16.5%"><span>Twitter −5.79%</span></div><div class="tick" style="left:68.6%"><span>Pinterest −24%</span></div></div></div>
</div>
</div>
<figcaption>Where mature CRM at scale actually lands on four headline metrics. Bands are practitioner ranges synthesised from the cited literature; ticks mark specific published results — Pinterest NEP (KDD 2018), Twitter/O'Brien (arXiv 2202.08812), Kuaishou PushGen (WSDM 2026).</figcaption>
</figure>

Four numbers frame the whole thing. **Incremental business-metric lift: 1–3%** on a 1–5% holdout. **Unsubscribe rate: under 1%**, best-in-class in the low tenths of a percent — and it's the constraint, not a KPI. **Engagement-rate lift from content and send-time: 8–15% relative.** **Volume reduction at parity engagement: 20–30%.** The lift sounds small because it's small per send and large in aggregate — a 1.5% session lift across a 200M MAU platform is on the order of three million extra sessions a day.

The arithmetic that turns this into a case is straightforward. On an illustrative platform — 50M MAU, $1B annual revenue — 1–3% incremental on the holdout is $10–30M a year at maturity. The programme that delivers it runs maybe 12–25 FTEs plus infrastructure — call it $3–5M fully loaded. Base case: a 3–6× annual return, and higher once you count the paid re-acquisition you no longer pay for (Adobe pegs personalization at 1.7× faster revenue growth and 2× lifetime value). The line that gets the least attention is the volume cut: most mature systems over-send by a quarter to a third, and reclaiming that attention budget pays better than squeezing more clicks out of each retained send. The results that anchor the bands:

<figure class="fig">
<div class="viz">
<div class="statgrid">
<div class="statcard"><div class="src">Pinterest NEP · email-only</div><div class="big">−24%</div><div class="desc">notification volume, at +31% CTR</div><div class="cite">KDD 2018</div></div>
<div class="statcard"><div class="src">Pinterest NEP · mixed</div><div class="big">+3%</div><div class="desc">DAU, with +10–21% email/push CTR</div><div class="cite">KDD 2018</div></div>
<div class="statcard"><div class="src">Twitter · O'Brien</div><div class="big">−5.79%</div><div class="desc">sends, at +7.96% open rate, +0.20% DAU</div><div class="cite">arXiv 2202.08812</div></div>
<div class="statcard"><div class="src">Kuaishou · PushGen</div><div class="big">+14.08%</div><div class="desc">CTR on replaced pushes; beat-rate 44→83%</div><div class="cite">WSDM 2026</div></div>
</div>
</div>
<figcaption>The public anchors for every band above. None of these numbers exists without a Global Control Group — the one piece of infrastructure that turns CRM from a vibes-driven function into a measurable one. Per eMarketer/TransUnion (July 2025), 52% of US marketers now run incrementality testing in some form.</figcaption>
</figure>

Five GCG design choices are worth getting right early: *size* (1–5% — bigger is cleaner measurement but more foregone revenue per day); *persistence* (a continuously-excluded holdout reads fatigue and wear-out; a re-randomized one gives more power per period but no long-run signal); *scope* (a global holdout excluded from *all* comms gives platform-level truth at the cost of per-campaign attribution stories); *windows* (1d / 7d / 28d for channel A/B tests, 90d+ for fatigue); and a *multi-metric outcome stack* — incremental sessions, revenue, unsubscribe rate, complaint rate, and app-uninstall rate, because single-metric dashboards get gamed within two cycles.

## The four shapes of CRM platform

Most CRM advice in the wild is written by people who work at large marketplaces, and it quietly assumes everyone else has the same shape. They don't. Two dimensions place your platform: *catalog size* (a neobank's eight products vs. a marketplace's millions of listings) and *signal volume per user* (rich daily telemetry vs. a sparse weekly visit).

<figure class="fig">
<div class="viz">
<div class="quadframe">
<span class="ax-y">Signal volume / user →</span>
<div class="quadgrid">
<div class="quad"><div class="ql">Quadrant A</div><div class="qn">LLM-first</div><div class="qx">Neobanks, fintech (Revolut)</div><div class="qd">Small catalog, dense signal — the LLM reads recent activity and reasons over the whole catalog in one prompt.</div><div class="qt">Trap: building a recommender you don't need.</div></div>
<div class="quad"><div class="ql">Quadrant D</div><div class="qn">Full stack</div><div class="qx">Large marketplaces, social</div><div class="qd">Every layer is independently hard and must be composed. Most published CRM writing describes this shape.</div><div class="qt">Trap: assuming D-advice transfers down to A/B/C.</div></div>
<div class="quad"><div class="ql">Quadrant C</div><div class="qn">Orchestration-first</div><div class="qx">Duolingo</div><div class="qd">Few message types, but cadence and journey are the whole game — balancer, send-time, suppression.</div><div class="qt">Trap: over-investing in LLM copy variants.</div></div>
<div class="quad"><div class="ql">Quadrant B</div><div class="qn">Recommender-first</div><div class="qx">Netflix, Spotify</div><div class="qd">Millions of items; CRM wraps the recommender's scores in copy — a delivery layer on existing personalization.</div><div class="qt">Trap: re-deriving personalisation you already have.</div></div>
</div>
<span class="ax-x">Catalog size →</span>
</div>
</div>
<figcaption>Quadrant-D systems get written about most — but the advice only transfers if you're actually in D. Run a Quadrant-A platform and spend two quarters building a recommender and you've wasted them; run Quadrant-C and pour effort into LLM copy variants and you optimised the wrong layer.</figcaption>
</figure>

## The lifecycle of a communication

> **The loop.** A buyer searches a marketplace for a road bike under €1,500 and does not buy. An hour later a push surfaces three similar bikes and a pannier rack; the next day an in-app message — the seller dropped the price, with a code for free delivery — and the buyer converts. None of it is a blast. Behind it is a loop: trigger → modeling → content → orchestration → placement → feedback, and every serious CRM platform runs a version of it.

<figure class="fig">
<div class="viz">
<div class="lifeflow">
<div class="stage">Content</div><div class="arrow">→</div><div class="stage hot">Audience</div><div class="arrow">→</div><div class="stage">Orchestration</div><div class="arrow">→</div><div class="stage">Placement</div><div class="arrow">→</div><div class="stage">Feedback</div>
</div>
</div>
<figcaption>One message, end to end. Each stage compounds with the others rather than substituting for them — and the biggest surprise lift usually hides in the audience stage, the one most established programmes have never done the work on.</figcaption>
</figure>

For each stage: the old way, the new way that actually moves the metrics, what's honestly achievable, and what's coming next.

### Content

- **Old way:** a copy team writes a few headline templates per campaign, rotated quarterly, picked by post-launch CTR.
- **New way:** LLM variants under category control (Suspense / Emotion / Practical / Plot framings) → a pairwise reward model — a ~100–300M-param BERT-class encoder, retrained weekly, ~1ms/pair — selects the winner pre-launch (selection only, no RL on raw CTR), with multi-task scoring on OR, CTR, business action, and complaints.
- **Achievable:** high-single to low-double-digit OR lift; headline half-life moves from 60–120 days to 200+.
- **What's next:** one-to-one copy generated per user in real time, with compliance guardrails keeping it on-brand and factual.

### Audience

- **Old way:** rule-based SQL segments, maintained by hand, measured by attributed conversion with no causal check.
- **New way:** behavioral micro-segmentation → uplift modeling (S-, T-, and X-learner architectures) that ranks by conditional average treatment effect, not engagement probability, separating persuadables from always- and never-takers → real-time post-conversion suppression via streaming (Kafka/Kinesis).
- **Achievable:** 0.15–0.30% incremental lift on GCG plus 5–10% volume headroom — the biggest hidden lift, because few teams have done it.
- **What's next:** embedded models making the send/no-send call per user at the moment of delivery, not in last night's batch.

### Orchestration

- **Old way:** a FIFO queue with one flat per-user daily cap set by gut; the same cap for power users and seasonal users.
- **New way:** a per-user notification budget (Pinterest NEP) · pairwise expected-regret ranking · an RL "should I send at all?" filter · send-time optimization · diversity-aware reranking — one budget, one balancer, one decision point.
- **Achievable:** low-tenths-of-a-percent lift; daily sends 1.5→1.7+ without breaching the UR ceiling; 5–10% volume headroom.
- **What's next:** RL that optimizes for long-term retention and LTV instead of the next click — plus user-facing "set your own frequency" controls.

### Placement

- **Old way:** push dumps the user on the homepage; they drop off in the 5–10s window before they find what the message implied.
- **New way:** personalized landing with pre-applied filters (deep links) · a persistent inbox / notification center · channel cascading from highest-utility channel down.
- **Achievable:** a few points of conversion-given-tap per surface — and the inbox is the only surface that survives revoked push permissions.
- **What's next:** personalized modules inside the home feed, AR/voice notifications, and buying straight from the notification.

### Feedback

- **Old way:** teams eyeball OR/CTR after a send and move on; data lives in disconnected dashboards; drop reasons unlogged.
- **New way:** every message logged against the GCG with the multi-metric stack · score-on-drop logging for kept *and* dropped candidates · desired-vs-actual send-time diff logging.
- **Achievable:** no direct lift — it produces measurable lift. Rigorous feedback ships changes confidently instead of hopefully.
- **What's next:** self-tuning loops — the reward model retrains on today's sends by tonight, so the policy improves daily without a release.

Orchestration is where the volume-headroom story lives. Push a per-user send budget without the mechanics — uplift targeting, send-time optimization, reward-model content — and you break the unsubscribe ceiling while lift actually falls. Layer the mechanics and you buy headroom to send more at lower cost. That's not a quirk of the model; that's the whole argument.

## Where AI/ML actually plugs in

This is the section that gets written about most and shipped worst, because "AI" gets used as one word for two different tools: predictive models that decide who and when, and generative models that write what. Put the wrong one on a job and you've bought a demo, not a return. AI/ML earns its keep in four specific places, plus a fifth that's still emerging.

**Content: LLM-as-copywriter with a reward model.** The LLM generates variants; a reward model picks the winner before it spends a send. The reward model is the moat — trained on your traffic, in your language, on your users — while the LLM is a commodity API call. Get that backwards, differentiate on the model instead of the selector, and your advantage evaporates the day the next foundation model ships. The Kuaishou PushGen pattern (selection-only, no RL on raw CTR, supervised generation, judge guardrails) is the published reference architecture.

**Audience: LLM-as-segmenter — Quadrant A only.** Small catalog, dense signal: an LLM reads recent activity in a prompt and reasons over a handful of products directly. In B/C/D the catalog won't fit in a prompt and the recommender is the right home for the ranking — reading neobank case studies and assuming the pattern is universal is exactly how PMs mis-invest. **Workflow: LLM-as-NL-translator** turns plain-English segment descriptions into SQL for a 1.5–2× throughput gain. **Operations: agents that watch the dashboards**, flag anomalies in the outcome stack, auto-bisect the cause, and draft the brief. The agents surface signal; humans still decide. Operational AI, not magic.

> **The dominant failure mode: reward-hacking on raw CTR.** Close the loop with RL or DPO on raw CTR and the model learns that price overclaims, brand over-mentions, and clickbait spike clicks — then ships exactly that, plus factual hallucinations. The PushGen guardrail is explicit: selection only, generation stays at supervised fine-tuning, with a judge model scoring factual fidelity. In small variant spaces with fast feedback, a plain multi-armed bandit still beats the LLM pipeline.

## The order of operations

The mechanics aren't equally valuable to ship next, and the returns compound through the same data substrate — which means tenure matters and starting earlier beats starting bigger. The order depends on your shape. For most platforms reading this (Quadrants C and D):

1. **GCG first.** Nothing else is measurable without it. Expect the programme to look 10–30% smaller than the pre-GCG numbers suggested — that's the right number.
2. **Single-balancer architecture second.** One balancer that sees transactional, marketing, and system comms on one per-user budget. Unglamorous infrastructure, but without it the ranker improvements plateau at half their reported lift.
3. **ML ranker + per-user budget third.** The biggest non-content lever: pairwise expected-regret ranking and uplift modeling plus the Pinterest NEP budget pattern deliver the volume-headroom story.
4. **LLM content with reward model fourth.** Earns its keep only on a measured, well-architected pipeline. On an unmeasured one it produces vibes, not lift.

For Quadrant A (small catalog, dense data) the order flips: GCG first, then LLM-as-segmenter, then a bandit on copy, then light orchestration. The single most common failure mode across programmes is *content investments before measurement and architecture* — headline refreshes on an unmeasured pipeline compound in the wrong direction.

## Five failure modes that look like progress

Each one looks like progress on the dashboard, and each one isn't. **Optimizing CTR without a GCG** — the fix is institutional: leadership has to make the holdout number the headline. **Bypassing the balancer for "important" comms** — every exception accumulates until it's the dominant source of unsubscribes. **Treating headline rotation as a one-time A/B** — decay is continuous, so the refresh has to be too. **Segmenting on attributed signals** — fix it with per-segment incremental measurement, or you'll optimize the wrong segments for years. **Ranking by predicted engagement instead of incrementality** — it over-routes spend to always-takers who'd have clicked anyway, and a healthy-looking CTR hides it.

The pattern across all five: each is a local optimization that ignores a global cost. CTR optimization ignores incremental cost; bypassing the balancer ignores UR cost; one-time A/B testing ignores wear-out cost; attributed segmentation ignores selection-bias cost; engagement-based ranking ignores opportunity cost. CRM as a system is dominated by these global costs.

## Close

The achievable band is real and it's narrow: 1–3% incremental lift on a holdout, unsubscribes under 1%, engagement lift in the high single to low double digits, and 20–30% less volume at parity. Every one of those numbers is benchmarked against a production system someone already shipped — Pinterest's, Twitter's, Kuaishou's — not a roadmap. So the reason most programmes miss the band isn't that the techniques are secret. The Pinterest paper is eight years old. It's order.

Fix measurement first — the holdout, the multi-metric stack, the score-on-drop logs. Then fix architecture — one balancer on one budget, then the ranker, then the content. Hyper-personalization has moved from buzzword to baseline. The platforms that win aren't the ones with the cleverest headline — they're the ones that measure the right number and build in the right order.

*Companion piece on the generative half of this stack — generation, selection, and the loop you must never close: [writing comms with generative AI](/writing/generative-ai-comms/).*
