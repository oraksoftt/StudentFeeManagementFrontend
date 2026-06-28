# Student Fee Management

A modern Next.js application for managing students and fees with a dashboard UI, multilingual support, and responsive layout.

---

## Table of Contents

- About
- What's New
- Features
- Tech Stack
- Project Structure
- Getting Started
- Available Scripts
- Notes

---

## About

`student-fee-management` is a Next.js app to manage student records and fee transactions. It includes list views, modal forms, CRUD actions, and client-side notifications.

---

## What's New

This update includes several improvements:

- Fixed language switcher behavior
  - Selecting the default locale (`en`) now navigates to the locale-less canonical path (e.g. `/students`).
  - Selecting other locales (e.g. `ur`, `ar`) navigates to `/{locale}/...` so translations load correctly.
- Responsive layout
  - Sidebar collapses into a mobile drawer on small screens.
  - Header contains a hamburger toggle for mobile devices.
  - Spacing and container paddings improved for small/medium viewports.
- Client-side pagination
  - `Students` and `Fees` tables now support client-side pagination with per-page controls and next/prev navigation.
- Translations
  - All visible UI strings are wired into `next-intl` message files.

---

## Features

- Students: create, update, delete
- Fees: create, update, delete
- Toast notifications via `sonner`
- Localized UI and routes via `next-intl`
- Responsive sidebar and header
- Client-side pagination for tables

---

## Tech Stack

- `next` 16.x (App Router)
- `react` 19.x
- `typescript`
- `tailwindcss` 4.x
- `next-intl` for localization
- `sonner` for toasts
- `react-hook-form` + `zod` for forms

---

## Project Structure (high level)

- `app/[locale]` — locale-scoped pages and layout
- `components/layout` — header, sidebar, shell
- `components/students` — forms, tables, dialogs
- `components/fees` — forms, tables, dialogs
- `messages/` — translation JSON files
- `actions/` — server actions that mutate data and revalidate routes

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install

```bash
npm install
```

### Run (development)

```bash
npm run dev
```

Open `http://localhost:3000`.

### Build (production)

```bash
npm run build
npm start
```

---

## Usage Notes

- Default locale is English. The app uses the locale-less URL for the default language (e.g. `/students`).
- To view another language use `/{locale}` (e.g. `/ar/students`).
- The header language switcher respects this behavior and navigates to canonical paths.
- On mobile, use the header hamburger to open the sidebar drawer.

---

## Contributing

Contributions are welcome. Open issues for bugs or feature requests.

---

## License

No license specified.
