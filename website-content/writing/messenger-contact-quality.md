---
title: "Count chats, or count what they become"
date: 2026-10-19
summary: "On any platform where strangers transact, the contact is the easiest number to grow and the easiest to misread. A short, technical piece on the quantity-vs-quality dial in the messenger: how to classify contacts into trash, preliminary and target, what to score them with (heuristics, a binary model, an LLM, or the cascade), and nine messenger levers that move the number that matters."
publication: Self
tags: [ai, ml, marketplace, messaging, metrics, trust-and-safety]
featured: false
---

Every contact-heavy platform runs on the same unit: a chat or a call between two strangers. Classifieds, rentals, home services, jobs, dating. The marketplace, in the broad sense of the word, is the whole family of platforms where those strangers transact, and the messenger is where most of those contacts start and end.

The contact is the easiest number to grow and the easiest to misread. Double the chats and the deals can stay flat. Nobody will ever read those chats; they can only be modelled. So the messenger is where ML measures the contact, and where it fixes it.

## Two forces, one dial

Growth wants more contacts: more supply, more traffic, a lower-friction "write" button. Quality wants contacts that turn into deals: live listings, responsive counterparts, real intent. The two pull against each other, and most teams run them as two goals owned by two people.

The flywheel is the reason to treat them as one. A platform's flywheel spins when buyers and sellers keep buying and selling successfully without paid acquisition pushing them; progress is the number of significant categories where that is already true. Every turn goes through a contact. Quantity spins the wheel; quality is what makes the turn count.

<figure class="fig">
<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A two-by-two of volume against quality and safety: ramp-up, quality niche, volume without experience, and the target state in the top right">
  <line x1="70" y1="270" x2="650" y2="270" style="stroke:var(--line);stroke-width:1.4"/>
  <line x1="70" y1="270" x2="70" y2="20" style="stroke:var(--line);stroke-width:1.4"/>
  <text x="360" y="300" text-anchor="middle" style="font-family:var(--mono);font-size:12px;fill:var(--muted)">VOLUME — thin → thick</text>
  <text x="22" y="145" text-anchor="middle" transform="rotate(-90 22 145)" style="font-family:var(--mono);font-size:12px;fill:var(--muted)">QUALITY &amp; SAFETY — congested → clear</text>
  <rect x="84" y="150" width="270" height="108" rx="9" style="fill:var(--soft);stroke:var(--line)"/>
  <text x="100" y="176" style="font-family:var(--mono);font-size:13px;fill:var(--ink)">1 · RAMP-UP</text>
  <text x="100" y="198" style="font-size:12px;fill:var(--muted)">nothing to browse,</text>
  <text x="100" y="216" style="font-size:12px;fill:var(--muted)">nothing protected</text>
  <rect x="84" y="30" width="270" height="108" rx="9" style="fill:var(--soft);stroke:var(--line)"/>
  <text x="100" y="56" style="font-family:var(--mono);font-size:13px;fill:var(--ink)">2 · QUALITY NICHE</text>
  <text x="100" y="78" style="font-size:12px;fill:var(--muted)">safe but empty; buyers leave</text>
  <text x="100" y="96" style="font-size:12px;fill:var(--muted)">before the flywheel starts</text>
  <rect x="366" y="150" width="270" height="108" rx="9" style="fill:var(--soft);stroke:var(--line)"/>
  <text x="382" y="176" style="font-family:var(--mono);font-size:13px;fill:var(--ink)">3 · VOLUME, NO EXPERIENCE</text>
  <text x="382" y="198" style="font-size:12px;fill:var(--muted)">lots of chats, few deals;</text>
  <text x="382" y="216" style="font-size:12px;fill:var(--muted)">trash grows with scale</text>
  <rect x="366" y="30" width="270" height="108" rx="9" style="fill:var(--accent);fill-opacity:.1;stroke:var(--accent);stroke-width:2"/>
  <text x="382" y="56" style="font-family:var(--mono);font-size:13px;fill:var(--accent)">4 · THE TARGET</text>
  <text x="382" y="78" style="font-size:12px;fill:var(--muted)">real contact, in-app, safe:</text>
  <text x="382" y="96" style="font-size:12px;fill:var(--muted)">thick, uncongested and safe</text>
</svg>
<figcaption>Volume and quality are two axes, not two goals. Thickness is the volume axis; congestion and safety are the quality axis. The flywheel only spins in the top right.</figcaption>
</figure>

The theory already exists. Alvin Roth's market design says a matching market, one where both sides have to choose each other, works only when it is **thick** (enough participants), **uncongested** (people can get through their options in time) and **safe** (no reason to lie, game the timing or take the deal elsewhere). Congestion is what you get when you go thick too fast. A messenger flooded with "Is it still available?" is a congested market, not a busy one.

