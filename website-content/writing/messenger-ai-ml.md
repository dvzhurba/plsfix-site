---
title: "Inside the marketplace messenger: the AI/ML that helps strangers transact"
date: 2026-06-25
summary: "On a transactional marketplace the messenger is the conversion engine, not a chat feature — every buyer–seller conversation is a near-deal. A practitioner's account of the AI/ML behind it: intent and inbox ranking, suggested replies, price and negotiation, the agreement signal that stands in for off-platform deals, generative assistants, and the trust layer underneath."
publication: Self
tags: [ai, ml, communications, marketplace, messaging, nlp]
featured: false
---

The messenger is the conversion engine of a transactional marketplace. Search and recommendations decide what a buyer sees; the chat is where the deal is actually made or lost. Every conversation is a near-deal, which is why the surface needs the same rigour as search ranking — and why it carries one problem ranking does not: on a classifieds marketplace the sale usually closes off-platform, so the system often cannot observe whether it won.

Scale sets the terms. On a marketplace with 60M+ monthly users, 180M+ live listings and ~500k new ones added a day, roughly half of all deals are agreed in chat, and users open millions of new conversations daily — conversations no one will ever read and can only model. The job is not to automate the conversation but to remove friction from it and learn its outcome.

**The jobs.** Strip away the chat bubbles and the messenger runs four jobs on one attention surface: capturing intent, moving a negotiation, building enough trust for two strangers to transact, and keeping both sides safe. Each is a place for ML — and each, done badly, costs GMV.

<figure class="fig">
<svg viewBox="0 0 680 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The marketplace messenger stack: intent, then replies and negotiation, then agreement prediction, over a trust and safety layer">
  <defs><marker id="ar" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6" style="fill:none;stroke:var(--faint);stroke-width:1.4"/></marker></defs>
  <rect x="18" y="26" width="150" height="50" rx="9" style="fill:var(--soft);stroke:var(--line)"/>
  <text x="93" y="56" text-anchor="middle" style="font-family:var(--mono);font-size:12px;fill:var(--ink)">INTENT</text>
  <line x1="170" y1="51" x2="196" y2="51" style="stroke:var(--faint);stroke-width:1.4" marker-end="url(#ar)"/>
  <rect x="200" y="26" width="180" height="50" rx="9" style="fill:var(--soft);stroke:var(--line)"/>
  <text x="290" y="48" text-anchor="middle" style="font-family:var(--mono);font-size:12px;fill:var(--ink)">REPLIES ·</text>
  <text x="290" y="64" text-anchor="middle" style="font-family:var(--mono);font-size:12px;fill:var(--ink)">NEGOTIATION</text>
  <line x1="382" y1="51" x2="408" y2="51" style="stroke:var(--faint);stroke-width:1.4" marker-end="url(#ar)"/>
  <rect x="412" y="26" width="190" height="50" rx="9" style="fill:var(--accent);fill-opacity:.1;stroke:var(--accent);stroke-width:2"/>
  <text x="507" y="48" text-anchor="middle" style="font-family:var(--mono);font-size:12px;fill:var(--accent)">AGREEMENT</text>
  <text x="507" y="64" text-anchor="middle" style="font-family:var(--mono);font-size:12px;fill:var(--accent)">PREDICTION</text>
  <rect x="18" y="96" width="584" height="36" rx="9" style="fill:none;stroke:var(--line);stroke-dasharray:5 4"/>
  <text x="310" y="119" text-anchor="middle" style="font-family:var(--mono);font-size:12px;fill:var(--muted)">TRUST &amp; SAFETY — under everything</text>
</svg>
<figcaption>One message in, a deal probability out. The agreement signal becomes the outcome every model upstream is trained on; trust &amp; safety runs underneath the whole thing.</figcaption>
</figure>

## Intent: what the message is for, and how hot

