# OTC Metals Product Vision

This document is the working product context for OTC Metals. It captures agreed product logic so future tasks for Codex, Perplexity, Claude, Cursor, or other assistants do not restart from zero.

## Core concept

OTC Metals is not just a classifieds board and not a classic exchange.

OTC Metals is an intelligent access and routing platform for precious-metals market participants.

The platform should first understand who the participant is, verify the participant, then open only the scenarios that are appropriate for that participant.

OTC Metals does not act as:

- an exchange;
- a broker;
- an escrow service;
- a guarantor of the deal;
- a party to settlements;
- a holder of money or metal.

The platform helps buyers and sellers find each other, verify trust signals, negotiate, and then complete the actual transaction outside the platform.

## Main user-routing idea

A user enters the platform. The system determines:

- whether the user is an individual, sole proprietor, or legal entity;
- whether the user is a lombard/pawnshop, buyer, jeweler, jewelry company, jewelry factory, wholesale company, refinery, bank, or another market participant;
- what documents and permissions the participant has;
- what activity the participant is allowed to perform;
- what metals or product categories the participant may work with;
- which counterparties and actions should be available to this participant.

After that, the platform creates the participant's allowed path inside the system.

Different participants should see different capabilities.

## Access levels

### Level 1: Guest

A guest can:

- open the site;
- see the marketplace/vitrine;
- see that there are buyers, sellers, orders, and auctions;
- understand that the market is active.

A guest cannot:

- open full buyer/seller sections;
- publish orders;
- create auctions;
- reveal contacts;
- interact with counterparties.

If the guest clicks an action button, the platform should show a clear CTA:

> Для продолжения зарегистрируйтесь.

### Level 2: Registered user

Initial registration should be lightweight.

The user provides:

- email;
- phone;
- INN where applicable;
- initial legal type: individual, sole proprietor, or legal entity;
- market role: lombard/pawnshop, buyer, jeweler, jewelry company, jewelry factory, wholesale company, refinery, bank, other.

After INN entry, the platform should automatically pull available official data from legal sources where possible.

A registered user can:

- create a profile;
- see more of the buyer/seller environment;
- prepare draft orders;
- prepare draft auctions;
- understand what full verification will unlock.

A registered user should not yet be able to fully publish or reveal sensitive counterparty data if the platform requires stronger verification.

### Level 3: Verified participant

A fully verified participant can:

- publish orders;
- publish auctions;
- reveal contacts where the scenario allows it;
- interact with counterparties;
- use the full deal-flow tools.

Full verification should preferably be done through official digital identity or authority mechanisms, not by forcing a passport selfie at the first step.

Potential options to research:

- Госуслуги;
- Госключ;
- electronic signature / qualified electronic signature;
- machine-readable power of attorney for company representatives;
- bank verification;
- official company data checks.

A key open question:

> If a person enters the INN of a company, how does OTC Metals verify that this person has the legal right to represent that company?

## Registration vision

Registration should not start with a long company form.

Desired sequence:

1. User chooses legal type:
   - Физическое лицо;
   - ИП;
   - Юридическое лицо.

2. User chooses market role:
   - Ломбард;
   - Скупщик;
   - Ювелир;
   - Ювелирная компания;
   - Ювелирный завод;
   - Оптовая компания;
   - Аффинажное предприятие;
   - Банк;
   - Другое.

3. User enters basic data:
   - email;
   - phone;
   - INN where applicable.

4. The platform pulls official information where possible.

5. The user then confirms details and proceeds to deeper verification only when attempting actions that require it.

## Product categories

OTC Metals should cover not only scrap and jewelry, but also investment-grade items.

Important categories:

- jewelry scrap;
- gold and silver jewelry;
- bullion bars;
- investment bars;
- investment coins;
- precious stones if legally and operationally appropriate;
- larger wholesale volumes;
- refinery-related flows;
- bank and institutional flows.

Investment bars and coins are not a separate unrelated business; they may become one of the important participant flows for individuals and investors.

## Trust system

Trust is a core product feature.

The platform should not allow random fake participants to act as trusted market players.

Trust should be built from:

- email/phone verification;
- INN/OGRN checks;
- official company data;
- date of registration;
- business activity codes;
- licenses or permissions where required;
- representative authority verification;
- platform activity history;
- response speed;
- confirmed interactions;
- reviews or feedback after interactions.

A participant profile should eventually include a trust card:

- company/person name;
- INN;
- OGRN where applicable;
- region;
- date of registration;
- business activity;
- verification status;
- rating;
- response speed;
- last activity;
- trust level.

## GIIS DMDK

GIIS DMDK is strategically important but must be handled carefully.

The platform should research:

- whether and how GIIS DMDK can be legally integrated;
- whether OTC Metals can use official data or only link users to official checks;
- what participant categories have access;
- what technical and legal restrictions apply;
- whether a lightweight first-stage approach is possible, such as a link or user-side check.

The platform should not claim deep GIIS integration before it is legally and technically confirmed.

## Monetization status

No monetization at the first stage.

The first goal is to attract users, prove demand, understand real behavior, and observe where value is created.

Subscription currently looks weak because:

- an individual may use the platform once and will not pay monthly;
- large professional participants may do many deals, making a cheap subscription underpriced;
- the platform does not yet know which segments will be most active.

Future monetization options to research:

- fee for opening/revealing a qualified contact;
- fee for publishing an order;
- fee for priority placement;
- fee for trust verification / advanced trust card;
- success-fee-like information-service reward, without becoming a broker or transaction party;
- paid analytics for professional users;
- advertising/sponsorship only if it does not reduce trust.

Important open question:

> How can OTC Metals earn from successful matching or contact access without becoming a broker, escrow, or party to the deal?

## Telegram

Telegram is not a core product priority.

The product goal is to bring users into the platform, not to move work outside it.

Telegram may be considered later as a marketing channel for public highlights or weekly active offers, but not as the main workspace.

## Gold Trade comparison hypothesis

Gold Trade is a useful market reference, but OTC Metals should not simply copy it.

Possible OTC Metals advantages:

- role-based routing;
- progressive access levels;
- clearer user journey;
- easier first registration;
- trust cards;
- buyer/seller matching logic;
- negotiation tracker;
- broader routes for individuals, lombards, jewelers, factories, refineries, banks, and investors.

Gold Trade should be studied for:

- company verification ideas;
- market credibility;
- quotation display;
- auctions;
- investment bar flows;
- trust-building mechanisms.

But OTC Metals must remain independent and avoid presenting itself as broker, exchange, escrow, or guarantor.

## Current product direction

The platform should be developed through staging first.

Production should remain stable until changes are approved.

Staging is used to test:

- Russian-only interface;
- cleaner guest experience;
- registration starting with legal type and market role;
- hiding internal access levels from the main page;
- guest CTA behavior;
- trust-card concepts;
- calculator concepts;
- buyer/seller/order flows.

## Immediate UX decisions already agreed

- The entire visible interface should be in Russian.
- Internal labels and English UI words should not be visible to users.
- Visible blocks like "Гость уровень 0 / 1 / 2" should not be shown as large public blocks on the main page.
- Access levels may exist internally, but the user should experience them naturally through available actions.
- Guest users can browse the vitrine but cannot perform meaningful actions without registration.
- Registration should begin with identifying the participant type and market role, not with a long company form.
