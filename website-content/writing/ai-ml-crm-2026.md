---
title: "What AI/ML is actually capable of in CRM in 2026"
date: 2026-06-24
summary: "A practitioner's read on the achievable band for AI/ML-driven CRM — the four platform shapes, the lifecycle of a single message, and where predictive and generative models each earn their keep, anchored to the public results that bound every number."
publication: Self
tags: [ai, ml, crm, communications, growth]
featured: true
---

Modern CRM runs on AI/ML — systems that decide, per user and in real time, who gets a message, what it says, and when and where it lands. The gains are real but bounded, and they materialise on two conditions: the right number measured, and the stack built in the right order.

What follows is the version without the marketing: what is achievable, in what order, and what must hold for it to be real. The references stay inline — Pinterest, Twitter, Kuaishou — because they are the public anchors any programme should be benchmarked against, and because most of what quietly works in production was published years ago. The techniques are not secret; the leverage is in the order of operations.

## Why this article exists

Open and click-through rates measure *what the user did after seeing the message* — not *what the message caused*. On a properly measured pipeline those are not the same thing — which is why a team can argue for an hour about whether last month's headline refresh moved CTR and leave with a hypothesis that was never measurable to begin with.

The number that anchors the conversation is incremental lift on a Global Control Group (GCG) — the share of business outcomes that would not have happened without the message. Teams that measure it find a band of achievable outcomes far narrower than the vendor decks suggest, and a much sharper picture of which mechanics in the stack are actually paying for themselves. One qualifier up front: the GCG is the best read, not the only legitimate one. A holdout needs traffic — below roughly a million MAU it cannot resolve tenth-of-a-percent effects in a reasonable window — and at that scale disciplined attribution (conservative windows, per-campaign tests) is the right tool, with the holdout added once traffic supports it.

One distinction runs through the whole article: the AI/ML in a comms stack is not one model but a family of them — predictive models that decide who and when, and generative models that write what. Almost every number in the band below comes from the predictive side; the generative side pays off in a few specific places. The section on where AI/ML plugs in maps which job goes to which.

## The achievable envelope

These are the bands mature CRM programmes at scale operate inside — each anchored to a published result, not a vendor promise. The headroom is narrower than the decks suggest.

<figure class="fig">
<div class="viz">
<div class="bands">
<div class="band"><div class="bandhead"><span class="bandname">Incremental lift on GCG</span><span class="bandval">1–3%</span></div><div class="track"><div class="fill" style="left:25%;width:50%"></div><div class="tick" style="left:75%"><span>Pinterest +3% DAU</span></div></div></div>
<div class="band"><div class="bandhead"><span class="bandname">Unsubscribe rate</span><span class="bandval">under 1%</span></div><div class="track"><div class="fill" style="left:8.3%;width:16.7%"></div><div class="tick" style="left:83.3%"><span>1% ceiling</span></div></div></div>
<div class="band"><div class="bandhead"><span class="bandname">Engagement lift (content + send-time)</span><span class="bandval">8–15%</span></div><div class="track"><div class="fill" style="left:40%;width:35%"></div><div class="tick" style="left:39.8%"><span>Twitter +7.96%</span></div><div class="tick" style="left:70.4%"><span>Kuaishou +14.08%</span></div></div></div>
<div class="band"><div class="bandhead"><span class="bandname">Volume cut at parity engagement</span><span class="bandval">20–30%</span></div><div class="track"><div class="fill" style="left:57.1%;width:28.6%"></div><div class="tick" style="left:16.5%"><span>Twitter −5.79%</span></div><div class="tick" style="left:68.6%"><span>Pinterest −24%</span></div></div></div>
</div>
</div>
<figcaption>Where mature CRM at scale actually lands on four headline metrics. Bands are practitioner ranges synthesised from the cited literature; ticks mark specific published results — Pinterest NEP (KDD 2018), Twitter/O'Brien (arXiv 2202.08812), Kuaishou PushGen (WSDM 2026).</figcaption>
</figure>

The envelope in four numbers — the lift, the constraint, the engagement gain, and the volume cut. **Incremental business-metric lift: 1–3%** on a 1–5% holdout. **Unsubscribe rate: under 1%**, best-in-class in the low tenths of a percent — and it's the constraint, not a KPI. **Engagement-rate lift from content and send-time: 8–15% relative.** **Volume reduction at parity engagement: 20–30%.** The lift sounds small because it's small per send and large in aggregate — a 1.5% session lift across a 200M MAU platform is on the order of three million extra sessions a day. And the band is a maturity read, not a ceiling: in my own incrementality-measured programme, buyers lift on Android reached 5% after two years of stacked mechanisms (ML-ranking, LLM content selection, send-time optimization) — above the published band.

