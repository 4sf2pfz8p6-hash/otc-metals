# OTC Metals — Decisions Log

This file records accepted or working product decisions so the project does not rely on chat memory.

Statuses:

- Accepted — agreed product direction.
- Working hypothesis — useful direction, still under research.
- Open question — not solved yet.
- Rejected for now — not aligned with current direction.

## 2026-06-14 — Product memory process

Status: Accepted

Decision:
All important product decisions must be fixed in GitHub, inside `docs/product-philosophy/` or related product documents.

Working command from the owner:

> Фиксируем.

or

> Добавь в философию.

Meaning:
The discussion point becomes project memory and should be written to the appropriate document, not left only in chat.

## 2026-06-14 — Single starting point for every session

Status: Accepted

Decision:
Every new working session should start from:

`docs/product-philosophy/README.md`

The owner can say:

> Начинаем работу. Открой философию проекта.

Then the assistant/agent should read the entry point and continue from the current project context.

## 2026-06-14 — OTC Metals is not a raw MVP

Status: Accepted

Decision:
OTC Metals should not be positioned as a raw MVP. The target is a polished first public version / launch version / Version 1.

Reason:
The product must look serious, complete, premium, and trustworthy from the first public launch.

## 2026-06-14 — Core identity

Status: Accepted

Decision:
OTC Metals is a professional ecosystem and intelligent routing platform for the precious-metals market.

It is not a simple classifieds board, not an exchange, not a broker, not escrow, not a guarantor, and not a party to transactions.

## 2026-06-14 — Production safety

Status: Accepted

Decision:
All product experiments and current changes must go through `staging` first.

Do not touch `main` or production without explicit owner approval.

## 2026-06-14 — Registration principle

Status: Accepted

Decision:
Registration starts with:

1. legal type: Физическое лицо / ИП / Юридическое лицо;
2. market role: Ломбард / Скупщик / Ювелир / Ювелирная компания / Ювелирный завод / Оптовая компания / Аффинажное предприятие / Банк / Другое;
3. email;
4. phone;
5. INN where applicable.

After INN entry, the platform should pull official public data where legally and technically possible.

## 2026-06-14 — Full verification timing

Status: Accepted

Decision:
Do not overload the first entry with heavy documents.

However, the product should be designed as a complete serious platform, not as something that postpones trust forever.

Deeper verification should be requested when the user attempts higher-trust actions such as publishing, revealing contacts, joining sensitive flows, or confirming serious intent.

## 2026-06-14 — Trusted market principle

Status: Accepted

Decision:
OTC Metals is not an anonymous open board.

The platform should aim to admit only real and relevant market participants.

A participant should be checked through identity, company data, authority, licenses, permissions, and role before receiving meaningful market access.

The better the entry verification, the less the platform needs harsh penalties later.

## 2026-06-14 — Do not store documents unnecessarily

Status: Accepted

Decision:
OTC Metals should not become a document archive.

The platform should avoid storing passports, licenses, contracts, powers of attorney, and transaction documents unless legally and operationally required.

Prefer storing:

- verification status;
- check source;
- date of check;
- validity period;
- result of check;
- permitted actions;
- trust level.

## 2026-06-14 — Trust-result UI

Status: Accepted

Decision:
Users should not see document overload.

The interface should show simple trust outcomes:

- Проверенный участник;
- Документы проверены;
- Полномочия подтверждены;
- Может покупать этот тип металла;
- Может продавать этот тип металла;
- Доступные сценарии определяются по статусу участника.

Detailed legal data should remain under the hood unless required.

## 2026-06-14 — Tiered information access

Status: Working hypothesis

Decision:
Information should be disclosed in stages:

1. Market visible — general vitrine, demand/supply, activity.
2. Conditions visible — price, volume, region, key order terms.
3. Counterparty context visible — enough trust/profile information to decide whether to proceed.
4. Contacts revealed — only after mutual confirmation and required conditions.

Goal:
Balance transparency with protection from market intelligence gathering.

## 2026-06-14 — Monetization: subscription not preferred

Status: Working hypothesis

Decision:
Subscription is not a preferred core monetization model.

Reasons:

- individuals may use the platform rarely;
- large companies may do many transactions, making simple subscription underpriced;
- subscription is not directly tied to the moment of value.

## 2026-06-14 — Monetization near mutual confirmation

Status: Working hypothesis

Decision:
Monetization should likely happen close to the moment of mutual confirmation and contact reveal, not at registration or casual browsing.

Possible model:

Order visible → conditions reviewed → both sides confirm interest → platform fee/contact reveal fee → contacts revealed → transaction continues outside the platform.

Final model not accepted yet.

## 2026-06-14 — OTC Metals should not arbitrate commercial disputes by default

Status: Working hypothesis

Decision:
The platform should be careful about deciding who is guilty when a transaction does not happen after contact reveal.

Reason:
If OTC Metals starts determining fault and charging one side as punishment, it may become an arbiter of disputes and increase legal/operational risk.

Open question:
How to prevent unserious behavior without turning the platform into a dispute-resolution body.

## 2026-06-14 — Market intelligence risk

Status: Open question

Problem:
Participants may use the platform to explore prices, collect contacts, monitor competitors, and gather market intelligence without real intent to trade.

Current research directions:

- tiered access to information;
- behavioral reputation;
- contact limits;
- soft limits for repeated contact reveals without progress;
- deposits only for specific high-value flows, not as a default for everyone;
- trust score;
- activity-based signals;
- queue mechanics.

No final decision yet.

## 2026-06-14 — Rating should not exclude new participants

Status: Working hypothesis

Decision:
A rating or trust score may help evaluate behavior, but it should not automatically lock new participants out of the market.

Reason:
If only old/high-rated participants receive all opportunities, new legitimate users will not be able to enter the ecosystem.

Open question:
How to balance fairness to new participants with protection against unserious behavior.

## 2026-06-14 — Escrow not core

Status: Rejected for now

Decision:
Mandatory escrow is not aligned with the current OTC Metals philosophy.

Reason:
OTC Metals should not store money, store metal, guarantee payment, or become a transaction party.

Optional escrow-like partner integrations may be studied later, but they are not the core platform model.