ML enters here because the two axes are not equally visible. Volume is free to observe: chats, calls, listings. Quality is not, because the deal usually closes off-platform. ML's first job is to make quality observable. Its second is to move it.

## Three buckets, not one number

A contact becomes one of three things:

- **Trash.** Nobody on the other side, a dead listing, spam, a scammer.
- **Preliminary.** A real person and a real question, no commitment yet.
- **Target.** The parties agree on something concrete: a price, a time, a place.

Three and not two because trash is a supply-and-safety problem and preliminary is a conversation problem. Different owners, different models. Report all three together: a falling trash share with a flat target share is not progress.

<figure class="fig">
<svg viewBox="0 0 680 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="All contacts split into three segments: trash, preliminary and target, each with its owner">
  <text x="20" y="30" style="font-family:var(--mono);font-size:12px;letter-spacing:.08em;fill:var(--muted)">ALL CONTACTS</text>
  <rect x="20" y="44" width="236" height="40" rx="7" style="fill:var(--soft);stroke:var(--line)"/>
  <text x="138" y="69" text-anchor="middle" style="font-family:var(--mono);font-size:13px;fill:var(--ink)">TRASH</text>
  <rect x="260" y="44" width="236" height="40" rx="7" style="fill:var(--soft);stroke:var(--line)"/>
  <text x="378" y="69" text-anchor="middle" style="font-family:var(--mono);font-size:13px;fill:var(--ink)">PRELIMINARY</text>
  <rect x="500" y="44" width="160" height="40" rx="7" style="fill:var(--accent);fill-opacity:.1;stroke:var(--accent);stroke-width:2"/>
  <text x="580" y="69" text-anchor="middle" style="font-family:var(--mono);font-size:13px;fill:var(--accent)">TARGET</text>
  <text x="138" y="108" text-anchor="middle" style="font-size:12px;fill:var(--muted)">supply &amp; safety problem</text>
  <text x="378" y="108" text-anchor="middle" style="font-size:12px;fill:var(--muted)">conversation problem</text>
  <text x="580" y="108" text-anchor="middle" style="font-size:12px;fill:var(--muted)">the north star</text>
  <text x="138" y="128" text-anchor="middle" style="font-size:12px;fill:var(--faint)">cut it</text>
  <text x="378" y="128" text-anchor="middle" style="font-size:12px;fill:var(--faint)">convert it</text>
  <text x="580" y="128" text-anchor="middle" style="font-size:12px;fill:var(--faint)">A/B-test against it</text>
</svg>
<figcaption>Widths are illustrative. The point is the owners: trash belongs to supply and safety, preliminary to the conversation, and target is the number everything is tested against.</figcaption>
</figure>

The label is the product. The hard part is not the model, it is turning a fuzzy human idea ("did they agree?") into something learnable: one labelling instruction shared by data science, analysts and the business; a seed set labelled together to find the grey zones; assessors at volume; validators on the disagreements. Then validate against the deals you can see: a "sold here" on takedown, a review after a service, a both-sides confirmation in the chat, an in-app payment. That is the ground truth the off-platform majority is calibrated against.

## What to score a chat with

Start cheap and add cost only where the cheap layer is unsure.

<figure class="fig">
<svg viewBox="0 0 680 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A three-step cascade: heuristics remove the obvious trash from all chats, a binary model scores the rest, and an LLM reads only the unsure middle">
  <text x="20" y="28" style="font-family:var(--mono);font-size:12px;letter-spacing:.08em;fill:var(--muted)">1 · HEURISTICS</text>
  <rect x="20" y="38" width="640" height="34" rx="7" style="fill:var(--soft);stroke:var(--line)"/>
  <text x="34" y="60" style="font-size:12px;fill:var(--ink)">all chats → rules on metadata catch the obvious trash</text>
  <text x="650" y="60" text-anchor="end" style="font-family:var(--mono);font-size:12px;fill:var(--muted)">~0 per chat</text>
  <text x="20" y="100" style="font-family:var(--mono);font-size:12px;letter-spacing:.08em;fill:var(--muted)">2 · BINARY MODEL</text>
  <rect x="20" y="110" width="450" height="34" rx="7" style="fill:var(--soft);stroke:var(--line)"/>
  <text x="34" y="132" style="font-size:12px;fill:var(--ink)">the rest → "did this chat lead anywhere, yes or no?"</text>
  <text x="460" y="132" text-anchor="end" style="font-family:var(--mono);font-size:12px;fill:var(--muted)">~0</text>
  <text x="20" y="172" style="font-family:var(--mono);font-size:12px;letter-spacing:.08em;fill:var(--muted)">3 · LLM</text>
  <rect x="20" y="182" width="190" height="34" rx="7" style="fill:var(--accent);fill-opacity:.1;stroke:var(--accent);stroke-width:2"/>
  <text x="34" y="204" style="font-size:12px;fill:var(--accent)">the unsure middle → why</text>
  <text x="222" y="204" style="font-family:var(--mono);font-size:12px;fill:var(--muted)">high per chat, small share of chats</text>
