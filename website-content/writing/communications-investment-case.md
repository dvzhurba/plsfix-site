---
title: "The communications investment case: what an AI-driven comms platform returns, and what it takes to build one"
date: 2026-06-28
summary: "What an AI-driven communications platform actually returns and what it takes to build one — the published return envelope (Pinterest, Twitter, Kuaishou), the five-layer architecture, per-mechanism economics with stage gates, and five platform scenarios for where the case clears the bar."
publication: Unplaced
tags: [ai, ml, llm, communications, growth, investment-case]
featured: true
status: draft  # private, password-gated; shared with editors pre-placement
private: editor
---

At some point, every consumer platform above a few million users faces the same investment decision. Communications — push, email, in-app, messenger — is running as a cost-center channel: a campaign team, a send tool, a dashboard of open rates. Somebody proposes turning it into an ML-driven product with its own engineering team, and the leadership question is entirely fair: *what would we actually get, and what does it take?* I went through this decision from the inside — I wrote the investment case for scaling a communications platform at a marketplace that sends billions of messages a month, defended it through CEO and board review, and then spent the following years delivering it.

This article is the material I would have wanted on the table at the start: the realistic return envelope with public benchmarks (section 1), the architecture the money buys (2), the per-mechanism line items with their minimum data bars (3), the cost side with stage gates and kill criteria (4), and five platform scenarios showing where the case clears the bar and where it doesn't (5). One orientation note before the numbers: the full build described here is right for fewer companies than the vendor decks suggest. If your platform is under a million monthly users, or your users appear weekly rather than daily, section 5 may save you the rest of the article.

## 1. Sizing the return: the envelope

The honest starting point is that communications returns are real but bounded, and the bounds are published. Four numbers frame the envelope.

**Incremental lift on business metrics: 1–3%.** Measured against a global control group (GCG) — a holdout of users who receive nothing — mature programs at scale lift the headline business metric (daily active buyers, sessions, revenue per user) by low single digits. Pinterest's notification-platform work (KDD 2018) reported DAU gains among under-engaged users alongside *reduced* send volume; LinkedIn and Meta have reported comparable low-single-digit magnitudes on session-level outcomes. In my own experience running an incrementality-measured program, the band holds.

**Open-rate lift from content and timing systems: 8–15% relative.** LLM-generated content with a learned selection layer, plus per-user send-time optimization, lifts open rates by high single to low double digits over a static-template baseline. Kuaishou's PushGen system (WSDM 2026) reports +14.08% CTR on the 85.2% of push volume where the generated variant replaced the human baseline.

**Volume reduction at parity engagement: 20–30%.** The least intuitive number, and for a CFO possibly the most interesting one. Pinterest's per-user budget model cut email volume 24% while email CTR rose 31% and DAU rose among previously under-engaged users; Twitter's send-decision model (arXiv 2202.08812) cut sends ~6% while open rate rose ~8% with slightly positive DAU. The consistent finding: platforms at scale carry a meaningful share of sends whose marginal value is negative, and reclaiming that attention budget is itself a return — it shows up as lower unsubscribe rates, which preserve the addressable audience that all future returns depend on.

**Unsubscribe rate: the constraint, not a KPI.** Programs running aggressive volume hold unsubscribes in the low tenths of a percent per period. This is the boundary condition of the whole case: a program that buys engagement now by burning addressable audience reports great quarters and a shrinking asset.

**The arithmetic that turns this into an investment case.** Take an illustrative platform: 50M MAU, $1B annual revenue. At maturity, 1–3% incremental revenue on the holdout is $10–30M a year. The full program described below runs 12–25 FTEs plus infrastructure — call it $3–5M fully loaded. Base case: 3–6x annual return. The bull case is higher, because several mechanisms also reduce paid re-acquisition — a persuadable retained by the comms system is a user you didn't buy back through ads.

## 2. What the money buys: the platform

The investment is not "more campaigns." It's a system with five technical layers.

**Measurement substrate.** A GCG of 1–5% of the addressable base, held out from all communications. Design choices that matter: *persistent* holdout (same users excluded continuously) for longitudinal fatigue reads, supplemented by re-randomized splits for per-feature power; outcome windows at 1/7/28 days for feature tests and 90+ days for fatigue; a multi-metric outcome stack — incremental sessions, incremental buyers/revenue, unsubscribe, complaint, uninstall — joined on a per-user-day key. One logging discipline pays for itself many times over: every send-decision component records its scores *for the candidates it dropped*, not only the ones it sent — it's the only way to audit the system's choices later. Adoption of holdout measurement is past the tipping point: an eMarketer/TransUnion survey (July 2025) has 52% of US brand and agency marketers using incrementality testing, with a further 36% planning to increase incrementality spending over the next year.

