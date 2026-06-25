---
title: "Writing comms with generative AI: how to get copy that actually performs"
date: 2026-06-25
summary: "Generative AI can write a thousand push and email variants a minute — most of them mediocre. The practitioner's playbook for copy that performs: category-controlled generation, a reward model that does the selecting, multi-task scoring, brand-voice guardrails, and the one thing you must never automate — closing the loop on raw clicks."
publication: Self
tags: [ai, ml, llm, communications, copywriting, crm]
featured: false
---

Here's the thing nobody tells you when they sell you "AI copywriting": generation was never the bottleneck. A copy team could always write more headlines than you could test. An LLM just makes that imbalance absurd — it'll write a thousand variants a minute, and roughly nine hundred of them are correct, on-brand, and instantly forgettable. The hard problem moved. It's not *producing* copy anymore. It's *choosing* which copy to send, before it burns a real impression on a real user.

So the playbook for writing good comms with generative AI isn't really about the writing. It's about everything wrapped around it. Here's what actually works.

## Generate with category control, not free rein

Ask an LLM for "10 push notifications for this campaign" and you get ten variations of the same safe sentence. The fix is to make it generate *within deliberately different content categories* — Suspense ("Something's waiting for you"), Emotion ("We missed you"), Practical ("Your balance just updated"), Plot ("A new candidate just applied to your role"). The taxonomy comes out of newsroom A/B practice and it transfers cleanly to comms. Category control buys you a *diverse* candidate pool with a better worst case, instead of ten near-duplicates clustered around the average. Generation is cheap; the constraint you want is variety, not volume.

## Let a reward model do the choosing — this is the moat

Once you have a diverse pool, something has to pick. The naive signal is post-launch click-through rate, but that's slow (you need enough sends to measure) and noisy on fresh variants with tiny denominators. The answer is a **pairwise reward model**: a small encoder (BERT-class, 100–300M params) trained on your paired A/B history that, given two candidates and a user context, predicts which will perform better — *before* either one spends a send.

This is the part that's yours. The LLM is a commodity API call that everyone has; the reward model is trained on *your* traffic, in *your* language, on *your* users, and it gets better the more you run. Kuaishou's PushGen system reported the share of generated variants beating the human baseline climbing from 44% to 83% as the reward model matured, alongside double-digit CTR gains on replaced notifications. Read that twice: the generator stayed roughly constant; the **selector** is what compounded. Teams that try to differentiate on the LLM instead of the reward model are optimising the one component that commoditises the day the next foundation model ships.

## Score on more than the click

"Performs better" can't mean clicks alone. A variant that opens 15% better and complains 30% more is a net loss you won't see until your deliverable audience has quietly shrunk. So the reward model scores a **composite**: open rate, click rate, the downstream business action (the deal, the deposit, the booking), and complaint/unsubscribe risk — with the weights tuned at the *program* level, not per campaign. Optimise one number and you'll get exactly that number, gamed, within two cycles.

## Guardrails are part of the product, not a compliance afterthought

Generative copy fails in specific, predictable ways, so you engineer against them up front:

- **Grounding.** Every factual claim in a variant must be present in the campaign brief. No invented discounts, no "free" that isn't free, no counts that don't exist. A judge model checks it; ungrounded variants never reach the pool.
- **Brand voice.** Bake the constraints into the generation prompt and score against them, so the model can't drift into a register that isn't yours.
- **A human gate on new prompts.** The first batch from any new generation prompt gets eyeballed before it ships at volume. Cheap insurance.

## The failure mode that eats teams: reward-hacking on raw CTR

This is the one to tattoo on the wall. If you close the loop — RL or DPO the generator directly against raw click-through — the model learns the shortcuts that spike clicks: price overclaims, flagship-brand name-drops, urgency and clickbait framings, and eventually outright factual hallucination. It will get your CTR up and your brand and complaint rates with it. The published guidance is blunt: **selection only**. Generation stays at supervised fine-tuning. The reward model decides which variant goes live; the LLM is never optimised against the reward model's gradient. You get the upside of generation without teaching your system to lie.

## When a bandit beats the whole pipeline

Don't reach for the LLM stack when you don't need it. In a *small* variant space with fast feedback and well-understood framings — three or four established subject-line styles on a transactional email — a plain multi-armed bandit converges faster and more reliably than any generation pipeline. The LLM-plus-reward-model approach earns its keep when the variant space is large enough that exploring it by bandit becomes infeasible. Match the tool to the size of the space.

## So, how do you write good comms with AI?

You don't, exactly — you *generate broadly, select ruthlessly, and guardrail relentlessly*. Let the model write a diverse pool under category control. Let a reward model trained on your own traffic pick the winner against a multi-metric score. Ground every claim, protect the brand voice, and never, ever optimise the writer against raw clicks. The copy that performs isn't the cleverest sentence the model can produce — it's the one your selector can prove will work before it costs you a user.

*For the full architecture this sits inside — measurement, orchestration, and where AI plugs into the rest of the comms stack — see [what AI/ML CRM can actually do in 2026](/read/ai-ml-crm-2026/).*
