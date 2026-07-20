# MCAN Southwest — Web Portal

The official web platform for the **Muslim Corpers' Association of Nigeria (MCAN) Southwest Zone**.  
Connecting, informing, and serving Muslim corps members across Lagos, Ogun, Oyo, Osun, Ondo, and Ekiti.

## Tech Stack

| Layer       | Technology |
|-------------|------------|
| Framework   | React 19 + TypeScript |
| Build tool  | Vite 8 |
| Styling     | Tailwind CSS 4 |
| Routing     | React Router 7 |
| Data fetching | TanStack React Query 5 |
| State (auth) | Zustand |
| API client  | Native `fetch` with 401 auto-refresh |

## Features

- **Public pages** — Home, About, Events, News, Gallery, Donate, Lodges, Contact, FAQ
- **Authentication** — Register/Login with access + refresh token flow
- **Membership management** — registration, profiles, status tracking
- **Events** — browse, search, filter by category (upcoming/past)
- **News** — announcements, press releases, updates
- **Digital ID** — request and manage member identity cards
- **Donations & Lodges** — support and accommodation info
- **Admin dashboard** — manage members, events, news, digital IDs, messages, web content
- **Responsive design** — mobile-first Tailwind layout

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/bigphysiology-coder/sw-mcan.git
cd sw-mcan/client

# Install dependencies
npm install
```

### Environment Variables

Copy the example env file and adjust as needed:

```bash
cp .env.example .env
```

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | *(empty — uses Vite proxy)* |
| `VITE_APP_NAME` | Application name | MCAN Southwest |

> **Development**: Leave `VITE_API_URL` empty — the Vite dev server proxies `/api` requests to the backend.
>
> **Production**: Set `VITE_API_URL=https://your-backend.com` and ensure your server allows your production origin via CORS.

### Development

```bash
npm run dev
```

Opens at `http://localhost:5174`. API calls to `/api/*` are proxied to `https://mcan-backend.onrender.com`.

### Build

```bash
npm run build
```

Output goes to `client/dist/`. To preview the production build:

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```
client/
├── public/                  # Static assets
├── src/
│   ├── api/                 # HTTP client + endpoint functions
│   ├── components/          # Shared UI components
│   ├── constants/           # App-wide constants
│   ├── context/             # React contexts (Auth)
│   ├── features/           # Feature modules (auth, events, news, etc.)
│   │   └── */{components,hooks,services,types}/
│   ├── hooks/               # React Query hooks
│   ├── pages/               # Route-level page components
│   │   ├── admin/           # Admin panel pages
│   │   └── public/          # Public-facing pages
│   ├── router/              # Route definitions
│   ├── services/            # Legacy service exports
│   ├── store/               # Zustand stores
│   ├── styles/              # Global styles
│   ├── types/               # Shared TypeScript types
│   └── utils/               # Utility functions
├── .env.example
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## License

MIT
