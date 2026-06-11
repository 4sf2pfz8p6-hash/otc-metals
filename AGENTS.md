# AGENTS.md

This repository is controlled by the project owner.

Main rule: do not create chaos.

- Do not push risky changes directly to main.
- Do not delete files without explicit owner approval.
- Do not rewrite the whole project when a small fix is needed.
- Do not change business logic without checking the approved project context.
- Keep changes small, focused, explained, and verifiable.
- One task should have one clear executor and one clear change set.
- Important decisions must be documented.
- Runtime errors should be checked against Render logs.

Roles:

- Owner: final decision maker.
- GitHub: source of truth for code and documentation.
- Render: deployment environment.
- Codex: main code executor.
- Claude: analysis or implementation helper.
- ChatGPT: coordination, task formulation, architecture review, and project control.
- Perplexity: optional external research helper only.
