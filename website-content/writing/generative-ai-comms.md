---
title: "Writing comms with generative AI: a pipeline, not a prompt"
date: 2026-06-25
summary: "Generating copy is easy — choosing the best variant quickly is the hard part. The pipeline that saves on drafting, pre-checks, and live testing: generate under category control, gate with cheap deterministic checks, then an LLM judge on a rubric, then a reward model that selects, then rotation and A/B — and the one loop you must never close."
publication: Self
tags: [ai, ml, llm, communications, copywriting, crm]
featured: false
---

The traditional way to ship a marketing message is expensive at every step: a marketer drafts the copy, an editor reworks it, legal and brand review sign it off, and then a long A/B — weeks of live traffic — decides whether it was any good. An LLM collapses the first step to nothing: a thousand variants a minute, most of them correct, on-brand and interchangeable, a few actively dangerous. Generation is easy now; choosing the best variant quickly — without the editors, the lawyers, and the month of live traffic — is the hard part, and the part that pays.

The object to build is a **pipeline, not a prompt**, and it saves at all three points of the old flow. Copy: the model does most of the drafting; the marketer sets the brief and the constraints. Pre-checks: rule checks and an LLM judge run the editor's and the lawyer's first pass (grounded claims, tone, banned constructions) deterministically and in minutes. Live testing: a reward model trained on past A/Bs picks the likely winner *before* a single send, so the live experiment confirms a favourite instead of exploring a field. Five stages, with most of the risk removed by the two cheap middle ones: rule checks and the judge.

<figure class="fig">
<svg viewBox="0 0 720 116" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The content pipeline: generate, rule checks, LLM judge, reward-model select, rotate and A/B test">
  <defs><marker id="pa" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6" style="fill:none;stroke:var(--faint);stroke-width:1.4"/></marker></defs>
  <g style="font-family:var(--mono)">
    <rect x="12" y="32" width="118" height="52" rx="9" style="fill:var(--soft);stroke:var(--line)"/>
    <text x="71" y="60" text-anchor="middle" style="font-size:12px;fill:var(--ink)">GENERATE</text>
    <text x="71" y="75" text-anchor="middle" style="font-size:9px;fill:var(--faint)">variants</text>
    <rect x="152" y="32" width="118" height="52" rx="9" style="fill:var(--soft);stroke:var(--line)"/>
    <text x="211" y="60" text-anchor="middle" style="font-size:12px;fill:var(--ink)">CHECKS</text>
    <text x="211" y="75" text-anchor="middle" style="font-size:9px;fill:var(--faint)">regex + rules</text>
    <rect x="292" y="32" width="118" height="52" rx="9" style="fill:var(--soft);stroke:var(--line)"/>
    <text x="351" y="60" text-anchor="middle" style="font-size:12px;fill:var(--ink)">JUDGE</text>
    <text x="351" y="75" text-anchor="middle" style="font-size:9px;fill:var(--faint)">LLM rubric</text>
    <rect x="432" y="32" width="118" height="52" rx="9" style="fill:var(--accent);fill-opacity:.1;stroke:var(--accent);stroke-width:2"/>
    <text x="491" y="60" text-anchor="middle" style="font-size:12px;fill:var(--accent)">SELECT</text>
    <text x="491" y="75" text-anchor="middle" style="font-size:9px;fill:var(--accent)">reward model</text>
    <rect x="572" y="32" width="118" height="52" rx="9" style="fill:var(--soft);stroke:var(--line)"/>
    <text x="631" y="60" text-anchor="middle" style="font-size:12px;fill:var(--ink)">ROTATE</text>
    <text x="631" y="75" text-anchor="middle" style="font-size:9px;fill:var(--faint)">A/B + refresh</text>
  </g>
  <g style="stroke:var(--faint);stroke-width:1.4">
    <line x1="132" y1="58" x2="150" y2="58" marker-end="url(#pa)"/>
    <line x1="272" y1="58" x2="290" y2="58" marker-end="url(#pa)"/>
    <line x1="412" y1="58" x2="430" y2="58" marker-end="url(#pa)"/>
    <line x1="552" y1="58" x2="570" y2="58" marker-end="url(#pa)"/>
  </g>
</svg>
<figcaption>The pipeline. The two cheapest stages — rule checks and the judge — remove most of the risk; the reward model, the only part that is genuinely yours, decides what performs.</figcaption>
</figure>

## Generate: broadly, under control

A prompt for "10 push notifications" returns ten variations of one safe sentence. The control that matters is **category control** — generate within deliberately different content categories: Suspense ("Something's waiting for you"), Emotion ("We missed you"), Practical ("Your balance just updated"), Plot ("A new candidate just applied to your role"). The taxonomy comes from newsroom A/B practice and transfers cleanly to comms; it buys a *diverse* pool with a better worst case rather than ten near-duplicates around the mean. The constraint to enforce is variety, not volume.

