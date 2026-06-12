# AGENTS.md

This repository is controlled by the project owner.

Main rule: do not create chaos.

## Safety rules

- Do not push risky changes directly to main.
- Do not delete files without explicit owner approval.
- Do not rewrite the whole project when a small fix is needed.
- Do not change business logic without checking the approved project context.
- Keep changes small, focused, explained, and verifiable.
- One task should have one clear executor and one clear change set.
- Important decisions must be documented.
- Runtime errors should be checked against Render logs.
- Do not commit secrets, tokens, passwords, API keys, private keys, or database URLs.
- Do not edit .env files unless explicitly approved by the owner.
- Do not change GitHub Secrets or Render environment variables without explicit owner approval.
- Do not change billing, ownership, repository visibility, access rights, or deployment settings without explicit owner approval.
- Do not use force push.
- Prefer pull requests for all non-trivial changes.
- Before deployment-related changes, run build checks.
- If uncertain, stop and ask the owner.

## Branch rules

- main is the production branch.
- staging is the testing branch.
- codex/* branches are for Codex work.
- claude/* branches are for Claude work.
- agent/* branches are for other agents.

## Roles

- Owner: final decision maker.
- GitHub: source of truth for code and documentation.
- Render: deployment environment.
- Codex: main code executor.
- Claude: analysis or implementation helper.
- ChatGPT: coordination, task formulation, architecture review, and project control.
- Perplexity: optional external research helper only.
