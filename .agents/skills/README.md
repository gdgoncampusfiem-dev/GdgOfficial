# Antigravity Skills Directory

This directory contains workspace skills discovered and loaded on-demand by Antigravity.

## What is a Skill?

Skills are modular packages of knowledge and procedures that extend the agent's capabilities. They act as on-demand runbooks or cheatsheets for specific workflows.

To keep the agent's context window fast and efficient, Antigravity uses **progressive disclosure**:
- Only skill names and descriptions are loaded initially.
- The full instructions in `SKILL.md` (and reference documents) are loaded dynamically only when a task matches the skill's purpose.

---

## Directory Structure

Every skill lives in its own subdirectory inside `skills/` and requires a `SKILL.md` file:

```text
.agents/skills/
├── README.md
├── gdg-editorial-design/
│   ├── SKILL.md
│   └── references/
│       ├── editorial-guidelines.md
│       └── palette-and-tokens.md
├── gdg-dev-workflow/
│   ├── SKILL.md
│   └── scripts/
│       └── verify-project.ps1
└── create-skill/
    ├── SKILL.md
    └── examples/
        └── template-skill.md
```

---

## Skill Format (`SKILL.md`)

Each `SKILL.md` must start with YAML frontmatter:

```markdown
---
name: your-skill-name
description: >-
  Describe what this skill does and when the agent should activate it.
  Always write descriptions in third person (e.g. "Use this skill when...").
---

# Skill Title

Instructions, step-by-step procedures, and reference links go here.
```

---

## Installed Skills

| Skill | Purpose |
| :--- | :--- |
| [`gdg-editorial-design`](./gdg-editorial-design/SKILL.md) | Editorial aesthetics, typography, Kolkata visual motif, and brand guardrails |
| [`editorial-motion-craft`](./editorial-motion-craft/SKILL.md) | Award-winning Framer Motion 14, Lenis smooth scroll, SVG path drawing, and micro-interactions |
| [`authored-svg-geometry`](./authored-svg-geometry/SKILL.md) | Architectural vector linework (Howrah Bridge, tram wires, monuments) & procedural SVG noise filters |
| [`gdg-dev-workflow`](./gdg-dev-workflow/SKILL.md) | Frontend & backend build, test, lint, and verification workflows |
| [`create-skill`](./create-skill/SKILL.md) | Scaffolding and guidelines for creating new Antigravity skills |
