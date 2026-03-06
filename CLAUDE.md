# CLAUDE.md

## Project Overview

`messenger-front` is the frontend of a simple messenger application — a pet project built with React + TypeScript. It supports basic messenger features: authorization, chat creation, joining chats, and messaging.

The backend is a separate repository ([andkuzm/messenger](https://github.com/andkuzm/messenger)) and must be running for the frontend to function.

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Start development server (Vite)
npm run build      # Type-check + build for production
npm run lint       # Run ESLint
npm run preview    # Preview production build
```

## Environment

The only environment variable is `VITE_API_URL` in `.env`:

```
VITE_API_URL=http://localhost:8080
```

Change this if the backend runs on a different host or port.

## Tech Stack

- **React 19** with **TypeScript** (strict mode)
- **Vite** — build tool and dev server
- **Chakra UI 3** + **Tailwind CSS 4** — UI components and styling
- **Redux Toolkit** — global auth state (token, username, userId)
- **TanStack React Query** — server state, caching, and pagination
- **React Router v7** — client-side routing
- **Axios** — HTTP client with JWT interceptor
- **TanStack Virtual** — virtualized message list for performance

## Architecture

Feature-based modular structure:

```
src/
  app/           # Entry point, root component, router setup
  features/      # Feature modules (authorization, chat, message, side-bar)
    <feature>/
      components/
  hooks/         # Custom hooks wrapping React Query (useChat, useMessage, useUser)
  stores/        # Redux store and auth slice
  types/         # Shared TypeScript types (Chat, Message, User)
  lib/           # Utilities: Axios instance (api.ts), Chakra theme (customSystem.ts)
  components/    # Shared UI components and Chakra UI exports
```

## Import Rules (ESLint enforced)

Features must not import from other features — each feature is isolated. Shared code (`components/`, `hooks/`, `lib/`, `types/`, `utils/`) cannot import from features or the app layer.

## State & Data Flow

- **Auth state** (token, userId, username) lives in Redux (`src/stores/auth.ts`)
- **Server data** (chats, messages, users) is managed by React Query via custom hooks
- The Axios instance in `src/lib/api.ts` automatically attaches the JWT bearer token from Redux on every request
- Messages use infinite query pagination — older messages load on scroll up
- The chat view uses virtual scrolling and sticks to the bottom on new messages

## TypeScript

- Strict mode enabled
- Path alias `@/` maps to `src/`
- All shared entity types are in `src/types/`

## Code Style

- Prettier with default settings (`.prettierrc` is empty)
- ESLint with TypeScript, React Hooks, and React Refresh rules
- No cross-feature imports (enforced via `eslint-plugin-import`)