</svg>
<figcaption>The cascade. Each step is more expensive and sees fewer chats.</figcaption>
</figure>

**Heuristics first.** Deterministic rules on metadata, not text: no reply within a window, a call under a few seconds, a first message identical across fifty chats, a listing already closed. Cheap, auditable, and they cover a large share of trash. They also become the first features of the next step.

**Then one binary model.** One question: did this chat lead anywhere, yes or no. Features: messages per side, reply latency, who spoke last, whether a structured offer was made, the buyer's prior activity on the listing, the seller's reply history, text through embeddings. Two classes keep the labels clean; typed labels explode into overlapping categories nobody applies consistently. Set the threshold on precision for the target class, because a false "target" inflates the north star.

**Then an LLM, sparingly.** It reads the chat for *why* it ended: sold, price, terms, no next step, pulled off-platform. Run it on the unsure middle of the score distribution and on a sample for diagnostics. Cost per inference is the constraint, not accuracy.

The trade-off, in one table:

| | Heuristics | Binary model | LLM | LLM as labeller → small model |
|---|---|---|---|---|
| Cost per chat | ~0 | ~0 | high | high once, ~0 after |
| Labels needed | none | thousands, clean | none to start | a few hundred gold labels |
| Sees calls (no text) | yes | yes | no | partly |
| Explains itself | fully | partly | in words, not reliably | no |
| Best at | obvious trash | the yes/no at volume | the *why*, new patterns, cold start | bootstrapping labels fast |

The binary model wins production because half the signal is not in the text: reply latency, who spoke last, offer made, listing history. An LLM only sees the words, and sees nothing on a call. The LLM wins where there are no labels yet (a new market, a new category, a new scam) and where you need the reason, not the score. The combination is the real answer: the LLM labels a sample, a few hundred human gold labels check it, the cheap model trains on those labels, and the LLM stays on for the unsure middle and a monthly diagnostic read.

Two disciplines around the model. Recalibrate on a schedule, because behaviour drifts and the thresholds drift with it; a monthly manual labelling pass on a random sample is the regression test the behavioural metrics cannot be. And log the reply before you trust the metric: if calls are not logged or a channel drops replies, a whole segment scores as trash, and the model learns it.

## Nine ways to move the needle

Each lever does one of two things: cuts trash, or turns preliminary into target.

<figure class="fig">
<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Nine messenger levers grouped by what they do: four cut trash, five turn preliminary contacts into target contacts">
  <text x="20" y="28" style="font-family:var(--mono);font-size:12px;letter-spacing:.08em;fill:var(--muted)">CUTS TRASH</text>
  <text x="360" y="28" style="font-family:var(--mono);font-size:12px;letter-spacing:.08em;fill:var(--accent)">PRELIMINARY → TARGET</text>
  <rect x="20" y="40" width="310" height="40" rx="7" style="fill:var(--soft);stroke:var(--line)"/>
  <text x="34" y="65" style="font-size:12.5px;fill:var(--ink)">1 · Answer the opener without the seller</text>
  <rect x="20" y="90" width="310" height="40" rx="7" style="fill:var(--soft);stroke:var(--line)"/>
  <text x="34" y="115" style="font-size:12.5px;fill:var(--ink)">2 · Rank the inbox by deal probability</text>
  <rect x="20" y="140" width="310" height="40" rx="7" style="fill:var(--soft);stroke:var(--line)"/>
  <text x="34" y="165" style="font-size:12.5px;fill:var(--ink)">7 · Throttle low-odds senders</text>
  <rect x="20" y="190" width="310" height="40" rx="7" style="fill:var(--soft);stroke:var(--line)"/>
  <text x="34" y="215" style="font-size:12.5px;fill:var(--ink)">8 · Make staying safe the easy path</text>
  <rect x="360" y="40" width="300" height="40" rx="7" style="fill:var(--accent);fill-opacity:.1;stroke:var(--accent);stroke-width:1.6"/>
  <text x="374" y="65" style="font-size:12.5px;fill:var(--ink)">3 · First message that carries intent</text>
  <rect x="360" y="90" width="300" height="40" rx="7" style="fill:var(--accent);fill-opacity:.1;stroke:var(--accent);stroke-width:1.6"/>
  <text x="374" y="115" style="font-size:12.5px;fill:var(--ink)">4 · A next step inside the chat</text>
  <rect x="360" y="140" width="300" height="40" rx="7" style="fill:var(--accent);fill-opacity:.1;stroke:var(--accent);stroke-width:1.6"/>
  <text x="374" y="165" style="font-size:12.5px;fill:var(--ink)">5 · Faster replies</text>
  <rect x="360" y="190" width="300" height="40" rx="7" style="fill:var(--accent);fill-opacity:.1;stroke:var(--accent);stroke-width:1.6"/>
  <text x="374" y="215" style="font-size:12.5px;fill:var(--ink)">6 · Instant answers from the listing</text>
  <rect x="20" y="246" width="640" height="40" rx="7" style="fill:none;stroke:var(--line);stroke-dasharray:5 4"/>
  <text x="340" y="271" text-anchor="middle" style="font-size:12.5px;fill:var(--muted)">9 · Fix the incentives: report on target contacts, test everything against them</text>
