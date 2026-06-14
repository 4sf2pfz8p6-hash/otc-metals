# OTC Metals — Session Summary 2026-06-14

This file summarizes the key product discussion from the 2026-06-14 working session.

It is meant to prevent loss of context and to help the owner, ChatGPT, Codex, Cursor, Claude, Perplexity, or any future contributor restart work without repeating the same discussions.

## 1. Main outcome of the session

The main product understanding became clearer:

OTC Metals is not a website that explains its own internal mechanics to users.

OTC Metals must become a premium market-facing platform where users immediately see:

- buyers;
- sellers;
- orders;
- auctions;
- prices;
- volumes;
- regions;
- trust signals;
- ability to buy, sell, or place an order.

The internal logic of role routing, verification, trust checks, access levels, and legal filtering is essential, but it must work under the hood.

The homepage should show market value, not platform architecture.

## 2. Philosophy confirmed

OTC Metals is a professional ecosystem and intelligent routing platform for the precious-metals market.

It is not:

- a raw MVP;
- a simple classifieds board;
- an exchange;
- a broker;
- escrow;
- a guarantor;
- a party to transactions;
- a storage service for money, metal, or unnecessary documents.

The project is built as a business, but monetization must not contradict this role.

## 3. Trusted market principle

OTC Metals should not be an anonymous open board.

Only real and relevant participants should receive meaningful access to the market.

The platform should verify:

- identity;
- company or individual status;
- authority to represent a company;
- licenses and permissions;
- market role;
- permitted actions.

The better the verification at entry, the less the platform needs harsh penalties later.

## 4. Registration direction

The agreed registration direction:

1. Guest enters the platform and sees the market/vitrine.
2. Guest cannot perform meaningful actions.
3. Registration starts with:
   - legal type: Физическое лицо / ИП / Юридическое лицо;
   - market role: Ломбард / Скупщик / Ювелир / Ювелирная компания / Ювелирный завод / Оптовая компания / Аффинажное предприятие / Банк / Другое;
   - email;
   - phone;
   - INN where applicable.
4. After INN entry, the platform should pull official public data where legally and technically possible.
5. Deeper verification is required before higher-trust actions such as publishing, revealing contacts, joining sensitive flows, or confirming serious intent.

Important clarification:
The platform should be built as a complete serious product, not as something that keeps trust “for later”. But first entry should not be overloaded with unnecessary documents.

## 5. Documents and data storage

OTC Metals should not become a document archive.

The product should avoid storing passports, licenses, contracts, powers of attorney, and transaction documents unless legally and operationally required.

Prefer storing:

- verification status;
- source of check;
- date of check;
- validity period;
- result of check;
- permitted actions;
- trust level.

The user should not see document overload.

## 6. Trust-result UI

The user does not need a long legal file.

The interface should show simple results:

- Проверенный участник;
- Документы проверены;
- Полномочия подтверждены;
- Может покупать этот тип металла;
- Может продавать этот тип металла;
- Доступные сценарии определяются по статусу участника.

Detailed legal and registry data should remain under the hood unless required.

## 7. Information disclosure model

The current working hypothesis is tiered access to information:

### Level 1 — Market visible

General activity, buyers, sellers, demand/supply, rough price/volume context, region if appropriate.

### Level 2 — Conditions visible

Enough order details to decide whether the opportunity is relevant: metal category, purity/sample, volume, price or range, region/logistics, key terms.

### Level 3 — Counterparty context visible

Trust-level and role information enough to decide whether the counterparty is serious.

### Level 4 — Contacts revealed

Full contacts open only after mutual confirmation and required conditions.

Goal:
Balance transparency with protection from market intelligence gathering.

## 8. Monetization discussion status

Monetization is not solved yet.

Rejected or not preferred as the main model:

- classic subscription as core model;
- pure success fee from transaction;
- mandatory escrow;
- large mandatory deposits for all users or all orders.

Strongest current working hypothesis:

Payment for qualified access / contact reveal after mutual confirmation of interest.

Possible flow:

Order visible → conditions reviewed → both sides confirm interest → platform fee/contact reveal fee → contacts revealed → transaction continues outside OTC Metals.

The fee must be positioned as payment for qualified introduction, routing, and contact reveal service — not as commission on the metal transaction.

Open questions:

- who pays: one side or both sides;
- when exactly payment happens;
- what happens if the transaction does not happen after contact reveal;
- how to avoid becoming an arbiter of commercial disputes;
- how to prevent market intelligence gathering without blocking real participants.

## 9. Market intelligence risk

A major risk:
Participants may use the platform to explore prices, collect contacts, monitor competitors, and gather market intelligence without real intent to trade.

This is especially relevant in precious-metals trading because participants may be willing to pay just to learn who sells, who buys, what price is available, and what volume is present.

Current research directions:

- tiered access to information;
- behavioral reputation;
- contact limits;
- soft limits for repeated contact reveals without progress;
- deposits only for specific high-value flows, not as default;
- trust score;
- activity-based signals;
- queue mechanics;
- serious-interest confirmation.

No final decision yet.

## 10. Rating and fairness

A rating or trust score may help evaluate behavior, but it should not automatically lock new participants out of the market.

Problem:
If the owner of an order always selects only the highest-rated participant, new verified participants may never get a chance.

Working principle:
Rating should inform trust, but should not create a closed club where only old players receive all opportunities.

Open question:
How to balance fairness for new participants with protection against unserious behavior and market intelligence gathering.

## 11. Staging review conclusion

The latest staging version moved closer to the internal product philosophy, but it exposed too much internal system logic to users.

What felt wrong:

- hero phrase “Интеллектуальный маршрутизатор рынка драгоценных металлов” feels too technical;
- large blocks “Что делает платформа” and “Чего не делает платформа” dominate the page;
- “Маршрут участника” is internal logic and should not be a large public block;
- “Профиль определён”, “Доверие подтверждено”, “Маршрут рассчитан” are internal mechanics;
- current staging feels like documentation, not an active market;
- “Примеры маршрутов металла” should likely become market/order examples.

Main UX principle:
The homepage should answer:

> What can I do here right now?

Not:

> How does the internal platform architecture work?

## 12. Direction for next staging iteration

Use production as the visual/product baseline and bring in only the useful philosophy elements:

- market-first homepage;
- buyer/seller/place order actions;
- clean premium Russian UI;
- trust-result language;
- registration by legal type and role;
- routing under the hood;
- no visible unfinished/demo language;
- no large public access-level explanations;
- show practical order/market examples instead of internal route explanations.

## 13. Next recommended working step

Before asking Codex/Cursor to rebuild again:

1. Compare production and staging.
2. Define the ideal homepage structure.
3. Keep production untouched.
4. Use staging for the next iteration.
5. Make the homepage market-first, not system-explanation-first.

## 14. Restart instruction for next session

At the start of the next session, the owner can say:

> Начинаем работу. Открой философию проекта и session-summary-2026-06-14.

The assistant/agent should then read:

1. `docs/product-philosophy/README.md`
2. `docs/product-philosophy/decisions-log.md`
3. `docs/product-philosophy/monetization-research.md`
4. `docs/product-philosophy/staging-feedback-2026-06-14.md`
5. `docs/product-philosophy/session-summary-2026-06-14.md`

Then continue from the latest product state without asking the owner to repeat the whole concept.
