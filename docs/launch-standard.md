# OTC Metals Launch Standard

This document fixes the launch-positioning decision for OTC Metals.

## Decision

OTC Metals should not be positioned internally or externally as a raw MVP.

The project direction is a polished, production-ready first public version.

The first release should feel like a complete working platform, not a rough experiment.

## What this means

The product should be developed with the following expectation:

- users should not feel that they are entering an unfinished prototype;
- public wording should not say MVP;
- public wording should not say that core verification is only a future idea unless it is clearly framed as a staged capability;
- the interface should be coherent and trustworthy from the first public launch;
- registration, roles, trust logic, marketplace/vitrine, order drafts, and verification path should be thought through as a complete system;
- staging remains a safe development environment, but the target is a ready product.

## Internal terminology

Avoid using:

- MVP;
- raw prototype;
- unfinished marketplace;
- test product;
- demo platform.

Prefer using:

- first public version;
- production-ready launch;
- initial full platform version;
- first release;
- launch version;
- Version 1.

## Product expectation

The first launch version should include a complete user journey:

1. Guest enters the site and sees the marketplace/vitrine.
2. Guest understands that buyers, sellers, orders, and auctions exist.
3. Guest cannot perform meaningful actions without registration.
4. Registration starts with legal type and market role.
5. User enters email, phone, and INN where applicable.
6. Official company/person data is pulled where legally and technically possible.
7. User can prepare drafts after basic registration.
8. Full verification is requested only before higher-trust actions such as publishing, revealing contacts, or participating in transaction workflows.
9. Platform routes the user according to role, legal status, permissions, and trust level.

## Important product principle

The platform can still launch in stages technically, but the user-facing experience should not look staged or broken.

The user should experience OTC Metals as a serious, ready, trustworthy platform for the precious-metals market.

## Relation to product-vision.md

The main product logic remains in `docs/product-vision.md`.

This file adds one fixed decision:

> OTC Metals is not being built as a raw MVP. It is being built toward a complete launch version.
