# OTC Metals — Product Philosophy Entry Point

This is the single starting point for every working session on OTC Metals.

When the owner says:

> Начинаем работу. Открой философию проекта.

Any assistant, agent, developer, or product consultant should start here.

## Read in this order

1. `docs/product-philosophy/README.md` — this file.
2. `docs/product-philosophy/decisions-log.md` — accepted decisions.
3. `docs/otc-metals-master-plan.md` — full product master plan.
4. `docs/platform-philosophy.md` — deep platform philosophy.
5. `docs/product-vision.md` — product vision and registration/trust logic.
6. `docs/launch-standard.md` — launch quality standard.
7. `docs/agent-handoff.md` — instructions for agents.

## Short project summary

OTC Metals is a professional ecosystem and intelligent routing platform for the precious-metals market.

It is not:

- a raw MVP;
- a simple classifieds board;
- an exchange;
- a broker;
- escrow;
- a guarantor;
- a party to transactions;
- a storage service for money, metal, or documents.

The platform brings market participants into one digital environment and routes them according to who they are, what they are allowed to do, and which counterparties are relevant.

## Core principle

OTC Metals should understand the participant first, then open the correct scenarios.

The platform should determine:

- participant type;
- market role;
- company/person status;
- licenses and permissions;
- authority to represent the company;
- permitted product categories;
- allowed counterparties;
- allowed actions.

The user should not need to understand all legal complexity.

The platform should do the hard work under the hood and show simple results:

- Проверенный участник;
- Документы проверены;
- Полномочия подтверждены;
- Может покупать этот тип металла;
- Может продавать этот тип металла;
- Доступные сценарии определены по статусу участника.

## Current URLs

Production:

https://otc-metals.onrender.com

Staging:

https://otc-metals-staging.onrender.com

Production must remain untouched unless explicitly approved.

All experiments and product changes go through staging first.

## Current focus

Current product focus:

1. Bring staging in line with the philosophy.
2. Remove unfinished/demo wording.
3. Improve guest flow.
4. Rebuild registration around legal type and market role.
5. Add trust-result language instead of document-heavy UI.
6. Research official free/low-risk INN data sources.
7. Plan role-based routing.
8. Prepare the platform for real participants, not demo-only content.

## Working rule

If a decision is accepted during discussion, record it in:

`docs/product-philosophy/decisions-log.md`

Do not rely on chat memory alone.
