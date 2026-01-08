# pomobox

A minimal Pomodoro timer for focused work and study.

## Live Demo

https://pomobox.app

## Features

- **Pomodoro Timer** - Focus & Break sessions with auto-transition
- **Customizable Durations** - 15 / 25 / 45 / 60 minutes presets
- **Sound Alerts** - Alarm melodies and ambient sounds
- **Daily Goals** - Set and track your session targets
- **Statistics Dashboard** - Visualize your focus patterns with charts
- **Offline Support** - Works without internet (PWA)
- **Cloud Sync** - Optional account for cross-device sync
- **Dark Theme** - Eye-friendly dark UI

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: Zustand
- **Storage**: IndexedDB (local) + Supabase (cloud sync)
- **Charts**: Recharts
- **Testing**: Vitest + Playwright

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Seongyul-Lee/pomobox.git
cd pomobox

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open http://localhost:3000 in your browser.

### Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run TypeScript & ESLint checks |
| `pnpm test` | Run unit tests |
| `pnpm e2e` | Run E2E tests |

## Project Structure

```
pomobox/
├── app/                # Next.js App Router pages
├── components/         # React components
│   ├── ui/            # shadcn/ui base components
│   └── stats/         # Statistics charts
├── lib/               # Core logic
│   ├── state-machine.ts   # Timer state machine (SSOT)
│   └── storage/       # IndexedDB storage layer
└── public/            # Static assets (sounds, icons)
```

## License

MIT License with [Commons Clause](https://commonsclause.com/)

- Personal use, modification, study: Allowed
- Commercial use (selling, hosting as a service): Not allowed

See [LICENSE](./LICENSE) for details.