**A single orchestrator ("balancer").** One service through which every user-facing message flows — marketing, transactional, system — holding one per-user budget. Inputs per decision: the candidate set with ranker scores, recent-send history, fatigue state, channel responsiveness, per-channel caps. The budget is learned, not flat: a per-user model of the marginal value of one more send (Pinterest's formulation: a per-user-week utility function), with a global optimizer allocating volume to where marginal utility is highest. Architecturally this is the politically hardest piece, because every team that currently sends messages must route through it.

**The ranking and filtering stack.** Three models in sequence. A *candidate ranker* — Twitter's published approach (ECIR 2022) uses a pairwise loss weighted by the expected regret of misordering, which matches the balancer's real decision better than pointwise CTR prediction. An *uplift head* that re-ranks by conditional average treatment effect rather than engagement probability: two-model or X-learner architectures with cross-fitting, trained on the experiment corpus, evaluated by Qini curves rather than AUC. And a *send/no-send filter* — Twitter's production version (arXiv 2202.08812) is model-based RL comparing predicted long-term value with and without the send: a finite-horizon solver over user state (recent open/ignore streaks) with a tunable causality weight calibrated by A/B.

**The content engine.** An LLM generation layer producing copy variants under category control (suspense / emotion / practical / plot — a taxonomy that transfers from newsroom A/B practice), constrained so every factual claim must appear in the campaign brief. Above it, a pairwise reward model — a BERT-class encoder (Kuaishou's production choice is ~300M parameters), retrained on the paired A/B corpus, scoring a candidate pair in milliseconds — that ranks every new variant against the current champion *before* it spends a send. Kuaishou reports the share of generated variants beating the human baseline climbing from 44% to 83% after supervised fine-tuning of the generator. Two deliberate constraints from the published systems: generation stays at supervised fine-tuning (no RL/DPO against raw engagement, which drifts toward overclaim and clickbait), and a judge model plus human review gates the first batch from any new prompt. Strategic note for the case: the generator is a commodity API; the reward model, trained on your traffic in your language, is the accumulating asset.

**Delivery surfaces.** Deep-linked landings templated per message — the push about a saved search lands on those results with filters pre-applied, not the homepage. A persistent notification center: at maturity, 25%+ of comms-attributable consumption happens there rather than on the push tap, and it's the only surface that survives revoked push permissions. Channel cascading with per-user channel ordering and per-message fallback windows.

## 3. The line items: return, dependency, and minimum data bar

For the case itself, price each mechanism separately. The third column is the one that kills line items for smaller platforms: each mechanism has a minimum data bar below which the model can't be trained or the effect can't be measured.

| Mechanism | Expected effect | Key dependency | Minimum data bar |
|---|---|---|---|
| GCG + outcome stack | Makes all other lines measurable and defensible | Event instrumentation, warehouse joins | ~1M MAU for a 1–2% holdout to resolve a 0.2% effect within a quarter |
| Per-user budget + balancer | 20–30% volume headroom; UR down; DAU neutral-to-positive | All senders routed through one service | Real volume pressure: ≥1 send/user/day average; below that, a flat cap loses little |
| Uplift-modeled targeting | +0.15–0.3% business metric; 5–10% further volume savings | Experiment corpus | Millions of randomized treated/control exposures; CATE models trained on thousands overfit |
| Send/no-send RL filter | ~5% fewer sends at higher OR; UR down | Per-user state features, LTV labels | Months of per-user open/ignore streak history at high volume |
| LLM content + reward model | 8–15% relative OR → ~+0.15–0.25% business metric | Paired A/B corpus; brief-grounded prompts | ~10k+ historical A/B pairs for the reward model; below that, use a bandit |
| Send-time optimization | Mid-single-digit relative OR lift | Per-user hourly engagement histograms | Weeks of activity logs; works at almost any scale |
| Personalized landings + inbox | Few % conversion-given-tap; durable surface | Deep-link infra; one product surface | None — works at any scale |

Two readings matter for the decision. First, no single line is transformative — the program return is the *stack*, which is why partial builds disappoint. Second, the lines compound through the same substrate: the reward model improves with the experiment corpus, the uplift model with the GCG history, the budget model with the fatigue data. Returns are increasing in tenure — an argument for starting earlier rather than starting bigger.

## 4. The cost side, with stage gates

A realistic staffing shape for a large platform, with a gate at each phase. The gates are the investment-case discipline: each phase has a measurable exit criterion and a kill criterion, so the board reviews a position, not a promise.

**Phase 1 — measurement (1–2 quarters; 2 data engineers, 1 DS, a PM).** Deliverable: GCG, treatment logging, outcome stack, first honest baseline. Expect the honest read to come in 10–30% *below* the attributed numbers the organization is used to; that correction is the foundation of a defensible case, not a setback. *Gate:* a stable incrementality read with confidence intervals. *Kill criterion:* if the honest baseline shows the current program driving <0.3% incremental, the expansion case shrinks accordingly — fix the basics with the existing team before funding phases 2–4.

**Phase 2 — orchestration (2–3 quarters, overlapping; 3–4 backend engineers + 1 ML engineer).** Consolidate senders into the balancer; ship the per-user budget model. Infrastructure work with little visible product change — it needs explicit executive sponsorship, because it's the phase most tempting to skip and most expensive to retrofit. *Gate:* >95% of sends routed through the balancer; a volume-at-parity test showing ≥10% reclaimable volume. *Kill criterion:* if bypass exemptions still exceed ~20% of volume after two quarters, pause the ML investment — the models won't see the user's real state, and the organizational problem has to be solved first.

**Phase 3 — the ML stack (2 quarters, overlapping; 2 ML engineers + 1 DS).** Ranker, uplift head, send filter. The first clearly attributable business-metric lift lands here. *Gate:* uplift-ranked targeting beats engagement-ranked on a GCG read (Qini, not AUC). *Kill criterion:* if the experiment corpus is too thin for stable CATE estimates after a quarter, run engagement ranking with conservative caps and revisit after two quarters of corpus growth.

**Phase 4 — content engine (1–2 quarters; 1–2 ML engineers + content ops).** Cheap relative to earlier phases because it rides on their infrastructure — which is also why its published returns only reproduce on top of phases 1–3. *Gate:* generated variants beat the human baseline on >50% of paired tests with complaint rate flat. *Kill criterion:* if the paired corpus is under the reward-model bar, run a bandit over a small human-written variant pool; the LLM line waits.

Steady state: roughly 12–25 FTEs depending on scale, plus single-digit-percent infrastructure cost — the heavy models run offline; the reward model and ranker are small and cheap at inference. On the illustrative platform from section 1, the fully loaded cost sits comfortably inside the first percentage point of incremental revenue.

## 5. Five scenarios: where this clears the bar, and where it doesn't

The envelope and the build above describe one kind of company. Most companies are not that company. Here is how the case reads at five platform shapes — the team each one actually needs, and the version of the build that's right-sized.

**Scenario A — large marketplace or social platform: 10M+ MAU, high message volume, large catalog.** The full case applies as written: five layers, four phases, 12–25 FTEs, 1–3% incremental at maturity, 3–6x base-case return. This is the shape the published literature describes — Pinterest, Twitter, and Kuaishou are all here. The binding risk is organizational, not technical: the balancer consolidation in phase 2. *Verdict: invest; the open question is sequencing discipline, not direction.*

**Scenario B — scale-up: 1–10M MAU, product-market fit, 50–200 engineers, comms currently one PM and a marketer on a vendor tool.** The case applies in miniature, and the right build is phases 1 and 2 only — on vendor infrastructure. Build the GCG (you're above the ~1M MAU measurement bar), enforce one decision point using the vendor's orchestration features, ship send-time optimization and a bandit over human-written copy — those four lines clear their data bars; uplift models and reward models don't yet. Team: 1 data engineer, 1 DS/analyst, the existing PM — 2–3 FTEs, $400–600k fully loaded. Return: the first honest incrementality read typically reveals that a noticeable share of volume is negative-value and reallocates it; if the corrected program lands at even 0.5–1% incremental on a $30–100M revenue base, that's $300k–$1M a year against a sub-$600k team — break-even to 2x immediately, with the data asset compounding toward the scenario-A case as you grow into it. *Verdict: invest small, in measurement and orchestration discipline; explicitly defer the ML stack. The warning sign of over-investment: an ML-engineer req for comms before the GCG exists.*

**Scenario C — early stage: <1M MAU, 10–30 engineers.** The case doesn't clear the bar, and the honest version of this article says so. Below ~1M MAU a holdout can't resolve tenth-of-a-percent effects in any reasonable window; uplift and reward models are years of data away; and every FTE on comms infrastructure is an FTE off the product gap that actually determines survival. Right-sized version: a vendor stack, a permanent 5% holdout configured in an afternoon — the discipline costs nothing even while the read is noisy, and it prevents attribution mythology from taking root — flat caps, transactional hygiene. Cost: a fraction of one FTE. *Verdict: don't build; instrument. Revisit at 1M+ MAU or one send per user per day.*

**Scenario D — small catalog, dense signal: neobank, fintech, or subscription utility with 8–20 products and rich per-user transactional history.** The full build is over-engineered, but a different, lighter AI architecture clears the bar at almost any size above the measurement bar. The catalog fits in a prompt, so an LLM can rank the full product set against the user's recent activity directly — no recommender, no reward-model pipeline. Copy lives in a small variant space where a bandit converges in days. Volume pressure is low, so the balancer is a budget table, not a learned model. Team: 1–2 ML-literate engineers plus the lifecycle marketer. The return concentrates in conversion quality rather than volume efficiency — fewer, sharper messages whose product selection actually reflects the user's situation. *Verdict: invest, but in the LLM-as-segmenter architecture, not the marketplace stack. The warning sign of mis-investment: a recommender or reward model being built for a 12-item catalog.*

**Scenario E — low-frequency or B2B product: users appear weekly or monthly, sparse behavioral signal, comms is mostly lifecycle email.** Most of this article doesn't apply, and the failure mode is pretending it does. Per-user budget models, RL filters, and uplift heads all starve below roughly one signal-rich session a week — the state features they condition on don't exist. What transfers: the holdout (measurement is shape-agnostic), send-time optimization (works on sparse data), deep-linked landings, and ruthless unsubscribe protection — in a low-frequency relationship every send is a meaningful share of the user's total impression of you, so a bad send costs *more* here than at a marketplace, not less. Team: nobody dedicated; it's a quarterly discipline for the existing growth team. *Verdict: don't fund a platform; fund restraint. If someone is quoting marketplace-scale uplift numbers at a B2B SaaS board, the numbers are someone else's.*

The cross-scenario pattern is worth stating plainly: the mechanisms that work everywhere are measurement, send-time optimization, landing quality, and unsubscribe protection. The mechanisms that need scale are exactly the ones with the impressive published numbers. An investment case that doesn't say which side of that line your platform is on isn't a case yet.

## 6. The risk register

Any honest case includes the ways the return doesn't materialize. The recurring ones, with mitigations:

**Attribution inflation.** Pre-GCG numbers overstate comms impact — the channel gets credit for conversions that were coming anyway. Mitigation: fund phase 1 first and re-baseline; size the case on incremental figures only.

**Metric gaming.** Single-metric dashboards drift the program toward clickbait and over-sending within a few cycles. Mitigation: the multi-metric stack as the program's headline, with unsubscribe and complaint rates as hard constraints.

**Reward hacking in generation.** Models optimized against raw engagement learn overclaims and factual drift. Mitigation: selection-only reward models, brief-grounded claims, a judge model, and a human gate on new prompts.

**Balancer bypass.** Exceptions accumulate until the budget model no longer sees the user's real state. Mitigation: bypass requires named executive approval and shows up in a quarterly audit — and it's a phase-2 kill criterion, above.

**Wear-out.** Fresh copy loses a third to half of its open rate within a few months at stable volume. Mitigation: continuous generate-and-select refresh plus diversity-aware reranking — per-user recent-send memory with decaying similarity penalties — attacking the same decay from both sides.

**Scale mismatch.** The scenario-C and scenario-E failure: funding marketplace machinery below its data bar. Mitigation: check the minimum-data-bar column in section 3 before any line item is funded.

## 7. The shape of the decision

The communications investment case is unusual among growth investments in three ways. The returns are bounded and published — the proposal can be benchmarked against Pinterest's, Twitter's, and Kuaishou's production numbers rather than a vendor promise. The returns compound through data assets — the experiment corpus, the reward model, the budget model — so tenure matters, and starting earlier is cheaper than starting bigger. And the same machinery that produces the lift also protects the asset it draws on, the user's attention, because the highest-return mechanisms in the published literature are precisely the ones that send *less*.

So the version I'd put on the table is short: state which scenario you're in; fund measurement first; stage the rest behind gates with kill criteria; and benchmark every claimed return against the published envelope. Whether the case clears your bar depends on your alternatives — but it can be written in numbers, staged in quarters, audited against a holdout, and right-sized to the platform. Not many growth investments offer that.

---

*References: Pinterest notification platform (KDD 2018); O'Brien et al., "Should I send this notification?" (arXiv 2202.08812); Yue et al., "Learning to Rank for Push Notifications Using Pairwise Expected Regret" (arXiv 2201.07681); Kuaishou PushGen (WSDM 2026); eMarketer/TransUnion incrementality survey, July 2025.*
