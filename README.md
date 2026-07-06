# ML Club Admin Portal

Admin dashboard for the Machine Learning Club, NIT Silchar website — built with **SvelteKit** and **Tailwind CSS**.

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` — you'll be redirected to `/auth`.

**Demo credentials:** `admin` / `mlclub2026` (also accepts `root` / `nitsilchar`)

## What's inside

- **`/auth`** — login screen with client-side validation and a simulated (latency-delayed) authentication call. Session is kept in `sessionStorage` via `src/lib/stores/auth.js`.
- **`/dashboard`** — overview with live counts and quick actions. Protected: unauthenticated visits redirect to `/auth`.
- **`/dashboard/members`** — searchable data table, Add/Edit modal, delete confirmation.
- **`/dashboard/projects`** — card grid, Add/Edit modal, delete confirmation.
- **`/dashboard/blogs`** — post list, Create/Edit modal with a full content field, delete confirmation.
- **`/dashboard/preview`** — a tabbed "browser frame" that renders members/projects/blogs exactly as the public site would, reading from the same stores — so any edit shows up instantly.

## Data layer

All content (members, projects, blogs) lives in Svelte stores in `src/lib/stores/data.js`, persisted to `localStorage` so state survives refreshes. Swap the `membersApi` / `projectsApi` / `blogsApi` methods for real `fetch` calls to your backend when you're ready to wire up a database — the components don't need to change.

## Design notes

- Palette: deep charcoal/near-black base (`#0B0D10`), single vibrant orange accent (`#FF6A1A`), crisp white text — matching the club's existing brand mark.
- Type: Space Grotesk (display), Inter (body), JetBrains Mono (data/labels — chips, timestamps, tech tags).
- Signature motif: a quiet neural-network node/line pattern in the sidebar footer and login background, nodding to the club's subject matter without overdoing it.
- Fully responsive: sidebar collapses to a slide-over drawer below `lg`, tables scroll horizontally on narrow screens, cards reflow to a single column.
deployed using vercel