The generator itself is the last place to spend effort — a frontier API under a good prompt is enough, and in production we deliberately spent no time on fine-tuning or custom tokenizers, because testing and judging paid better than any generator improvement would have. The effort goes into **grounding**: guiding the model — and the marketer writing the brief — with the data the platform already has. Three datasets do most of the work: the *category taxonomy* (what the platform actually sells, in the platform's own terms), *live listings* (real titles, prices, attributes — so the copy names concrete things instead of paraphrasing the brief), and the *performance corpus* (which headers won in which category, at what open rate — the same paired history the reward model below trains on). The same grounding powers the flow that matters more in practice than writing from scratch: **rewriting**. A running communication with a decaying header goes in with its performance history; the model generates constrained rewrites that keep the offer and the facts but vary the framing; the pipeline below decides which rewrite ships. The marketer's job shifts from author to editor of record — set the brief, check the facts the model was fed, review what survives the gates.

## Cheap checks first: regex and rules

Before a single LLM call evaluates quality, run the deterministic gate. Most bad variants fail for boring, *checkable* reasons — a "free", "-50%" or "guarantee" the brief never authorised; a price or count absent from the source data; ALL CAPS; three exclamation marks; an emoji storm; a phone number or raw link; length out of bounds; a banned word. Regex and rules catch every one of those in microseconds, deterministically, with an audit trail, and they remove the majority of the junk before it reaches anything expensive. The rule is simple: **if a check can be written as a regex or a lookup, it should never be an LLM's job.** Skipping this layer spends judge budget on failures that a lookup would have caught.

## The judge: LLM-as-judge, on a rubric

What survives the rules needs judgement a regex cannot make — is every factual claim **grounded** in the brief, is the tone on-brand, is it safe and non-deceptive. The mechanism is an **LLM-as-judge**, but not "is this good?": a **per-domain rubric** — explicit criteria, a fixed *held-out* set of test cases, and a score tracked over time. One large marketplace controls its generation quality this exact way: for each domain, a judge prompt spelling out detailed criteria, run on held-out cases, used as the signal for whether a model or prompt change actually helped. The judge doubles as the **regression test for the generator** — the way you learn that a small tweak to the generation prompt quietly made the copy worse, before users do.

The checks and the judge compose into one harness, and the production design is worth copying as-is. Deterministic **autochecks** run first over the whole artifact, each returning a tag plus evidence; a policy sorts the tags into three buckets — **required** (must be true, otherwise fail), **forbidden** (must not fire, otherwise fail), and **optional** (measured, diagnostic, non-blocking). Only what passes the rules reaches the judge, and the judge runs **one criterion per call**: each rubric item gets its own prompt with the source facts, the full artifact, and that single criterion, and returns a score plus a reason — criteria do not bleed into each other. For conversational surfaces the unit of evaluation is the **whole dialogue against a simulated counterparty**, not an isolated phrase: a scenario and a profile seed a simulator that plays the other side turn by turn, with a fixed **smoke-test slate** of hard cases (the haggle, the availability question, the meeting, the odd out-of-scope request) as the regression net. Collapse all of that into a single "is this good?" prompt and the judge can no longer tell you *what* broke — which is the whole argument for required/forbidden/optional and one criterion per call.

## Select: the reward model

Checks and the judge decide what is *allowed*; neither decides what will *perform*. That requires learning from outcomes. Post-launch click-through is the naive signal — slow, and noisy on fresh variants with tiny denominators. The mechanism is a **pairwise reward model**: a small encoder (BERT-class, ~300M params — BERT-300M in Kuaishou's deployment) trained on the platform's paired A/B history that, given two candidates and a user context, predicts which wins before either spends a send.

This is the part that is genuinely yours. The LLM is a commodity everyone has; the reward model is trained on *your* traffic, in *your* language, on *your* users, and compounds with use. In Kuaishou's PushGen, supervised fine-tuning of the 8B generator lifted the share of variants beating the human baseline from 44% to 83%; the pairwise reward model then selects among that pool, and the deployed system delivered +14.08% CTR on the 85.2% of push volume where it replaced the human baseline. Generation gives you a strong pool; selecting the winner on *your* data — before it spends a send — is the part no foundation model hands you. And it scores a **composite**, never clicks alone — open rate, click, the downstream business action, complaint and unsubscribe risk, weighted at the program level. A variant that opens better and complains more is a net loss that surfaces only once the deliverable audience has shrunk.

## Rotate and A/B

The reward model gates *pre-launch*; the live experiment confirms. Two things govern this stage. **Rotation against wear-out** — a fresh headline decays (half-life of 60–120 days at stable volume), so generation runs continuously and the reward model keeps swapping the champion, flattening the decay rather than resetting it on a quarterly cadence. The decay is not hypothetical: on long-running campaigns OR drops 30%+ over ~3 months (6.0% → 4.2% on one reused header pair at flat volume) — tens of thousands of opens lost against a fresh variant. **The bandit boundary** — in a small, well-understood variant space (three subject-line styles on a transactional email) the whole pipeline is overkill; a multi-armed bandit converges faster and more reliably. The generate→check→judge→select→rotate machine pays off only when the variant space is too large to explore by bandit.

The bandit side of that boundary has its own craft, visible in one large marketplace's headline-selection system. Ranking headlines by **raw** open rate over-exploits the current leader: a headline whose OR spiked on a thin sample takes the traffic, burns through its eligible audience, and degrades at scale. The production fix has three parts. **Posterior OR** — each headline's estimate is shrunk toward the campaign average, weighted by accumulated data, so a lucky small sample cannot produce a false leader. **Weighted top-N** — exploit traffic is split across several strong headlines instead of all going to one. **Targeted exploration** — the learning budget is spent only on new or under-observed variants, not at random across the whole set. The confidence threshold is **scale-aware**: a large campaign needs far more sends before a variant counts as known than a small one — the same minimum-data-bar logic the reward model lives by. Validation runs in two stages: **offline replay** on historical sends first (the redesign showed a double-digit relative OR gain, ~0.5 p.p. on the campaign), then A/B, because replay shows potential, not causation. And the guardrail that matters most: the bandit optimizes opens, so the downstream business action is watched separately — an OR win does not always survive to a deal.

<figure class="fig">
<svg viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The variant funnel: a thousand generated, a fraction pass rule checks, fewer pass the judge, the reward model ranks the rest, one ships and A/B confirms">
  <rect x="40" y="18" width="600" height="34" rx="8" style="fill:var(--soft);stroke:var(--line)"/>
  <text x="340" y="40" text-anchor="middle" style="font-size:12px;fill:var(--muted)">~1,000 generated under category control</text>
  <rect x="110" y="60" width="460" height="34" rx="8" style="fill:var(--soft);stroke:var(--line)"/>
  <text x="340" y="82" text-anchor="middle" style="font-size:12px;fill:var(--muted)">pass rule checks (regex)</text>
  <rect x="170" y="102" width="340" height="34" rx="8" style="fill:var(--soft);stroke:var(--line)"/>
  <text x="340" y="124" text-anchor="middle" style="font-size:12px;fill:var(--muted)">pass the judge (grounded · on-brand · safe)</text>
  <rect x="220" y="144" width="240" height="34" rx="8" style="fill:var(--accent);fill-opacity:.1;stroke:var(--accent);stroke-width:2"/>
  <text x="340" y="166" text-anchor="middle" style="font-size:12px;fill:var(--accent)">reward model ranks the survivors</text>
  <rect x="280" y="186" width="120" height="30" rx="8" style="fill:var(--soft);stroke:var(--line)"/>
  <text x="340" y="206" text-anchor="middle" style="font-family:var(--mono);font-size:11px;fill:var(--ink)">SHIP &#8594; A/B</text>
</svg>
<figcaption>A thousand candidates in, one ships — and the live A/B feeds the reward model that picked it.</figcaption>
</figure>

## The loop you never close: reward-hacking on raw CTR

One failure mode dominates. Close the loop — RL or DPO the *generator* directly against raw CTR — and the model learns the shortcuts that spike clicks: price overclaims, flagship-brand name-drops, urgency and clickbait, eventually outright hallucination. CTR rises, and complaint and brand-risk rates rise with it. The published guidance is blunt: **selection only.** Generation stays at supervised fine-tuning; the reward model decides which variant ships; the LLM is never optimised against the reward model's gradient. The pipeline keeps the upside of generation without training the generator toward overclaims — which is also why the rule checks and the judge exist.

## In one line

Generate broadly, gate cheaply, judge strictly, select on outcomes, rotate continuously — and never optimise the generator against raw CTR. The copy that performs is the one that passed the checks, the judge, and the reward model's comparison before it cost a single send.

*This piece covers one layer — the content engine. For the architecture it sits inside — measurement, orchestration, and where AI plugs into the rest of the comms stack — see [what AI/ML is actually capable of in CRM in 2026](/writing/ai-ml-crm-2026/); for the conversational surface those messages land on, see [inside the marketplace messenger](/writing/messenger-ai-ml/).*
