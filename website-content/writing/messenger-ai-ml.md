---
title: "Inside the marketplace messenger: the AI/ML that helps strangers transact"
date: 2026-06-25
summary: "On a transactional marketplace the messenger is the conversion engine, not a chat feature — every buyer–seller conversation is a near-deal. A practitioner's account of the AI/ML behind it: intent and inbox ranking, suggested replies, price and negotiation, the agreement signal that stands in for off-platform deals, generative assistants, and the trust layer underneath."
publication: Self
tags: [ai, ml, communications, marketplace, messaging, nlp]
featured: false
---

The messenger is the conversion engine of a transactional marketplace. Search and recommendations decide what a buyer sees; the chat is where the deal is actually made or lost. Every conversation is a near-deal, which is why the surface deserves the rigour a ranking team gets — and why it carries one problem ranking does not: on a classifieds marketplace the sale usually finishes off-platform, so the system often cannot observe whether it won.

Scale sets the terms. On a marketplace with 60M+ monthly users, 180M+ live listings and half a million new ones added a day, roughly half of all deals are agreed in chat and users open millions of new conversations daily — hundreds of millions you will never read and can only model. The job, then, is not to automate the conversation. It is to remove friction from it and to learn its outcome.

**The jobs.** Strip away the bubbles and the messenger runs four jobs on one attention surface — capturing intent, moving a negotiation, building enough trust for two strangers to transact, and keeping both sides safe. Each is a place ML earns its keep, and each is a place where doing it badly quietly costs GMV.

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

