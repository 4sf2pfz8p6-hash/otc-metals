# OTC Metals — Agent Handoff Guide

This guide explains how AI agents, developers, product assistants, and UX reviewers should start work on OTC Metals.

## Read first

Before making changes, read these documents in this order:

1. `docs/otc-metals-master-plan.md`
2. `docs/platform-philosophy.md`
3. `docs/product-vision.md`
4. `docs/launch-standard.md`

## Current working branch

Use `staging` for product development and experiments.

Do not change `main` unless the owner explicitly approves moving staging changes into production.

## Production safety

Do not touch:

- production Render service;
- production environment variables;
- billing;
- secrets;
- main branch;
- production domain.

## Product direction

OTC Metals is a professional ecosystem and routing platform for the precious-metals market.

It is not a raw MVP, not a broker, not an exchange, not escrow, not a guarantor, and not a simple classifieds board.

## What every agent should preserve

- Russian-only visible UI.
- Serious, polished, premium product feel.
- Guest can view the market but cannot act.
- Registration starts with legal type and market role.
- The platform routes users based on who they are and what they are allowed to do.
- Trust should be shown as simple results, not as document overload.
- OTC Metals should not publicly look unfinished.

## How to propose changes

When proposing a change, state:

1. Which product document supports it.
2. Which user problem it solves.
3. Whether it affects production.
4. Whether it changes registration, trust, order flow, or monetization.

## Owner review principle

Major product changes should be shown on staging first.

Production changes require explicit owner approval.