The first model in the stack reads the message and classifies what it is for. "Still available?", "Last price?", "Can you post it?", "Where can I see it?" are four intents that route to four flows — an availability toggle, a price surface, a shipping quote, a meetup scheduler. "Still available?" is the dominant opener on any classifieds platform and the item usually is, so answering it instantly — before the seller opens the app — is the highest-return automation in the messenger. Buyer messages are also messy: one bubble can carry several questions with the salient one buried, which is why published work on buyer–seller messaging reformulates a long message into its single most important question before answering it ([arXiv 2401.09785](https://arxiv.org/pdf/2401.09785)).

Intent has a second axis, and it is the one that makes the rest tractable: not only *what* the message asks, but *how hot* the conversation is. The same first-party signal that powers recommendations — what the buyer viewed, saved, searched, how fast they came back and replied — is what published marketplace work scores purchase intent from ([Adevinta on purchase-intent prediction](https://adevinta.com/techblog/how-to-predict-the-purchase-intent-of-users-in-e-commerce-marketplaces/)); applied per thread it becomes a **deal probability** for each conversation. A busy seller does not have "too many messages"; they have three threads that will buy and twelve that will not, and a model that **ranks the inbox by predicted deal probability** is what separates them. The same score decides which threads earn a nudge, which get a generated reply versus a one-tap template, and which are safe to deprioritise. The shift is from routing every inbound by recency to routing it by intent and conversion likelihood.

The ranking is what makes a nudge pay, and skipping it is instructive. One marketplace ran a reminder that pinged *every* seller who had read a buyer's message but not answered — unranked, fired across the whole population. It nudged reply rate slightly among the few who opened it, never converted into a measurable lift in deals, and even the reply-rate bump decayed over the weeks of the test. The lesson: the same deal-probability score that ranks the inbox decides which silences are worth breaking.

## Suggested replies: a maturity ladder, climbed too far

The highest-leverage feature in a messenger is the one that makes people reply faster — sellers are slow, buyers move on, and more than half of buyers reach sellers by chat rather than a call, so the text box *is* the funnel. And the leak is mostly latency: the median seller reply lands 1h+ after the buyer writes, so the highest-return work is anything that compresses that gap. Google's **Smart Reply** ([Kannan et al., KDD 2016](https://arxiv.org/abs/1606.04870)) set the template at email scale: short, diverse, one-tap responses. On a marketplace the same mechanic splits two ways — **suggested replies** give the seller three tappable answers tuned to intent, and **ice-breakers** give the buyer an opener against a blank box, lifting the share of listings that get a first message at all — in a controlled test, tappable openers lifted chat-start conversion by 3–5% (≈1% on total buyers), with no cannibalisation of calls, and the lift held as a plateau rather than a novelty spike.

Underneath sits a maturity ladder, and most teams over-climb it. **Templates** come first — saved canned replies, no ML; one large marketplace shipped them to private sellers first and saw 130,000 adopt them in two months. **Ranking** comes next — using predicted intent and listing context to choose *which* template or canned reply to surface. **Generation** is the top rung — drafting a bespoke reply from the listing, fenced by the retrieval guardrails below. Most of the value sits on the bottom two rungs; generation is justified only where it provably beats a good template in an A/B, because a generated reply that is confidently wrong about a real item costs the deal and the trust at once.

<figure class="fig">
<svg viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The suggested-reply maturity ladder: templates at the bottom hold most of the value, then ML ranking, then generation at the top used sparingly">
  <rect x="30" y="146" width="330" height="54" rx="9" style="fill:var(--accent);fill-opacity:.1;stroke:var(--accent);stroke-width:2"/>
  <text x="48" y="170" style="font-family:var(--mono);font-size:13px;fill:var(--accent)">1 · TEMPLATES</text>
  <text x="48" y="189" style="font-size:12px;fill:var(--muted)">saved canned replies, no ML — most of the value</text>
  <rect x="175" y="83" width="330" height="54" rx="9" style="fill:var(--soft);stroke:var(--line)"/>
  <text x="193" y="107" style="font-family:var(--mono);font-size:13px;fill:var(--ink)">2 · RANKING</text>
  <text x="193" y="126" style="font-size:12px;fill:var(--muted)">pick which reply to surface, by intent + context</text>
  <rect x="320" y="20" width="330" height="54" rx="9" style="fill:var(--soft);stroke:var(--line)"/>
  <text x="338" y="44" style="font-family:var(--mono);font-size:13px;fill:var(--ink)">3 · GENERATION</text>
  <text x="338" y="63" style="font-size:12px;fill:var(--muted)">draft from the listing via RAG — use sparingly</text>
</svg>
<figcaption>The reply-suggestion ladder. Each rung costs more and buys less; most teams over-climb it.</figcaption>
</figure>

Measuring the ladder is its own discipline, and the primary metric is not raw clicks. The one that survives scrutiny is the **set-level CTR** — out of all moments a block of 3–5 suggestions was shown, in what share the user tapped *any*: one decision per moment, not inflated by showing more chips. Under it sit **position CTR**, which shows when the first slot takes almost all taps and positions 4–5 earn almost none (the signal the set is too long), and the sharpest quality metric — the **share of taps sent without an edit**. A suggestion sent as-is is one the model got right; a suggestion tapped and then rewritten is a draft, not an answer — a falling edit-free share means the copy is losing the phrasing even while CTR holds. **Repeat use within a chat** (2+ taps vs one) separates real help from one-time curiosity. And the pairing that closes the loop: CTR is read alongside the deal metric, because a set of universal phrasings can grow taps without moving a single deal.

Clicks show what users do; they do not show whether the suggestion was good. So the production discipline adds a **monthly manual labeling pass** on a small random sample of real chats: each suggestion is marked OK / not-OK against a fixed, deliberately shallow error tree — irrelevance (wrong role, wrong dialogue stage, does not answer the message), language and tone, platform risk (an off-platform push, unsafe advice), invented details, technical garbage, duplication of the user's message or a neighbouring chip. Deeper trees make the labels noisy and the signal worse. This is the regression test the behavioural metrics cannot be: it catches a prompt change that quietly raised the invented-details rate *before* the deal metric does.

## The reply usually comes too late

There is a harder timing problem underneath the latency one. Follow a buyer past that first message and the majority end the session right there — the first contact is the last thing they do — with the median session under five minutes. The seller's reply, when it comes, lands to someone who has already closed the app and often drifted to another listing; only about a quarter of chats are answered while the buyer is still in that session. So a feature that tries to *hold* the buyer until the seller answers reaches only that quarter. The higher-return posture is to assume they will leave and design for the return — re-engaging the buyer, or nudging a second contact — rather than betting on a reply that statistically arrives too late.

## Negotiation: close the gap before it opens

Most deals die in the gap between what the seller wants and what the buyer will pay, and the cheapest way to close it is to stop it opening. That work starts before the chat, at listing time, with a **recommended-price** model — analyse comparable *active and sold* listings and surface the band an item actually clears in, not the mean but the working price, flagging when the seller is above market. For structured categories — cars, real estate — this becomes a full **automated valuation model**, and the move that matters is showing it to the buyer as a trust label ("good price", "great price"): a model-backed price pre-empts the haggle, because a number the platform's data stands behind is far harder to argue down than one a stranger invented. This is already shipped upstream of the chat: the conversational shopping assistant at one large marketplace shows exactly these labels — *fair price*, *matches valuation*, *low mileage* — next to each recommended listing, moving the pre-empt from the negotiation into discovery.

Inside the chat, two mechanisms narrow what is left. **Price guidance** tells the seller where the item realistically clears and the buyer when an offer is in range. **Structured offers** turn "would you take £X?" from free text into a tap-to-accept object — which is what makes it *measurable*: you can rank it, suppress lowballs, auto-suggest a counter, and, critically, know an offer was made so it becomes a feature for the agreement model downstream. Free-text haggling is invisible to your metrics; a structured offer is a labelled event.

## The hard one: did the deal happen?

This is where the real engineering is, because the outcome is largely unobservable. A marketplace splits into two worlds — a **transactional** one where the deal closes on-platform (delivery, a booking, a paid service) and is visible, and a **classified** one where two people meet through the platform and close in a car park you will never see. In the second world the transaction completes off-platform and is frequently the majority of the value. Counting completed deals therefore undercounts; counting buyer→seller **contacts** overcounts just as badly, because one buyer messaging ten sellers logs ten contacts for at most one deal — neither end of the funnel is the truth.

The signal that is the truth sits between them: the **agreement** — the moment the two sides commit ("I'll take it, Saturday at 2"). It is closer to the sale than a contact and far more observable than an off-platform handshake, and it generalises across categories. So you train a model to find it, and the difficulty is not the architecture but making a fuzzy human concept learnable:

- **Make it binary.** "Is this chat an agreement — yes or no?" Tagging *kinds* of agreement explodes into dozens of overlapping labels no one applies consistently; two opposite classes is what makes the labels clean and the model trainable.
- **One labelling instruction, across teams.** Data science wants separability, the business wants nuance, analysts want it counted identically in every category. You converge by labelling real chats together, hunting the grey zones, and rewriting the instruction until they are gone.
- **A real annotation pipeline.** A working group labels a seed set, trains assessors, assessors label at volume, validators spot-check disagreements and feed systematic errors back. Label quality decides everything; the model is downstream of it.
- **Validate against the deals you can see.** Check predictions against the ground truth you do capture — a seller marking "sold here" on takedown, a review left after a service, a both-sides confirmation in an in-chat survey.

<figure class="fig">
<svg viewBox="0 0 680 232" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The value funnel: contacts overcount at the top, completed deals undercount at the bottom, and the agreement in the middle is the learnable signal">
  <rect x="40" y="20" width="600" height="54" rx="9" style="fill:var(--soft);stroke:var(--line)"/>
  <text x="340" y="44" text-anchor="middle" style="font-family:var(--mono);font-size:13px;letter-spacing:.08em;fill:var(--muted)">CONTACTS</text>
  <text x="340" y="62" text-anchor="middle" style="font-size:12px;fill:var(--faint)">ten messages &#8594; maybe one deal — overcounts</text>
  <rect x="150" y="89" width="380" height="54" rx="9" style="fill:var(--accent);fill-opacity:.1;stroke:var(--accent);stroke-width:2"/>
  <text x="340" y="113" text-anchor="middle" style="font-family:var(--mono);font-size:13px;letter-spacing:.08em;fill:var(--accent)">AGREEMENT</text>
  <text x="340" y="131" text-anchor="middle" style="font-size:12px;fill:var(--muted)">the signal you can learn — and validate</text>
  <rect x="250" y="158" width="180" height="54" rx="9" style="fill:var(--soft);stroke:var(--line)"/>
  <text x="340" y="182" text-anchor="middle" style="font-family:var(--mono);font-size:13px;letter-spacing:.08em;fill:var(--muted)">DEAL</text>
  <text x="340" y="200" text-anchor="middle" style="font-size:12px;fill:var(--faint)">often off-platform — undercounts</text>
</svg>
<figcaption>Contacts overcount and completed deals undercount; the <em>agreement</em> in between is the metric you can actually train and steer on.</figcaption>
</figure>

Done right, this signal becomes the number the company steers on — one product metric that holds across every category, feeds analytics and product evaluation, and, the part that matters most, becomes the **outcome you A/B-test against** instead of clicks or messages sent. Everything upstream finally has a real target: intent, suggested replies, negotiation and nudges are judged on whether they moved *agreements*, not vanity counts.

The model's second job is the one that pays directly: **actuation**. Scored across the corpus, a meaningful share of conversations end in *could agree* — a substantive discussion (≥2 messages from each side), no visible blocker, and the buyer stops replying. One production mechanism recovers them. When the seller spoke last, the buyer has been silent for 24 hours, the model reads the chat as *could agree*, and the buyer hasn't already closed on another listing in the same category, the platform sends a gentle follow-up into the chat on the seller's behalf — "Hello! Any questions left? Happy to answer." The seller sees a note that it was sent for them and can switch the feature off; the copy rotates through a pool of hand-written variants so a buyer who meets it twice doesn't read it as a bot. Every condition is doing work: the exchange threshold keeps it out of dead chats, the 24-hour wait keeps it polite, the category check stops it nagging a buyer who already bought elsewhere, and the model gate points it only at conversations worth saving.

## Assistants: generation, fenced

Generative models join as **assistants**, not autopilots, and this is no longer hypothetical — the largest classifieds platforms already ship buyer- and seller-side AI assistants and automate seller follow-ups to people who viewed or saved a listing. The placements that pay: **instant answering** — the buyer asks what the listing already answers, and the model drafts the reply by *retrieving* the facts from the listing and history rather than inventing them. Retrieval is the core mechanism: RAG, not free-form generation, because a confident wrong answer about a real item is worse than no answer. Done well it absorbs a serious share of buyer questions — at one large marketplace, on the order of one in eight — with no seller in the loop. The headroom is larger than that number suggests. On one marketplace roughly 87% of unanswered chats had actually been *read* by the seller and left hanging, and about 70% of unanswered chats are substantive — a real question about the item, price, or delivery, or an outright "I'll take it." Those are answers the listing already holds; a retrieval-grounded assistant can close them without waiting on a seller who has seen the message and moved on. The rest of the placements are **summarisation** (where a 40-message thread landed), **translation** (which quietly unlocks cross-language deals), and **drafting help** for sellers who freeze. Every one is *model proposes, human sends* — that boundary is the product.

The direction the assistants are moving is *initiative*. The reactive framing above — buyer asks, model drafts — is one step behind what ships: the buyer-side shopping assistant carries **proactive settings** — assistant-initiated notifications and recommendation digests that follow up on a shortlist the buyer built in chat, opening the conversation instead of waiting for one. From the comms stack's view, this is **the recommendations channel with agentic capabilities**: the same selection machinery decides what to surface, but the message arrives in the messenger as a dialogue the buyer can question, refine, and act on — not a card that dead-ends on a tap. For the messenger it is a new surface — a message that arrives with the full context of a conversation, whose success signal is a reply, not a tap — and one discipline transfers from the comms stack unchanged: an assistant that reaches out is a *sender*, and it queues under the same per-user limit as every other communication the platform wants to send.

## Trust and safety: under everything

Two functions are non-negotiable and invisible when they work — **fraud detection** (advance-fee scams, off-platform-payment bait, phishing) and **content moderation**. They are table stakes: a messenger that lets a buyer get scammed loses that buyer for good, the most expensive churn there is. The scammer's playbook barely varies — drag the conversation off the safe channel, to another messenger, a "payment" link, a "courier" app, where the next action is irreversible — so part of the model's job is to notice that move and flag it, and to make the platform's own payment and delivery the path of least resistance. It is common enough to measure: on one marketplace, roughly one in twelve unanswered chats is an explicit attempt to pull the buyer to another channel, and about a fifth of unanswered chats are outright junk — the base rate the classifier has to live against. One practical tell the best systems lean on: a genuine payment link arrives as a *system* message, never typed by the other person.

**The line you do not cross — drawn precisely.** The blunt version is "do not automate the human": a messenger that floods buyers with bot-perfect copy destroys the one thing that makes a stranger hand over cash — the sense that there is a real person on the other side. The precise version is about *standing*. The platform may speak in a person's name only with that person's knowledge, with a visible off-switch, under conditions where they would plausibly have said exactly this — and it should sound like a person, which is why production systems rotate hand-written variants instead of reusing one template. Inside those bounds, a follow-up sent for a silent seller saves deals lost to inattention; outside them, the same message is indistinguishable from spam. Over-automation reads as fraud not because a machine wrote the words, but because nobody with standing stood behind them. The model drafts, the person decides — or has decided once, visibly, and can revoke it. That is the whole discipline: a stack of models judged on one outcome, whether more strangers safely transacted.

*This piece covers one surface — the messenger, where the deal is closed rather than triggered. For the full stack and the discipline behind it, see [what AI/ML is actually capable of in CRM in 2026](/writing/ai-ml-crm-2026/); for how the messages themselves get written and selected, see [writing comms with generative AI](/writing/generative-ai-comms/).*