The arithmetic that turns this into a case is straightforward. On an illustrative platform — 50M MAU, $1B annual revenue — 1–3% incremental on the holdout is $10–30M a year at maturity. The programme that delivers it runs maybe 12–25 FTEs plus infrastructure — call it $3–5M fully loaded. Base case: a 3–6× annual return, and higher once you count the paid re-acquisition you no longer pay for (Adobe pegs personalization at 1.7× year-over-year incremental revenue growth and more than double customer lifetime value). The line that gets the least attention is the volume cut: the published systems found 20–30% of volume carrying negative marginal value, and the reclaimed attention budget is headroom growth then spends — volume grows back to the unsubscribe constraint, not past it. The results that anchor the bands:

<figure class="fig">
<div class="viz">
<div class="statgrid">
<div class="statcard"><div class="src">Pinterest NEP · email-only</div><div class="big">−24%</div><div class="desc">email volume, at +31% CTR and +3% DAU (marginal users)</div><div class="cite">KDD 2018</div></div>
<div class="statcard"><div class="src">Pinterest NEP · push &amp; mixed</div><div class="big">+10–21%</div><div class="desc">notification CTR; DAU +0–1%</div><div class="cite">KDD 2018</div></div>
<div class="statcard"><div class="src">Twitter · O'Brien</div><div class="big">−5.79%</div><div class="desc">sends, at +7.96% open rate, +0.20% DAU</div><div class="cite">arXiv 2202.08812</div></div>
<div class="statcard"><div class="src">Kuaishou · PushGen</div><div class="big">+14.08%</div><div class="desc">CTR on 85.2% replaced; beat-rate 44→83% after SFT</div><div class="cite">WSDM 2026</div></div>
</div>
</div>
<figcaption>The public anchors for every band above. None of these numbers exists without a holdout to measure against. Per eMarketer/TransUnion (July 2025), 52% of US marketers now run incrementality testing in some form.</figcaption>
</figure>

Five GCG design choices are worth getting right early: *size* (1–5% — bigger is cleaner measurement but more foregone revenue per day); *persistence* (a continuously-excluded holdout reads fatigue and wear-out; a re-randomized one gives more power per period but no long-run signal); *scope* (a global holdout excluded from *all* comms gives platform-level truth at the cost of per-campaign attribution stories); *windows* (1d / 7d / 28d for channel A/B tests, 90d+ for fatigue); and a *multi-metric outcome stack* — incremental sessions, revenue, unsubscribe rate, complaint rate, and app-uninstall rate, because single-metric dashboards get gamed within two cycles.

A production note on rigor. Run the holdout at a strict significance bar (mine runs at α = 0.001); use variance reduction (CUPED) to buy back the power the small holdout costs; and keep an explicit multiple-testing budget — scoring hundreds of metrics, know how many "significant" results chance alone would hand you (at that bar, across ~250 metrics: less than one). Kept running for years, headline metrics separate from the holdout at 30+ sigma, and the read stops being arguable.

## The four shapes of CRM platform

The published CRM literature comes almost entirely from one platform shape — Pinterest, Twitter, and Kuaishou are all large-catalog, high-signal platforms — and its advice transfers only where the shape matches. Two dimensions place your platform: *catalog size* (a neobank's eight products vs. a marketplace's millions of listings) and *signal volume per user* (rich daily telemetry vs. a sparse weekly visit).

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
<figcaption>The published anchors all sit in Quadrant D — the advice transfers only if you do too. Run a Quadrant-A platform and spend two quarters building a recommender and you've wasted them; run Quadrant-C and pour effort into LLM copy variants and you optimised the wrong layer.</figcaption>
</figure>

## The lifecycle of a communication

> **The loop.** A buyer searches a marketplace for a road bike under €1,500 and does not buy. An hour later a push surfaces three similar bikes and a pannier rack; the next day an in-app message — the seller dropped the price, with a code for free delivery — and the buyer converts. None of it is a blast. Behind it is a loop: trigger → modeling → content → orchestration → placement → feedback, and every serious CRM platform runs a version of it.

<figure class="fig">
<div class="viz">
<div class="lifeflow">
<div class="stage">Content</div><div class="arrow">→</div><div class="stage hot">Audience</div><div class="arrow">→</div><div class="stage">Orchestration</div><div class="arrow">→</div><div class="stage">Placement</div><div class="arrow">→</div><div class="stage">Feedback</div>
</div>
</div>
<figcaption>One message, end to end. Each stage compounds with the others rather than substituting for them — and the biggest surprise lift usually hides in the audience stage — the least-shipped layer of the five.</figcaption>
</figure>

