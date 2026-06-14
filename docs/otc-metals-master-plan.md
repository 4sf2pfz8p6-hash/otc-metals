# OTC Metals — Master Plan

This is the main product reference document for OTC Metals.

Any AI agent, developer, product consultant, or designer working on the project should read this file first.

This file connects the product philosophy, launch standard, registration logic, trust model, user-routing model, and current open questions.

Related documents:

- `docs/platform-philosophy.md`
- `docs/product-vision.md`
- `docs/launch-standard.md`

## 1. Product identity

OTC Metals is a professional digital ecosystem and routing platform for the precious-metals market.

It is not:

- a simple classifieds board;
- a raw MVP;
- an exchange;
- a broker;
- an escrow service;
- a guarantor;
- a party to transactions;
- a storage service for money, metal, or documents.

OTC Metals helps market participants find each other, verify trust signals, understand available opportunities, negotiate, and then complete transactions outside the platform.

## 2. Core vision

The real precious-metals market already exists offline through calls, messengers, managers, personal contacts, and private networks.

OTC Metals should bring this market into one digital environment.

The platform should become a professional workspace where participants can:

- see buyers;
- see sellers;
- see orders;
- create orders;
- create auctions;
- compare price ranges;
- understand market demand;
- check counterparties;
- find legal and commercially relevant matches.

## 3. Ecosystem principle

OTC Metals should reflect the real movement of metal through the market.

Metal may enter from an individual, then move through pawnshops, buyers, jewelers, factories, refiners, wholesalers, banks, investors, or other participants.

The platform should understand this cycle and help each participant find the correct next counterparty.

## 4. Market participants

The platform should support:

- individuals;
- investors;
- sole proprietors;
- legal entities;
- pawnshops / lombards;
- buyers / purchasing points;
- jewelers;
- jewelry companies;
- jewelry factories;
- wholesale companies;
- refineries;
- banks;
- institutional participants;
- other legally relevant market actors.

## 5. Intelligent routing

The key product idea is routing.

The platform should not simply show everything to everyone.

When a participant registers, OTC Metals should determine:

- legal type;
- market role;
- official company status;
- relevant licenses or permissions;
- what the participant may buy;
- what the participant may sell;
- which counterparties are suitable;
- which scenarios should be available;
- which scenarios should be blocked.

The platform should then open only the correct route for that participant.

## 6. Access levels

### Level 1 — Guest

Guest can:

- open the platform;
- see the market/vitrine;
- see that buyers, sellers, orders, and auctions exist;
- understand that the market is active.

Guest cannot:

- open full buyer/seller functionality;
- publish orders;
- create auctions;
- reveal contacts;
- interact with counterparties.

When a guest clicks a restricted action, show:

> Для продолжения зарегистрируйтесь.

Internal access levels should not be displayed as large public blocks such as “Гость уровень 0 / 1 / 2”.

### Level 2 — Registered user

Initial registration should be light and fast.

The user provides:

- legal type: Физическое лицо / ИП / Юридическое лицо;
- market role: Ломбард / Скупщик / Ювелир / Ювелирная компания / Ювелирный завод / Оптовая компания / Аффинажное предприятие / Банк / Другое;
- email;
- phone;
- INN where applicable.

After INN entry, the platform should pull official public company data where legally and technically possible.

Registered user can:

- create a profile;
- see more buyer/seller context;
- prepare draft orders;
- prepare draft auctions;
- understand what full verification unlocks.

### Level 3 — Verified participant

Full verification is required before high-trust actions:

- publishing orders;
- publishing auctions;
- revealing contacts;
- participating in deal workflows;
- using advanced routing scenarios.

Verification should preferably happen through official or reliable mechanisms:

- official registries;
- Госуслуги / Госключ where appropriate;
- qualified electronic signature / MCHD where appropriate;
- bank verification where appropriate;
- other official authority-confirmation mechanisms.

Do not force passport selfies at the first entry point if a smoother official method exists.

## 7. Data and documents philosophy

OTC Metals should not become a document archive.

The platform should avoid storing sensitive documents unless absolutely required.

The product goal is to check and record results, not to accumulate documents.

Prefer storing:

- verification status;
- date of check;
- source of check;
- validity period;
- result of check;
- permitted actions;
- trust level.

Avoid publicly displaying unnecessary sensitive data.

The user should see simple trust outcomes, such as:

- Проверенный участник;
- Документы проверены;
- Полномочия подтверждены;
- Может покупать данный тип металла;
- Может продавать данный тип металла.

## 8. Trust model

Trust is a core product feature.

Trust does not mean OTC Metals guarantees the transaction.

Trust means the platform has checked available signals and determined what actions are appropriate for the participant.

The platform should prevent obviously fake, inappropriate, blocked, or high-risk participants from acting as trusted market players.

Trust inputs may include:

