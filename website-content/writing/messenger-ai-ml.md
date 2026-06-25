---
title: "Inside the marketplace messenger: the AI/ML that helps strangers transact"
date: 2026-06-25
summary: "The chat between a buyer and a seller is the highest-stakes surface on a marketplace — every conversation is a near-deal. A practitioner's tour of the AI/ML behind it: intent, negotiation, predicting whether the deal happened, suggested replies and ice-breakers, assistants, and how you actually measure a surface where the sale finishes off-platform."
publication: Self
tags: [ai, ml, communications, marketplace, messaging, nlp]
featured: false
---

Picture this. A buyer taps "Is this still available?" on a used road bike. Nothing else — three words. What happens in the next ninety seconds decides whether the platform earns anything at all: whether the seller replies before the buyer messages five other listings, whether the price gap closes, whether the two agree a time and place, and whether either of them gets scammed on the way. None of that is "chat." It's the conversion engine of the whole marketplace, and it runs on a stack of AI/ML most people never see.

Search and recommendations get all the attention because they're easy to demo. But on a transactional marketplace, the messenger is where the money is made or lost. Every conversation is a near-deal. So it deserves the same product and ML rigour you'd put behind ranking — and it has its own hard problem that ranking doesn't: **the sale usually finishes off-platform**, so you often can't even see whether you won.

## The jobs the messenger actually does

Strip away the chat bubbles and a marketplace messenger is doing four jobs at once: **capturing intent** (what does the buyer actually want — the item, a lower price, delivery, a meetup?), **moving a negotiation** (price, condition, logistics), **building enough trust for two strangers to transact**, and **keeping both sides safe**. Each of those is a place AI/ML earns its keep — and a place where doing it badly quietly kills GMV.

## Intent: what is this message really asking?

The first model in the stack reads the message and decides what it's for. "Still available?", "Last price?", "Can you post it?", "Where can I see it?" are four different intents that should trigger four different flows — an availability toggle, a price-negotiation surface, a shipping quote, a meetup scheduler.

Buyer messages are messy: one bubble can carry several questions, and the salient one is buried. Recent work on e-commerce buyer–seller messaging reformulates a long message into the single most important question before answering it ([Message-to-Question Reformulation, arXiv 2401.09785](https://arxiv.org/pdf/2401.09785)). The same intent signal feeds purchase-intent prediction: marketplaces like [Adevinta have written about predicting buyer intent](https://adevinta.com/techblog/how-to-predict-the-purchase-intent-of-users-in-e-commerce-marketplaces/) from the constellation of actions around a chat — views, saves, favourites, and crucially whether a message got a reply. **A buyer who messages and gets answered is a different animal from one who messages into silence.**

**Old way:** treat every inbound as the same "new message," route it to the seller, hope they reply.
**New way:** classify intent on arrival, pre-fill the answer the seller is most likely to give, and route high-intent threads differently from tyre-kickers.

## Suggested replies and ice-breakers

The single highest-leverage feature in a messenger is the one that makes people reply faster. Sellers are slow; buyers move on. Google's **Smart Reply** ([Kannan et al., KDD 2016](https://arxiv.org/abs/1606.04870)) showed the template at email scale — short, diverse, one-tap suggested responses that, in Inbox by Gmail, drove on the order of 10% of mobile replies. On a marketplace the prize is bigger, because a faster first reply is directly upstream of a deal.

Two flavours matter. **Suggested replies** give the seller three tappable answers tuned to the buyer's intent ("Yes, still available", "Lowest is £X", "I can post it"). **Ice-breakers** give the *buyer* an opener when they're staring at a blank box — "Is this available?", "Would you take £X?", "Can I collect this weekend?" — which lifts the share of listings that get a first message at all. The job here isn't eloquence; it's removing the keystrokes between intent and a sent message.

**Achievable:** materially higher reply rates and faster time-to-first-response — the two metrics most predictive of a completed deal. The lift compounds, because every reply that arrives sooner is a buyer who hasn't yet messaged a competitor's listing.

## Negotiation: closing the price gap

Most marketplace deals die in the gap between what the seller wants and what the buyer will pay. AI can narrow it without a human haggling: a **price-guidance** model tells the seller where this item realistically clears (and tells the buyer when their offer is in range), and **structured offers** turn "would you take £X?" from free text into a tap-to-accept object you can actually measure and act on. The structured version is the one that scales — you can rank it, suppress lowballs, nudge a counter, and, critically, *know an offer was made*.

## The hard one: did the deal actually happen?

Here's the problem unique to messaging. A push campaign is measurable end to end — you held out a control group, you saw the purchase. A marketplace conversation frequently ends, "great, see you at 6 by the station," and the cash changes hands in a car park you'll never observe. The transaction completes **off-platform**.

So you build a model to predict it. A **deal-completion model** reads the conversation's trajectory — mutual replies, a meetup or address exchanged, an accepted offer, the conversation going quiet *after* a plan rather than before one — and estimates the probability the item sold. That predicted-deal signal is load-bearing: it's how you mark a listing sold, how you attribute value to the messenger versus search, how you decide which threads deserve a nudge, and how you train everything upstream (intent, replies, negotiation) on an outcome rather than a click. Get the prediction wrong and every metric above it drifts.

**Old way:** measure the messenger by messages sent. **New way:** measure it by *predicted deals* — and validate the predictor against the slice of transactions you can actually observe (in-app payments, shipping labels, "mark as sold").

## Assistants: where LLMs plug in

Generative models join the stack as **assistants**, not autopilots. The good placements: **instant answering** (the buyer asks a question the listing already answers — size, condition, pickup — and an LLM drafts the seller's reply from the listing and their history); **summarisation** ("here's where this 40-message thread landed: agreed £140, Saturday 2pm"); **translation**, which quietly unlocks cross-border and cross-language deals; and **drafting help** for sellers who freeze on a reply. Every one of these is "LLM proposes, human sends." That boundary is the whole game — which brings us to the failure modes.

## Trust, safety, and the line you don't cross

Two things are non-negotiable and mostly invisible when they work: **scam and fraud detection** (advance-fee scams, off-platform-payment bait, phishing links — caught in-thread, in real time) and **content moderation**. These are table stakes; a messenger that lets a buyer get scammed loses that buyer for good, which is the most expensive churn there is.

And the line you don't cross: **don't fully automate the human.** A messenger that auto-replies on the seller's behalf, or floods buyers with bot-perfect copy, destroys the one thing that makes a stranger hand over cash — the sense that there's a real person on the other side. Over-automation reads as a scam even when it isn't. The teams that win use AI to *remove friction* (faster replies, clearer offers, instant answers, safety) and leave the trust-building to the humans. The model drafts; the person decides; the platform stays out of the way.

That's the marketplace messenger: four jobs, a stack of models, and one genuinely hard measurement problem — judged, in the end, not by how much people chat, but by how many strangers it helps to safely transact.

*This is a companion to my piece on [what AI/ML CRM can actually do at scale](/read/ai-ml-crm-2026/) — same discipline, applied to the surface where the deal is closed instead of triggered.*
