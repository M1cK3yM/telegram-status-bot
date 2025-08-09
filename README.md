# Telegram Status Bot + Mini App

A lightweight Telegram bot and accompanying Mini App built with Node.js, Express, and Vite (React + Tailwind), designed to collect short status updates from users and let others view them—like a **micro status board**.

---

## Features

* **Telegram Bot**

  * `/start` shows a welcome message and opens the Mini App.
  * `/latest` retrieves the last 3 public statuses.
  * `/mystatus` shows the last 3 personal statuses of the user.
* **Telegram Mini App**

  * Displays the user's first name (via `initData`).
  * Lets users type a short status and post it to the backend.
  * Supports light and dark mode with theme toggle.
* **Backend (Express)**

  * `POST /status` saves a user status, replies via the bot with confirmation (including timestamp).
  * `GET /latest` returns the last 3 public statuses.
  * `GET /mystatus/:userId` returns the most recent 3 statuses from that user.

---

## Demo

Try out the Telegram Status Bot by clicking here:

* 👉 [@micro_status_bot](https://t.me/micro_status_bot)

Certainly! To provide a direct link to your Telegram bot in your README, you can format it as follows:

---

## Project Structure (Monorepo with Workspaces)

```
/micro-status-board
├── package.json           # Root - orchestrates frontend/backend build
├── tsconfig.base.json
├── shared/                # Shared types (e.g., Status)
├── frontend/              # Vite React Mini App
└── backend/               # Express server + Telegram bot logic
```

---

## Getting Started

Copy this template to streamline your setup:

```bash
git clone https://github.com/YourUsername/telegram-status-bot.git
cd telegram-status-bot
npm install
```

### Development

Run both services locally with hot reloads:

```bash
npm run dev
```

### Building for Production

```bash
npm run build
npm run start
```

This builds the frontend into the backend’s `public/` directory so Express can serve it.

---

## Environment Variables (`.env`)

**Backend (`backend/.env`)**

```env
BOT_TOKEN=123456:ABC-DEF...
PORT=3000
FRONTEND_URL=http://<your-frontend-url>
```

**Frontend (`frontend/.env`)**

```env
VITE_ALLOWED_HOSTS=localhost,example.ngrok.io
VITE_BACKEND_URL=http://<your-backend-url>
```

* `VITE_`-prefixed vars are automatically exposed to the frontend.

---

## Dark / Light Theme Toggle

* Tailwind is configured with `darkMode: 'class'`.
* Theme preference is saved in `localStorage`.
* Switch between light and dark via a toggle—works perfectly in both desktop browsers and Telegram Web App.

Made with Hope and Tea.