- email/phone verification;
- INN/OGRN checks;
- official registry status;
- licenses or permissions;
- authority of company representative;
- activity history;
- response speed;
- completed interactions;
- reviews or feedback;
- periodic re-checks.

## 9. Public trust card principle

Users do not need to see every document and legal detail.

The public-facing trust card should be simple and confidence-building.

Possible public fields:

- participant name or company name;
- verified status;
- trust level;
- role;
- region;
- response speed;
- platform activity;
- confirmed interactions if available;
- verification date or “recently checked” status.

Detailed documents, licenses, registry data, and sensitive information should remain under the hood unless legally necessary and appropriate to display.

## 10. Market transparency

A major market problem is price opacity.

Participants often know each other, but prices are negotiated through pressure, personal relationships, and fragmented information.

OTC Metals should make the market easier to compare:

- active buyers;
- active sellers;
- available volumes;
- price ranges;
- discount/premium relative to market benchmarks;
- region;
- participant type;
- trust level.

The platform does not force one price. It makes the market visible.

## 11. Product categories

OTC Metals should support more than scrap.

Important categories:

- jewelry scrap;
- jewelry items;
- gold;
- silver;
- platinum group metals where appropriate;
- investment bars;
- investment coins;
- wholesale volumes;
- refinery flows;
- bank/institutional flows;
- precious stones if legally and operationally appropriate.

Investment bars and coins are strategically important and should not be treated as a separate unrelated business.

## 12. Order and auction logic

The platform should support:

- buy orders;
- sell orders;
- auction scenarios;
- draft orders;
- interest responses;
- negotiation stages;
- contact reveal after mutual interest and required verification.

The order path should lead to a practical result:

- buyer enters and finds relevant sellers;
- seller enters and finds relevant buyers;
- professional participant can place orders or auctions;
- the system avoids irrelevant or illegal matches.

## 13. Role of OTC Metals in a transaction

OTC Metals does not complete the transaction.

The actual deal happens outside the platform between the parties.

OTC Metals may support:

- discovery;
- matching;
- trust verification;
- negotiation flow;
- contact reveal;
- post-interaction feedback.

OTC Metals does not guarantee:

- payment;
- delivery;
- metal quality;
- final closing;
- legal performance of the transaction.

## 14. Launch standard

OTC Metals should not be described or built as a raw MVP.

The target is a polished first public version / launch version / Version 1.

The product can be built in stages internally, but the public experience should feel complete, serious, and trustworthy.

Avoid public wording such as:

- demo platform;
- raw MVP;
- verification in development;
- test deals;
- closed test;
- unfinished marketplace.

## 15. Monetization principles

No monetization at the first stage unless it clearly improves the product and does not damage trust.

Subscription is currently considered weak because:

- individuals may use the platform rarely;
- large participants may do many transactions and a cheap subscription may be underpriced;
- different participant categories have very different value patterns.

Possible future monetization areas:

- fee for revealing a qualified contact;
- fee for publishing an order;
- fee for priority placement;
- paid trust verification or advanced status;
- success-fee-like information-service reward, if legally safe;
- advanced analytics for professionals;
- advertising/sponsorship only if it does not reduce trust.

Open question:

> How can OTC Metals earn from matching or contact access without becoming a broker, escrow, guarantor, or party to the deal?

## 16. Telegram principle

Telegram is not the core product.

The goal is to bring users into the platform, not move work outside it.

Telegram may later be used as a marketing channel for highlights or weekly offers, but not as the main workspace.

## 17. Gold Trade reference

Gold Trade is a useful reference, but OTC Metals should not copy it blindly.

Study Gold Trade for:

- market credibility;
- participant verification;
- quotations;
- auctions;
- investment bar flows;
- trust mechanics.

Potential OTC Metals advantages:

- role-based routing;
- progressive access;
- easier registration;
- broader ecosystem vision;
- trust-result UI instead of document overload;
- negotiation tracker;
- better mobile-first and user-friendly experience.

## 18. Current staging priorities

Staging should be aligned with the philosophy.

Important fixes:

- Russian-only visible UI;
- remove English labels;
- remove public “guest level” cards;
- guest sees market but cannot act;
- restricted guest actions show registration CTA;
- registration starts with legal type and market role;
- reduce unfinished/demo wording;
- present OTC Metals as a serious ecosystem and routing platform;
- add trust-result language rather than document-heavy UI;
- keep production untouched until approval.

## 19. How to use this document

When discussing a new feature, ask:

1. Does this help OTC Metals become the trusted routing ecosystem for the precious-metals market?
2. Does this reduce friction for legitimate participants?
3. Does this reduce wrong matches?
4. Does this improve trust without turning OTC Metals into broker, escrow, guarantor, or document archive?
5. Does this support the user journey from market visibility to practical contact/result?

If yes, develop the idea.

If no, question or reject it.
