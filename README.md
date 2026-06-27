# Student Fee Management

A modern Next.js application for managing students and fees with a clean dashboard UI, reusable components, localized routing, and toast notifications.

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Architecture](#architecture)
- [Styling and UI](#styling-and-ui)
- [API Integration](#api-integration)
- [Environment Variables](#environment-variables)
- [Notes](#notes)

---

## About

`student-fee-management` is a Next.js app built to manage student records and fee transactions in a simple administrative interface. The app includes list views, modal forms, CRUD actions, and client-side notifications for important user interactions.

---

## Features

- Students management
  - Create student records
  - Update student profiles
  - Delete students
- Fees management
  - Create fee entries
  - Update fee records
  - Delete fees
- Toast notifications with `sonner`
- Localized routing using `next-intl`
- Dark/light theme support with `next-themes`
- Reusable UI components and dialogs
- Centralized API client with Axios and response interceptors

---

## Tech Stack

- `next` `16.2.9`
- `react` `19.2.4`
- `typescript`
- `tailwindcss` `4.x`
- `shadcn`
- `sonner`
- `axios`
- `next-intl`
- `next-themes`
- `lucide-react`
- `react-hook-form`
- `zod`

---

## Project Structure

- `app/`
  - `[locale]/layout.tsx` - app layout and global styles
  - `[locale]/page.tsx` - homepage placeholder
  - `[locale]/students/page.tsx` - student management page
  - `[locale]/fees/page.tsx` - fee management page
- `components/`
  - `layout/` - sidebar, header, shell
  - `students/` - student table, dialogs, forms, actions
  - `fees/` - fee table, dialogs, forms, actions
  - `ui/` - shared UI components and primitives
- `services/` - Axios-based backend request helpers
- `actions/` - server actions for form submission and page revalidation
- `lib/axios.ts` - shared Axios instance with global error handling
- `types/` - application type definitions
- `messages/` - locale-specific translation files

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- A backend API endpoint available via `NEXT_PUBLIC_API_URL` or `API_URL`

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## Available Scripts

- `npm run dev` - run the development server
- `npm run build` - build the app for production
- `npm start` - run the production server after build
- `npm run lint` - run ESLint

---

## Architecture

This app follows a component-first architecture where UI components are separated from data-fetching logic.

- Page routes fetch data from service functions.
- `app/[locale]/students` and `app/[locale]/fees` render the respective management pages.
- CRUD forms and buttons are implemented inside dedicated components.
- Global UI state such as theme and toasts is handled centrally.

---

## Styling and UI

- Uses Tailwind CSS for styling and layout.
- `tw-animate-css` adds animation utilities.
- `shadcn` style UI primitives provide reusable components.
- `sonner` provides toast notifications and is mounted globally via a `Toaster` component.

---

## API Integration

The app integrates with a backend API using Axios.

- `services/student.service.ts` manages student endpoints.
- `services/fee.service.ts` manages fee endpoints.
- `lib/axios.ts` configures the Axios instance and intercepts errors.

Server actions in `actions/student-actions.ts` call service functions and revalidate page routes after mutation.

---

## Environment Variables

Create a `.env.local` file with the following variable:

```env
NEXT_PUBLIC_API_URL=https://your-api.example.com
```

If `NEXT_PUBLIC_API_URL` is not set, the app also falls back to `API_URL`.

---

## Notes

- The application uses localized routing under `app/[locale]`, so valid locale paths are required.
- Add a license file when publishing the repository publicly.
- For production deployment, ensure the backend API is configured and reachable.

---

## License

No license specified. Add one if you want to make this project open source.
