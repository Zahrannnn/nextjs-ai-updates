# Product

## Register

product

## Users

Developers managing their GitHub presence. Primary daily task: checking personal stats, recent activity, repo list, and favorite bookmarks in one glance. Secondary: browsing other dev profiles and exploring repo details.

## Product Purpose

A focused GitHub dashboard that surfaces the developer's own data — stats, repos, contributions, languages — without the noise of the full GitHub feed. Success is opening the dashboard and seeing your pulse in one tab: how many stars, what you committed, which repos need attention.

## Brand Personality

Clean, capable, developer-first. Functional precision over decoration. Gets out of the way. Inspired by GitHub's own Primer design language: utilitarian, restrained, ship-shaped.

## Anti-references

- Dense enterprise dashboards (Jira, Grafana, Datadog) — no heavy data chrome, no nested tables, no information overload
- Over-styled SaaS apps — no heavy gradients, shadows, or decorative flourishes
- Not a GitHub clone — it's a curated lens, not a full replacement

## Design Principles

1. **Primer-first, not custom.** Align all visual decisions to GitHub Primer tokens. Deviate only when the dashboard context demands it, and name the divergence.
2. **One glance, one job.** Each screen surface serves exactly one job: stats overview, repo browsing, user search. No screen tries to do two things.
3. **Information density serves the task, not the container.** Show enough to act, not enough to overwhelm. Empty and loading states are first-class citizens.
4. **Motion without ceremony.** Transitions exist for continuity (page sections streaming in, numbers counting up), not for delight. No bounce, no elastic, no decorative entrance.
5. **The codebase is the UI reference.** Every component uses Primer CSS variables defined in globals.css. No hard-coded colors, no custom spacing, no new radius or elevation values.

## Accessibility & Inclusion

- WCAG AA contrast for all text
- Reduced motion respected via `prefers-reduced-motion`
- Keyboard navigation for all interactive elements
- Focus-visible outlines following Primer conventions
