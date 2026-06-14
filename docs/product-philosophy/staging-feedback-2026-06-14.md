# OTC Metals — Staging Review Notes 2026-06-14

## Status

The latest staging page moved closer to the internal product philosophy, but it shows too much internal system logic to the user.

The owner currently feels that the production version may be closer to the desired public product than the new staging version.

Staging should not be treated as final UX direction yet.

## Main conclusion

The homepage should show the market and user opportunities, not the internal engine of the platform.

The user should immediately understand:

- where to buy;
- where to sell;
- how to place an order;
- what prices, volumes, and regions exist;
- that participants are checked;
- that contacts open only after the correct scenario.

The user should not be overloaded with explanations about routing, profile stages, route calculation, or internal trust mechanics.

## What feels wrong in current staging

- The hero phrase “Интеллектуальный маршрутизатор рынка драгоценных металлов” feels too technical.
- Large blocks “Что делает платформа” and “Чего не делает платформа” dominate the first screen.
- “Маршрут участника” feels like internal system logic and should not be a large public block.
- “Профиль определён”, “Доверие подтверждено”, “Маршрут рассчитан” are useful internally, but should not be the main homepage story.
- “Как работает платформа” currently feels like documentation rather than a market page.
- “Примеры маршрутов металла” should likely become examples of orders, offers, buyer requests, seller offers, prices, volumes, and regions.

## Working UX principle

The homepage should answer:

> What can I do here right now?

Not:

> How does the internal platform architecture work?

## Direction for next iteration

Use production as the visual/product baseline and bring in only the useful philosophy elements:

- market-first homepage;
- buyer/seller/place order actions;
- clean premium Russian UI;
- trust-result language;
- registration by legal type and role;
- routing under the hood;
- no visible unfinished/demo language;
- no large public access-level explanations.

## Next step

Before asking Codex/Cursor to rebuild again, compare production and staging and define the ideal homepage structure.
