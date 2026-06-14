# OTC Metals — Monetization Research

This document captures the current working discussion about monetization.

No final monetization model has been accepted yet.

## Current principle

OTC Metals is built as a business, but monetization must not contradict the platform philosophy.

The platform is not:

- broker;
- exchange;
- escrow;
- guarantor;
- payment holder;
- metal holder;
- transaction party.

Therefore monetization should not make OTC Metals look like it is charging a commission for the metal transaction itself.

## What is not preferred

### Subscription

Subscription is not preferred as the main model.

Why:

- individuals may use the platform rarely;
- small sellers may not want monthly payments;
- large professional participants may use the platform heavily, making a simple subscription too cheap;
- subscription does not map well to the actual moment of value.

### Success fee from the transaction

A pure success fee is problematic.

Why:

- the deal happens outside the platform;
- OTC Metals may not know if the transaction happened;
- OTC Metals may not know the final amount;
- it creates legal and positioning risks;
- the platform may be perceived as a broker or intermediary.

### Mandatory escrow

Mandatory escrow is not aligned with the current philosophy.

Why:

- the platform would start touching money or transaction performance;
- this changes the legal and operational role;
- it contradicts the principle of not being party to the deal.

## Main working hypothesis

The strongest current monetization hypothesis is:

> Payment for qualified access / contact reveal after mutual confirmation of interest.

Possible flow:

1. Order is published.
2. Eligible participants see market-level data.
3. A participant reviews the visible order conditions.
4. If the conditions fit, the participant confirms serious interest.
5. The order owner sees enough counterparty context to confirm interest.
6. If both sides confirm, the platform may charge for the service of qualified introduction / contact reveal.
7. Contacts are revealed.
8. The actual transaction continues outside OTC Metals.

The payment is not positioned as commission on the metal transaction.

It is positioned as payment for a qualified introduction, routing, and contact reveal service.

## Important unresolved questions

### 1. Who pays?

Possible options:

- only the side requesting contact;
- both sides;
- order owner;
- counterparty who accepts the order;
- different logic by role or order type.

No final decision yet.

### 2. When exactly does payment happen?

Possible points:

- before contact reveal;
- after both sides confirm interest;
- after entering a controlled chat stage;
- after a pre-confirmation step.

No final decision yet.

### 3. What if the deal does not happen?

Open issue:
If contacts are revealed and the deal fails, should OTC Metals refund anyone?

Risk:
If OTC Metals decides who is guilty, it becomes an arbiter of commercial disputes.

Current leaning:
Avoid making OTC Metals a judge of failed transactions.

### 4. How to stop market intelligence gathering?

Participants may pay just to learn who is selling, who is buying, what price is available, or what volume is in the market.

This is a real risk in precious-metals trading.

Possible protections:

- tiered data access;
- limit contact reveals;
- behavioral signals;
- trust score;
- queue mechanics;
- serious-interest confirmation;
- verification before contact reveal;
- higher friction only for sensitive/high-value flows.

No final decision yet.

## Tiered data access hypothesis

Information may be revealed in levels:

### Level 1 — Market visibility

The participant sees general market activity:

- buyers;
- sellers;
- order types;
- rough price/volume context;
- region if appropriate;
- active demand/supply.

No sensitive counterparty data.

### Level 2 — Order conditions

The participant sees enough to decide whether the opportunity is relevant:

- metal category;
- sample/purity where appropriate;
- volume;
- price or price range;
- region/logistics context;
- key deal terms.

Still no direct identity/contact.

### Level 3 — Counterparty context

The participant sees trust-level information:

- verified role;
- trust status;
- region;
- behavior indicators;
- platform activity;
- enough to decide if the counterparty is serious.

No full contact yet.

### Level 4 — Contact reveal

After mutual confirmation and required conditions, contacts may be revealed.

This is the strongest current monetization point.

## Behavioral reputation hypothesis

OTC Metals may use a behavior score, but it must be designed carefully.

Potential signals:

- confirmed serious interest;
- contact reveal count;
- continued communication after reveal;
- completed interaction feedback;
- repeated reveals without progress;
- abandoned processes;
- response speed;
- platform activity.

The score should help participants assess reliability.

It should not automatically block new users from opportunities.

## Fairness principle for new participants

OTC Metals should not become a closed club where only older/high-rated users receive all opportunities.

New verified participants must still have a fair path into the market.

Open question:
How to show trust and behavior history without making new users invisible.

Possible approaches:

- neutral start status for new verified participants;
- separate labels: “Новый проверенный участник” instead of low rating;
- rotation in candidate visibility;
- limited fair-access slots;
- role-based eligibility before rating-based ordering;
- owner sees trust context but platform avoids over-prioritizing only old players.

## Deposits

Deposits may be useful only in specific cases, not as a default for everyone.

Rejected as default:

- large mandatory deposit for all orders;
- 10% auction deposit as a universal requirement;
- deposit that blocks small participants or individuals.

Potential research direction:

- high-value B2B orders;
- auction participation;
- serious-intent lock for very sensitive opportunities;
- refundable deposit for specific scenarios.

## Current conclusion

Monetization is not solved yet.

Current best hypothesis:

- free market entry;
- free basic browsing;
- free or low-friction order creation early in the market-building phase;
- monetization around qualified contact reveal after mutual interest;
- protect against market intelligence gathering through tiered data, verification, behavior signals, and limits rather than heavy penalties.

This document should be updated after further research and user testing.
