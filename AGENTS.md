<!-- BEGIN:nextjs-agent-rules -->

# 🧠 Agent Guidelines — Letícia Martins System

## 🎯 Objective

Build a clean, scalable web system for managing clients, projects, and financial data using modern best practices.

---

## 🧱 Tech Stack

- Next.js 16 with turbopack (App Router)
- Supabase (PostgreSQL + Auth)
- Tailwind CSS v4.2
- shadcn/ui

---

## 📁 Project Structure Rules

- Use `/lib/supabase` for clients (server and browser)
- Use `/services` for business logic
- Use `/types` for shared types
- Keep components reusable and small

---

## 🧩 Architecture Principles

### 1. Separation of Concerns

- `app/` → rotas e páginas (App Router)
- `components/` → UI e blocos reutilizáveis
- `lib/` → integrações,
- `services/` → lógica e ações server
- `types/` → tipagem global
- `hooks/` → lógica reativa reutilizável

---

### 2. Data Access

- Always access Supabase via services
- NEVER call Supabase directly inside components

---

### 3. Server vs Client

- Prefer Server Components
- Use Client Components only when necessary

---

### 4. Financial Domain Rules (CRITICAL)

There are 3 financial entities:

#### Revenues

- May or may not be linked to a project

#### Project Expenses

- Must always be linked to a project

#### Fixed Expenses

- Must NEVER be linked to a project

---

### 5. Naming Conventions

- Tables: plural (clients, projects)
- Services: `*.service.ts`
- Types: `*.ts`

---

### 6. UI Guidelines

- Use shadcn/ui components
- Keep design minimal and clean
- Avoid unnecessary visual complexity

---

### 7. Performance Rules

- Use server-side fetching when possible
- Avoid unnecessary re-renders
- Use Supabase RPC for heavy calculations

---

### 8. Security

- Use Supabase Auth
- Implement Row Level Security (RLS)
- Never expose sensitive logic in frontend

---

### 9. Code Style

- Prefer readability over cleverness
- Use early returns
- Avoid deeply nested logic

---

## 🚫 Anti-Patterns

- ❌ Direct DB calls inside components
- ❌ Mixing fixed and project expenses
- ❌ Business logic inside UI
- ❌ Giant components

---

## ✅ Best Practices

- ✔ Create reusable services
- ✔ Keep components small
- ✔ Use typed responses
- ✔ Use server actions when appropriate

---

## 🚀 Future Improvements

- Dashboard analytics
- Reports export
- Automation workflows
- Notifications system

---

## 🧠 Final Rule

This is not just a CRUD system.

It is a **decision-making tool**.

Every feature should help the user:

- Understand finances
- Save time
- Grow the business

## Tailwindcss rules

- Priorize tailwindcss classes instead of inline styles
- fix suggestionsCanonicalClass warning
- use shadcn/ui components
- use tailwindcss v4.2
- use css variables for design tokens
- use oklch for a better color perception
- Use oklch color space instead of rgb or hex

<!-- END:nextjs-agent-rules -->
