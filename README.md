# SweetUI — AI Kata Sweet Shop (Design Tokens → Primitives → App → Supabase)

A tiny, production-style exercise that starts from a **Figma-AI-generated design system** (“SweetUI”) and lands a working **React + Vite + TypeScript** app with:

- **Design tokens** exported as CSS variables
- **Primitive components** (Button, Card) driven by tokens
- **Vitest + React Testing Library** smoke & variant tests
- **Mock API** first → then **Supabase** DB with RLS
- **Auth (email/password)** and **role-gated admin** inventory panel
- Clean **branching & Conventional Commits** with small PRs

---

## 0) Project Structure

```
sweetui-demo/
├─ src/
│  ├─ api/
│  │  ├─ api.ts             # Api interface
│  │  ├─ api.mock.ts        # Mock implementation
│  │  ├─ api.supabase.ts    # Supabase implementation
│  │  └─ runtime.ts         # Chooses mock or supabase at runtime
│  ├─ auth/
│  │  ├─ supabaseClient.ts  # shared Supabase client
│  │  ├─ auth.ts            # signIn/signUp/signOut helpers
│  │  ├─ AuthProvider.tsx   # session gate (isAuthed)
│  │  ├─ roles.tsx          # RoleProvider (profiles.role)
│  │  └─ SignInForm.tsx     # centered Sign in / Sign up UI
│  ├─ admin/
│  │  └─ InventoryPanel.tsx # restock + create sweet (role=admin)
│  ├─ components/
│  │  ├─ Button.tsx
│  │  └─ Card.tsx
│  ├─ domain/
│  │  ├─ SearchBar.tsx
│  │  └─ SweetCard.tsx
│  ├─ pages/
│  │  └─ Dashboard.tsx
│  ├─ __tests__/
│  │  ├─ smoke.test.tsx
│  │  └─ Button.test.tsx
│  ├─ styles/
│  │  └─ tokens.css         # design tokens (colors, spacing, radius...)
│  ├─ App.tsx
│  └─ main.tsx
├─ .env.local               # VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY
├─ package.json
└─ vite.config.ts
```

---

## 1) Local Development

### Install
```bash
npm i
```

### Run dev server
```bash
npm run dev
```
Open `http://localhost:5173`

### Run tests (Vitest + RTL)
```bash
npm test
```

---

## 2) Design Tokens (from Figma AI → CSS variables)

- **Color tokens:** `--sweet-primary`, `--sweet-surface`, `--sweet-success`, `--sweet-warning`
- **Spacing scale (8pt):** `--sweet-space-1..8` + `--sweet-gap`
- **Radius:** `--sweet-radius-sm/md/lg`
- **Type scale (Inter):** `--sweet-text-xs/sm/md/lg/xl`
- **Elevation:** `--sweet-elevation-0/1/2`
- **Auto-layout defaults:** `--sweet-gap: 12px; --sweet-padding: 16px`

These live in `src/styles/tokens.css` and drive primitives.

---

## 3) Primitive Components

- `Button.tsx` – `variant: 'primary'|'success'|'warning'` picks the token  
- `Card.tsx` – tokenized elevation, radius, padding

**Tests:**
- `__tests__/smoke.test.tsx` (app renders)
- `__tests__/Button.test.tsx` (label + variant uses token CSS var)

Run:
```bash
npm test
```

---

## 4) Mock API first

`src/api/api.mock.ts` exposes:
- `listSweets()`, `searchSweets(q)`, `purchase(id, qty)`, and admin CRUD that mutate an in-memory array

`src/api/runtime.ts` chooses which API to use:
- By default uses **Supabase** if keys present; otherwise the **Mock API**
- (For quick toggling you can add `VITE_USE_MOCK=1` to force mock)

---

## 5) Supabase Setup (DB + RLS + RPC)

Create a project at **supabase.com**, and put keys in `.env.local`:

```
VITE_SUPABASE_URL=...your-url...
VITE_SUPABASE_ANON_KEY=...your-anon-key...
```

### Install client
```bash
npm i @supabase/supabase-js
```