For each stage: the basic setup, the personalized version that moves the metrics, what's honestly achievable, and what's coming next.

<div class="stage-detail">
<div class="stagecard"><div class="sh">4.1 · Content</div><div class="lrow"><span class="k">Basic</span><span class="v">A copy team writes a few headline templates per campaign, rotated quarterly, picked by post-launch CTR.</span></div><div class="lrow"><span class="k">Personalized</span><span class="v">LLM variants under category control (Suspense / Emotion / Practical / Plot framings) → a pairwise reward model — a ~300M-param BERT-class encoder (BERT-300M in Kuaishou's deployment) — selects the winner pre-launch (selection only, no RL on raw CTR), with multi-task scoring on OR, CTR, business action, and complaints.</span></div><div class="lrow"><span class="k">Achievable</span><span class="v"><span class="ach">High-single to low-double-digit OR lift; headline half-life moves from 60–120 days to 200+.</span></span></div><div class="lrow"><span class="k">What's next</span><span class="v"><span class="nextpill">One-to-one copy generated per user in real time, with compliance guardrails keeping it on-brand and factual.</span></span></div></div>
<div class="stagecard"><div class="sh">4.2 · Audience</div><div class="lrow"><span class="k">Basic</span><span class="v">Rule-based SQL segments, maintained by hand, measured by attributed conversion with no causal check.</span></div><div class="lrow"><span class="k">Personalized</span><span class="v">Behavioral micro-segmentation → uplift modeling (S-, T-, and X-learner architectures) that ranks by conditional average treatment effect, not engagement probability, separating persuadables from always- and never-takers → real-time post-conversion suppression via streaming (Kafka/Kinesis).</span></div><div class="lrow"><span class="k">Achievable</span><span class="v"><span class="ach">0.15–0.30% incremental lift on GCG plus 5–10% volume headroom — the biggest hidden lift of the five stages.</span></span></div><div class="lrow"><span class="k">What's next</span><span class="v"><span class="nextpill">Embedded models making the send/no-send call per user at the moment of delivery, not in last night's batch.</span></span></div></div>
<div class="stagecard"><div class="sh">4.3 · Orchestration</div><div class="lrow"><span class="k">Basic</span><span class="v">A FIFO queue with one flat per-user daily cap set by gut; the same cap for power users and seasonal users.</span></div><div class="lrow"><span class="k">Personalized</span><span class="v">A per-user notification budget (Pinterest NEP) · pairwise expected-regret ranking · an RL "should I send at all?" filter · send-time optimization · diversity-aware reranking — one budget, one balancer, one decision point.</span></div><div class="lrow"><span class="k">Achievable</span><span class="v"><span class="ach">Low-tenths-of-a-percent lift; daily sends 1.5→1.7+ without breaching the UR ceiling; 5–10% volume headroom.</span></span></div><div class="lrow"><span class="k">What's next</span><span class="v"><span class="nextpill">RL that optimizes for long-term retention and LTV instead of the next click — plus user-facing "set your own frequency" controls.</span></span></div></div>
<div class="stagecard"><div class="sh">4.4 · Placement</div><div class="lrow"><span class="k">Basic</span><span class="v">Push dumps the user on the homepage; they drop off in the 5–10s window before they find what the message implied.</span></div><div class="lrow"><span class="k">Personalized</span><span class="v">Personalized landing with pre-applied filters (deep links) · a persistent inbox / notification center · channel cascading from highest-utility channel down.</span></div><div class="lrow"><span class="k">Achievable</span><span class="v"><span class="ach">A few points of conversion-given-tap per surface — and the inbox is the only surface that survives revoked push permissions.</span></span></div><div class="lrow"><span class="k">What's next</span><span class="v"><span class="nextpill">Personalized modules inside the home feed, AR/voice notifications, and buying straight from the notification.</span></span></div></div>
<div class="stagecard"><div class="sh">4.5 · Feedback</div><div class="lrow"><span class="k">Basic</span><span class="v">Teams eyeball OR/CTR after a send and move on; data lives in disconnected dashboards; drop reasons unlogged.</span></div><div class="lrow"><span class="k">Personalized</span><span class="v">Every message logged against the GCG with the multi-metric stack · score-on-drop logging for kept and dropped candidates · desired-vs-actual send-time diff logging.</span></div><div class="lrow"><span class="k">Achievable</span><span class="v"><span class="ach">No direct lift — it produces measurable lift. Rigorous feedback ships changes confidently instead of hopefully.</span></span></div><div class="lrow"><span class="k">What's next</span><span class="v"><span class="nextpill">Self-tuning loops — the reward model retrains on today's sends by tonight, so the policy improves daily without a release.</span></span></div></div>
</div>

Orchestration is where the volume headroom lives. Raising per-user frequency without the mechanics — uplift targeting, send-time optimization, reward-model content — breaks the UR ceiling while lift falls. With the mechanics layered in, frequency grows at stable UR — the 1.5 → 1.7+ sends/day in the stage card above. That is not a quirk of the model; that is the whole argument.

The cap is where the orchestration money concentrates. On one large marketplace, **~35% of users are over-subscribed — more than 4 campaigns prepared against a 4/day limit — and this minority generates ~90% of the program's incremental uplift**. The pre-ML version filled their slots at random, regularly dropping the relevant communication and sending an irrelevant one: a lost conversion plus unsubscribe risk on the most valuable users. The fix is the ranker from the stage card — score every user–campaign pair, schedule the top of the list. The production footnote: a **gradient-boosted ranker significantly outperformed both a neural AutoML baseline and random selection on offline NDCG** (the neural baseline barely beat random), then lifted push-attributed conversion by ~4% in the A/B. Orchestration ML does not need to be exotic; it needs to see all the candidates.

One candidate the ranker cannot see is the one with no history: a brand-new campaign has never been sent, so a model that ranks on past performance either drops it or places it blind — a standing cold-start gap at ~1,000+ campaigns/day. The fix: score the campaign from its text (brief + copy + description), embedded against the corpus of past campaigns to borrow the measured performance of its nearest neighbours. Coverage of the send base rises (fewer campaigns fall through unscored), and ranking gets fairer — a new campaign competes on predicted merit instead of waiting out a handicap while incumbents accumulate the history that keeps them on top.

## Where AI/ML actually plugs in

"AI" in a comms stack is one word for two different tools: predictive models that decide who and when, and generative models that write what. Put the wrong one on a job and you've bought a demo, not a return. AI/ML pays off in four specific places, plus a fifth that is still emerging.

**Content: LLM-as-copywriter with a reward model.** The LLM generates variants; a reward model picks the winner before it spends a send. The reward model is the moat — trained on your traffic, in your language, on your users — while the LLM is a commodity API call. Get that backwards, differentiate on the model instead of the selector, and your advantage evaporates the day the next foundation model ships. The Kuaishou PushGen pattern (selection-only, no RL on raw CTR, supervised generation, judge guardrails) is the published reference architecture.

**Audience: LLM-as-segmenter — Quadrant A only.** Small catalog, dense signal: an LLM reads recent activity in a prompt and reasons over a handful of products directly. In B/C/D the catalog won't fit in a prompt and the recommender is the right home for the ranking — the Quadrant-A pattern does not transfer up. **Workflow: LLM-as-NL-translator** turns plain-English segment descriptions into SQL for a 1.5–2× throughput gain. **Operations: agents that watch the dashboards**, flag anomalies in the outcome stack, auto-bisect the cause, and draft the brief. The agents surface signal; humans still decide. Operational AI, not magic.

**The fifth place, still emerging: the assistant as a comms channel.** Everything above assumes broadcast — a push that deep-links to a surface. The emerging alternative is a conversational assistant that *initiates*, and the honest way to read it: this is **the recommendations channel with agentic capabilities**. The same selection machinery decides what to surface, but the message lands in the user's chats as a dialogue — a digest that can be questioned, refined, and followed up. One large marketplace already ships the buyer-side version: a conversational shopping assistant with proactive settings — assistant-initiated notifications and recommendation digests that continue a dialogue the user started (e.g. a follow-up on a shortlist built in chat), where the landing *is* the conversation and every message carries the thread's full context. As a channel it has properties push does not: per-message context of a whole dialogue instead of a 40-character title, a *reply* as the engagement signal instead of a tap, and consent that reads as continuing a conversation, not receiving a campaign. Two disciplines transfer unchanged: it routes through the same balancer and per-user limit as every other sender, or it becomes the next bypass — and it is measured on the GCG, or it becomes the next attribution myth.

> **The dominant failure mode: reward-hacking on raw CTR.** Close the loop with RL or DPO on raw CTR and the model learns that price overclaims, brand over-mentions, and clickbait spike clicks — then ships exactly that, plus factual hallucinations. The PushGen guardrail is explicit: selection only, generation stays at supervised fine-tuning, with a judge model scoring factual fidelity. In small variant spaces with fast feedback, a plain multi-armed bandit still beats the LLM pipeline.

## The order of operations

The mechanics aren't equally valuable to ship next, and the returns compound through the same data substrate — which means tenure matters and starting earlier beats starting bigger. The order depends on your shape. For most platforms reading this (Quadrants C and D):

1. **GCG first.** Nothing else is measurable without it. Expect the programme to look 10–30% smaller than the pre-GCG numbers suggested — that's the right number.
2. **Single-balancer architecture second.** One balancer that sees transactional, marketing, and system comms on one per-user budget. Unglamorous infrastructure, but without it the ranker improvements plateau at half their reported lift.
3. **ML ranker + per-user budget third.** The biggest non-content lever: pairwise expected-regret ranking and uplift modeling plus the Pinterest NEP budget pattern deliver the volume-headroom story.
4. **LLM content with reward model fourth.** Pays off only on a measured, well-architected pipeline. On an unmeasured one it produces activity, not lift.

For Quadrant A (small catalog, dense data) the order flips: GCG first, then LLM-as-segmenter, then a bandit on copy, then light orchestration. The expensive sequencing mistake is *content investment before measurement and architecture* — headline refreshes on an unmeasured pipeline produce activity, not lift.

## Choosing the optimization target

The targets form a maturity ladder, not a purity test — each is right at one stage and costs money if held past it.

**CTR is a legitimate first target.** With no holdout and no ranker yet, optimizing open and click rates is the right opening move — it builds the variant discipline and the logging everything later depends on. Two caveats keep it honest: a share of taps is users clearing the red notification dot rather than expressing interest, so CTR reads alongside a downstream action from day one; and the target graduates to incremental lift once traffic supports a holdout, because CTR alone cannot see the users who would have acted anyway.

**Rank on a composite, not engagement alone.** Predicted engagement belongs in the ranking target — it just should not be the whole target. The production version ranks each user–campaign pair on a composite of opens, contacts, and deals, so the top of the list is the message most likely to end in value rather than merely a tap; the uplift head then re-ranks toward the users the message actually moves.

**Bypassing the balancer is a stage, not a sin.** While the balancer is young — ranking unproven, budget uncalibrated — routing a communication around it is defensible, provided that communication is incrementally proven on its own test. The discipline is the expiry date: every bypass is time-boxed and audited, because exceptions that accumulate permanently blind the budget model to the user's real state and eventually dominate unsubscribes.

**Refresh content on a cadence, not as a one-time A/B.** Wear-out is continuous — 30%+ OR decay over ~3 months at stable volume — so the refresh has to be continuous too: generation on a schedule, with the reward model re-picking the champion.

The through-line: pair every local metric with its global cost — CTR with the incremental read, engagement ranking with downstream value, each bypass with the UR budget, each winning header with its own decay curve.

A production instance of the pairing, with a reusable diagnostic. On a suggested-reply surface at one large marketplace, suggestion CTR grew while the downstream deal metric did not move. The metric framework is built to catch exactly this divergence: CTR and the deal metric are tracked as a pair, and when they diverge, the first check is whether the model drifted toward universal phrasings — everyone taps them, nobody converts. CTR is activity, the deal is value; a feature can generate the first without the second, and only the paired read shows it.

## Close

The published band is real: 1–3% incremental lift on GCG, UR under 1%, engagement lift in the high single to low double digits, 20–30% less volume at parity. Every number is benchmarked against a shipped production system — Pinterest's, Twitter's, Kuaishou's — not a roadmap. And it is a starting read, not a law: where you land depends on the platform and the metric — my own programme reached 5% incremental buyers on Android after two years of stacked mechanisms, above the published band on that platform–metric pair. None of the techniques is secret — the Pinterest paper is eight years old; the differentiator is order.

Fix measurement first — the holdout, the multi-metric stack, the score-on-drop logs. Then fix architecture — one balancer on one budget, then the ranker, then the content. Hyper-personalization has moved from buzzword to baseline. The platforms that win are not the ones with the cleverest headline; they are the ones that measure the right number and build in the right order.

*This piece is the map of the whole stack — the envelope, the platform shapes, and the build order. Two companions go deeper on single layers: [writing comms with generative AI](/writing/generative-ai-comms/) — the content engine, from generation to the loop you must never close — and [inside the marketplace messenger](/writing/messenger-ai-ml/) — the surface where the deal actually closes.*