</svg>
<figcaption>Nine levers, two jobs. The ninth is the one that keeps the other eight honest.</figcaption>
</figure>

1. **Answer the opener without the seller.** "Is it still available?" is the dominant first message everywhere, and the item usually is. An intent classifier routes it to the listing status and answers instantly; "last price?", "can you post it?", "where can I see it?" route to a price surface, a shipping quote, a scheduler. The one-tap "Is this still available?" button is the industry's most familiar trash generator; answering it from the listing is the fix.
2. **Rank the inbox by deal probability.** A busy seller does not have too many messages; they have three chats that will buy and twelve that will not. The binary model scored per live thread, with the same intent signal recommendations already use, becomes the inbox order. The same score gates who gets a nudge, who gets a generated reply versus a template, and which silences are worth breaking. One platform once reminded every seller who had read but not replied, unranked: reply rate moved a little, deals not at all, and the lift decayed within weeks.
3. **A first message that carries intent.** Replace the blank box and the availability template with openers tuned to the listing: "Can I pick it up today?", "Would you take X?". In a controlled test, tappable openers lifted chat starts by a few percent and held as a plateau, not a novelty spike. Template ranking by listing context, no generation needed. Hinge does the same thing by making the opener point at a specific photo or prompt instead of a blank like.
4. **A next step inside the chat.** After the price question, show "Make an offer", "Book a viewing", "Buy with delivery" as chat actions. A structured offer can be ranked, lowballs suppressed, a counter suggested, and it is a labelled event for the model; the same haggle in free text is invisible. Upstream, a recommended price from comparable active and sold listings, shown to the buyer as a trust label, pre-empts the haggle. Airbnb hosts can pre-approve an inquiry or send a special offer from the thread.
5. **Faster replies.** The median seller reply lands over an hour after the buyer writes, and most buyers end the session at their first message. The maturity ladder: saved templates (no ML, most of the value), then ranking which template to show by intent, then generation from the listing, used only where it beats a template in an A/B. The metric that survives scrutiny is the share of suggestions sent without an edit. And a follow-up sent on the seller's behalf when the buyer has gone quiet on a chat the model reads as "could agree": visible to the seller, switchable off, hand-written rotating variants.
6. **Instant answers from the listing.** A large share of unanswered chats were read by the seller and left hanging, and most are substantive: item, price, delivery, "I'll take it". The listing already holds the answer. Retrieval over the listing and the thread, never free-form generation, because a confident wrong answer about a real item costs the deal and the trust. It absorbs on the order of one in eight buyer questions with no seller in the loop. The boundary: the model proposes, the person sends, or has opted in once, visibly.
7. **Throttle low-odds senders.** Rate-limit cold first messages from new accounts, catch copy-paste blasts with near-duplicate detection, and release the limits as the account earns trust. The guardrail: throttling must be invisible to a genuine buyer, so measure the target-contact rate for new accounts before and after.
8. **Make staying safe the easy path.** The scam playbook barely varies: pull the buyer off the chat to another messenger, a "payment" link, a "courier" app, where the next action is irreversible. Roughly one in twelve unanswered chats is that move; about a fifth are outright junk. Signals with strengths (shared contact, external link, payment-link pattern, urgency, account age) combine into a confidence score, and the reaction is graded by confidence: allow, soft warning in the chat, hold for review, block. Soft warning on a shared phone number; hard block only for high-confidence fraud. One tell: a genuine payment link arrives as a system message, never typed by the other side. And ship the features people leave for, so staying is easier than leaving. Airbnb hides numbers, emails and outside links until a booking is confirmed.
9. **Fix the incentives.** Report teams and paid seller products on target contacts, not raw chats. A/B-test every lever above against the agreement signal, so a feature cannot win on taps while losing on deals.

Count chats and you measure taps. Classify them and you measure the business.

*This piece is the quantity-vs-quality view of one surface. For the feature-by-feature account of the same messenger, see [the AI/ML that helps strangers transact](/writing/messenger-ai-ml/); for the full stack, [what AI/ML is actually capable of in CRM in 2026](/writing/ai-ml-crm-2026/).*