### SQL — Tables
(See conversation for full schema)
```sql
-- sweets
create table if not exists public.sweets (
  id bigserial primary key,
  name text not null,
  category text not null,
  price numeric not null check (price >= 0),
  quantity integer not null default 0 check (quantity >= 0),
  inserted_at timestamptz not null default now()
);

-- profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  role text not null check (role in ('user','admin')) default 'user',
  created_at timestamptz not null default now()
);

-- inventory logs
create table if not exists public.inventory_logs (
  id bigserial primary key,
  sweet_id bigint not null references public.sweets(id) on delete cascade,
  change integer not null,
  reason text not null,
  actor uuid references auth.users(id),
  created_at timestamptz not null default now()
);
```

---

## 6) Auth (email/password) + Role

In Supabase Auth → Providers → Email: disable “Confirm email” for local testing.

### Make yourself admin
```sql
insert into public.profiles (id, role)
values ('<YOUR_UUID>', 'admin')
on conflict (id) do update set role = 'admin';
```

---

## 7) Supabase API Implementation

Implements the same Api interface using the Supabase client.  
RPC methods: `purchase_sweet`, `restock_sweet`.  
Auto-selected via `src/api/runtime.ts`.

---

## 8) App Shell + Pages

`App.tsx` gates app:
- Not authed → `SignInForm`
- Authed → `Dashboard` + `InventoryPanel` if `role==='admin'`

---

## 9) Commit Process (Conventional Commits)

Examples:
```
feat(ui): add SweetButton and SweetCard primitives
feat(api): add mock Api abstraction and wire Dashboard search/purchase
feat(db): create Supabase schema (sweets, profiles, inventory_logs) + RLS + RPC
feat(auth): add Supabase Auth (email/password) and RoleProvider
feat(admin): inventory panel (restock + create) gated by role=admin
```

---

## 10) Troubleshooting

**No sweets:** ensure Supabase RLS allows reads, and you’re logged in.  
**No admin panel:** check your UUID in `public.profiles`.  
**Vitest jsdom error:** test env is `happy-dom`.  
**CRLF warnings:** harmless.  
**Layout gap:** ensure body margin=0.

---

## 11) Scripts

```
npm run dev      # start dev server
npm run build    # build for prod
npm run preview  # preview prod build
npm test         # run Vitest
npm run lint     # ESLint
```

---

## 12) Screenshots
<img width="2557" height="1331" alt="Screenshot 2025-11-02 202704" src="https://github.com/user-attachments/assets/48063d10-4ab4-4bcc-aa6c-cde21a5d5422" />

<img width="2559" height="1334" alt="Screenshot 2025-11-02 202710" src="https://github.com/user-attachments/assets/e2562268-eb04-4d4e-92cb-54c343a5cde7" />

<img width="2532" height="1336" alt="Screenshot 2025-11-02 202726" src="https://github.com/user-attachments/assets/82ed69f5-0bcf-4cf3-a15a-637fde85eb95" />

<img width="2526" height="1118" alt="image" src="https://github.com/user-attachments/assets/5518ad10-6593-41a3-b782-1b793a710e0c" />

## My AI Usage
The development of SweetUI followed a structured, AI-assisted workflow from concept to deployment.
Using Figma’s AI design generation, the initial SweetUI Design System — including color tokens, typography, spacing, and component guidelines — was automatically created and exported as CSS variables. I then collaborated with ChatGPT (GPT-5) to iteratively transform these tokens into functional React components, build the project architecture, implement TypeScript-based type safety, and define clean Git branching and commit conventions.

ChatGPT further assisted in creating progressive workflow steps for each milestone — from primitives to domain components, API abstraction, and Supabase integration — ensuring technical consistency and adherence to modern frontend practices. It also generated unit tests (Vitest + React Testing Library), structured commit messages, and documentation content such as the README, ensuring that all components were modular, testable, and version-controlled.

Throughout the process, AI acted as a pair programmer and technical guide, helping optimize component logic, database schema design, and the authentication layer using Supabase’s RLS and RPC functions. Every major feature — including role-based access control, mock API transition, and admin inventory panel — was built following AI-generated blueprints, verified, and refined through manual review and testing.

## License

MIT — Manipal Institute of Technology