The first model in the stack reads the message and decides what it is for. "Still available?", "Last price?", "Can you post it?", "Where can I see it?" are four intents that route to four flows — an availability toggle, a price surface, a shipping quote, a meetup scheduler. "Still available?" is the dominant opener on any classifieds platform and the item usually is, so answering it instantly — before the seller opens the app — is the highest-return automation in the messenger. Buyer messages are also messy: one bubble can carry several questions with the salient one buried, which is why published work on buyer–seller messaging reformulates a long message into its single most important question before answering it ([arXiv 2401.09785](https://arxiv.org/pdf/2401.09785)).

Intent has a second axis, and it is the one that makes the rest tractable: not only *what* the message asks, but *how hot* the conversation is. The same first-party signal that powers recommendations — what the buyer viewed, saved, searched, how fast they came back and replied — is what published marketplace work scores purchase intent from ([Adevinta on purchase-intent prediction](https://adevinta.com/techblog/how-to-predict-the-purchase-intent-of-users-in-e-commerce-marketplaces/)); applied per thread it becomes a **deal probability** for each conversation. A busy seller does not have "too many messages"; they have three threads that will buy and twelve that will not, and a model that **ranks the inbox by predicted deal probability** is what separates them. The same score decides which threads earn a nudge, which get a generated reply versus a one-tap template, and which are safe to deprioritise. The shift is from routing every inbound by recency to routing it by intent and conversion likelihood.

## Suggested replies: a maturity ladder, climbed too far

The highest-leverage feature in a messenger is the one that makes people reply faster — sellers are slow, buyers move on, and more than half of buyers reach sellers by chat rather than a call, so the text box *is* the funnel. Google's **Smart Reply** ([Kannan et al., KDD 2016](https://arxiv.org/abs/1606.04870)) set the template at email scale: short, diverse, one-tap responses. On a marketplace the same mechanic splits two ways — **suggested replies** give the seller three tappable answers tuned to intent, and **ice-breakers** give the buyer an opener against a blank box, lifting the share of listings that get a first message at all.

Underneath sits a maturity ladder, and most teams over-climb it. **Templates** come first — saved canned replies, no ML; one large marketplace shipped them to private sellers first and saw 130,000 adopt them in two months. **Ranking** comes next — using predicted intent and listing context to choose *which* template or canned reply to surface. **Generation** is the top rung — drafting a bespoke reply from the listing, fenced by the retrieval guardrails below. Most of the value sits on the bottom two rungs; generation earns its place only where it provably beats a good template, because a generated reply that is confidently wrong about a real item costs the deal and the trust at once.

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

## Negotiation: close the gap before it opens

Most deals die in the gap between what the seller wants and what the buyer will pay, and the cheapest way to close it is to stop it opening. That work starts before the chat, at listing time, with a **recommended-price** model — analyse comparable *active and sold* listings and surface the band an item actually clears in, not the mean but the working price, flagging when the seller is above market. For structured categories — cars, real estate — this becomes a full **automated valuation model**, and the move that matters is showing it to the buyer as a trust label ("good price", "great price"): a model-backed price pre-empts the haggle, because a number the platform's data stands behind is far harder to argue down than one a stranger invented.

Inside the chat, two mechanisms narrow what is left. **Price guidance** tells the seller where the item realistically clears and the buyer when an offer is in range. **Structured offers** turn "would you take £X?" from free text into a tap-to-accept object — which is what makes it *measurable*: you can rank it, suppress lowballs, auto-suggest a counter, and, critically, know an offer was made so it becomes a feature for the agreement model downstream. Free-text haggling is invisible to your metrics; a structured offer is a labelled event.

## The hard one: did the deal happen?

This is where the real engineering is, because the outcome is largely unobservable. A marketplace splits into two worlds — a **transactional** one where the deal closes on-platform (delivery, a booking, a paid service) and is visible, and a **classified** one where two people meet through the platform and close in a car park you will never see. In the second world the transaction completes off-platform and is frequently the majority of the value. Counting completed deals therefore undercounts; counting buyer→seller **contacts** overcounts just as badly, because one buyer messaging ten sellers logs ten contacts for at most one deal. Neither end of the funnel is the truth.

The signal that is the truth sits between them: the **agreement** — the moment the two sides commit ("I'll take it, Saturday at 2"). It is closer to the sale than a contact and far more observable than an off-platform handshake, and it generalises across categories. So you train a model to find it, and the difficulty is not the architecture but making a fuzzy human concept learnable:

- **Make it binary.** "Is this chat an agreement — yes or no?" Tagging *kinds* of agreement explodes into dozens of overlapping labels no one applies consistently; two opposite classes is what makes the labels clean and the model trainable.
- **One labelling instruction, across teams.** Data science wants separability, the business wants nuance, analysts want it counted identically in every category. You converge by labelling real chats together, hunting the grey zones, and rewriting the instruction until they are gone.
- **A real annotation pipeline.** A working group labels a seed set, trains assessors, assessors label at volume, validators spot-check disagreements and feed systematic errors back. Label quality is the whole ballgame; the model is downstream of it.
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

## Assistants: generation, fenced

Generative models join as **assistants**, not autopilots, and this is no longer hypothetical — the largest classifieds platforms already ship buyer- and seller-side AI assistants and automate seller follow-ups to people who viewed or saved a listing. The placements that pay: **instant answering** — the buyer asks what the listing already answers, and the model drafts the reply by *retrieving* the facts from the listing and history rather than inventing them. Retrieval is the whole trick: RAG, not free-form generation, because a confident wrong answer about a real item is worse than no answer. Done well it absorbs a serious share of buyer questions — at one large marketplace, on the order of one in eight — with no seller in the loop. The rest of the placements are **summarisation** (where a 40-message thread landed), **translation** (which quietly unlocks cross-language deals), and **drafting help** for sellers who freeze. Every one is *model proposes, human sends.* That boundary is the product.

## Trust and safety: under everything

Two functions are non-negotiable and invisible when they work — **fraud detection** (advance-fee scams, off-platform-payment bait, phishing) and **content moderation**. They are table stakes: a messenger that lets a buyer get scammed loses that buyer for good, the most expensive churn there is. The scammer's playbook barely varies — drag the conversation off the safe channel, to another messenger, a "payment" link, a "courier" app, where the next action is irreversible — so part of the model's job is to notice that move and flag it, and to make the platform's own payment and delivery the path of least resistance. One practical tell the best systems lean on: a genuine payment link arrives as a *system* message, never typed by the other person.

**The line you do not cross:** do not automate the human. A messenger that replies on the seller's behalf, or floods buyers with bot-perfect copy, destroys the one thing that makes a stranger hand over cash — the sense that there is a real person on the other side. Over-automation reads as a scam even when it is not. AI removes friction — faster replies, clearer offers, instant answers, safety — and the platform stays out of the way; the model drafts, the person decides. That is the whole discipline: a stack of models judged on one outcome, whether more strangers safely transacted.

*Companion to my account of [what AI/ML CRM can actually do at scale](/writing/ai-ml-crm-2026/) — the same discipline, applied to the surface where the deal is closed rather than triggered.*
