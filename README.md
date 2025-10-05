# AltCare Frontend

A React + Vite + Tailwind CSS v4 single-page application (SPA) for the AltCare patient portal.  
It provides public marketing pages and a signed-in patient experience (dashboard, health records, appointments, secure messages, profile, activity log), talking to a REST API via Axios.

> **Tech stack:** React 19, Vite 7, React Router, Tailwind CSS v4 (via `@tailwindcss/vite`), Axios, ESLint + Husky.

---

## Table of Contents

- [Live & Screens](#live--screens)
- [Features](#features)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Routing](#routing)
- [API Client](#api-client)
- [Code Quality](#code-quality)
- [Deployment (GitHub Pages)](#deployment-github-pages)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Live & Screens

- **App title:** Altcare App
- **Favicon / brand:** `src/assets/Logo.png`

> If you deploy to GitHub Pages, the app is already configured to work under a repo path (see [Deployment](#deployment-github-pages)).

---

## Features

**Public:**

- Landing, About, Features, Contact
- Auth pages: Sign In, Sign Up, Forgot/Reset Password, Verify Email, Registration

**Patient Portal:**

- Dashboard (greeting, quick actions, recent activity)
- My Records (test results, medical history, prescriptions)
- Appointments (list, details)
- Secure Messages
- Profile
- Activity Log

**UX & Infra:**

- Global auth context with localStorage persistence
- Axios instance with environment-based `baseURL`
- Tailwind v4 (no config file needed)
- SPA 404 redirect for GitHub Pages
- ESLint + Husky pre-commit checks

---

## Project Structure

```
altcare-frontend/
├─ .env
├─ 404.html
├─ index.html
├─ vite.config.js
├─ eslint.config.js
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ index.css
│  ├─ assets/
│  ├─ layouts/
│  ├─ context/
│  ├─ utils/
│  ├─ components/
│  └─ patient/
└─ ...
```

---

## Requirements

- **Node.js** ≥ 18
- **Package manager:** npm
- **Backend API:** Running AltCare API

---

## Getting Started

```bash
npm install
npm run dev
```

Default URL: [http://localhost:5173](http://localhost:5173)

---

## Environment Variables

```
VITE_API_BASE_URL=https://altcare-backend.....
```

---

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

---

## Routing

- `/` → Landing
- `/about`, `/features`, `/contact`
- `/signin`, `/signup`, `/forgot-password`, `/reset-password`, `/verify-email`, `/registration`
- `/patient/dashboard`, `/patient/records`, `/patient/messages`, `/patient/profile`

---

## API Client

Axios instance (`src/utils/axiosConfig.js`):

```js
import axios from "axios";
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
export default apiClient;
```

---

## Code Quality

- **ESLint 9** configuration
- **Husky** pre-commit hooks
- **Tailwind CSS v4** setup

---

## Deployment (GitHub Pages)

1. Update `vite.config.js` base path if repo name differs.
2. Build and deploy:

```bash
npm run build
```

3. Upload `/dist` to GitHub Pages.

---

## Troubleshooting

- **Blank page:** Check `vite.config.js` base path.
- **API errors:** Verify `VITE_API_BASE_URL`.
- **Tailwind not applying:** Ensure `@import "tailwindcss";` exists in `index.css`.

---

## License

Proprietary — © AltCare. All rights reserved.
