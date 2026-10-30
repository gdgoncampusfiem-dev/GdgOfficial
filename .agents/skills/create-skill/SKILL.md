---
name: create-skill
description: >-
  Provides guidelines, templates, and procedures for authoring and scaffolding new Antigravity workspace skills.
  Use this skill whenever the user asks to create, update, or scaffold a new skill for the agent.
---

# Create Skill Workflow

This skill defines the standard procedure for creating new Antigravity skills.

## Structure of a Skill

A skill must be created inside `.agents/skills/<skill-name>/`:

```text
.agents/skills/<skill-name>/
├── SKILL.md            # Required: Main instruction file with YAML frontmatter
├── scripts/            # Optional: Shell/PowerShell scripts for complex command execution
├── examples/           # Optional: Code snippets or reference configurations
└── references/         # Optional: Detailed reference docs or specs
```

---

## 1. Skill Naming

- Must be lowercase, hyphenated (e.g. `gdg-editorial-design`, `auth-flow-test`).
- Must match the `name` field in the frontmatter.

---

## 2. YAML Frontmatter Specification

Every `SKILL.md` must start with valid YAML frontmatter:

```markdown
---
name: your-skill-name
description: >-
  Describe what the skill does and when the agent should use it.
  Use 3rd person (e.g., "Use this skill when the user asks to...").
---
```

### Critical Rules for `description`:
- Write in **third person**.
- State both **what** it does and **the specific conditions / keywords** when the agent should activate it.
- This description is what Antigravity injects into the prompt during progressive disclosure.

---

## 3. Best Practices

1. **Keep `SKILL.md` Focused**: Do not dump thousands of lines into `SKILL.md`. Offload large API tables, guides, or specifications into files within `references/`.
2. **Encapsulate Automation**: Store multi-step terminal command sequences as executable scripts under `scripts/`.
3. **Include Validation**: Always specify how the agent should verify success (e.g., exit codes, output logs, visual check).

---

## Starter Template

See [template-skill.md](./examples/template-skill.md) for a ready-to-copy skeleton.
