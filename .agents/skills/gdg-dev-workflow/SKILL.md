---
name: gdg-dev-workflow
description: >-
  Provides procedures for building, running dev servers, linting, type-checking, and verifying
  both the Next.js frontend and Express backend for GDG Kolkata. Use this skill when executing
  development commands, checking for build/type errors, or verifying fullstack changes.
---

# GDG Kolkata Development Workflow Skill

This skill documents standard procedures to run, build, and verify the frontend and backend applications in the GDG Kolkata repository.

## Repository Layout

```text
GdgOfficial/
├── frontend/   # Next.js 16, React 19, Tailwind CSS v4, TypeScript
└── backend/    # Express 5, TypeScript, Node.js
```

---

## 1. Running Development Servers

### Frontend (Next.js)
```powershell
cd frontend
npm run dev
```
- Local URL: `http://localhost:3000`
- Turbopack is configured with `@tailwindcss/turbopack`.

### Backend (Express)
```powershell
cd backend
npm run dev
```
- Local URL: `http://localhost:5000` (or configured `PORT` in `.env`)
- Driven by `nodemon` and `ts-node`.

---

## 2. Verification & Quality Checks

Always run quality checks before finishing a task:

### Frontend Check
```powershell
cd frontend
npm run lint
npm run build
```

### Backend Check
```powershell
cd backend
npm run build
```

### Automated Full Project Verification Script
Run the helper script in `scripts/`:
```powershell
powershell -ExecutionPolicy Bypass -File .agents/skills/gdg-dev-workflow/scripts/verify-project.ps1
```

---

## 3. Common Troubleshooting

- **Tailwind v4 vs v3**: The frontend uses Tailwind CSS v4. Do not use legacy `@tailwind base;` directives or `tailwind.config.js`. CSS imports follow v4 specifications `@import "tailwindcss";`.
- **React 19 Hooks**: Frontend uses React 19. Ensure standard hook and client component directives (`'use client'`) are correctly placed.
- **Node/TS Types**: Ensure `@types/node` and `@types/react` versions are aligned.
