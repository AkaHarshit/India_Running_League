# 🏃 Runner Progress Dashboard

A professional, mobile-responsive fitness dashboard for the **India Running League (IRL)** challenge. Built with React + Vite + Tailwind CSS + Recharts. Features multi-page routing, dark mode, animated counters, and advanced state management.

## 🖼️ Screenshots

> Add screenshots here after running the project.
>
> - Dashboard view (light & dark mode)
> - Leaderboard page with search/filter
> - Run history with trend chart

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite 8** | Build tool & dev server |
| **Tailwind CSS v3** | Utility-first styling |
| **React Router v7** | Client-side routing |
| **Recharts** | Chart visualization |
| **Lucide React** | Icon library |

## 📁 Folder Structure

```
runner-progress-dashboard/
├── src/
│   ├── components/
│   │   ├── RunnerInfo.jsx          # Runner details card
│   │   ├── ProgressBar.jsx         # Linear progress bar with animated stats
│   │   ├── CircularProgress.jsx    # SVG circular progress ring
│   │   ├── WeeklyActivity.jsx      # Recharts bar chart
│   │   ├── LeaderboardCard.jsx     # Leaderboard snapshot card
│   │   ├── GoalSetter.jsx          # Goal form with validation
│   │   ├── Navbar.jsx              # Responsive nav with mobile menu
│   │   ├── Skeleton.jsx            # Loading skeleton placeholders
│   │   ├── ErrorBoundary.jsx       # Error boundary with retry
│   │   └── ToastContainer.jsx      # Toast notification renderer
│   ├── context/
│   │   ├── ThemeContext.jsx         # Dark mode Context + localStorage
│   │   └── ToastContext.jsx         # Toast notification state (useReducer)
│   ├── hooks/
│   │   ├── useLocalStorage.js       # Persistent state with cross-tab sync
│   │   └── useAnimatedCounter.js    # Count-up animation via rAF
│   ├── pages/
│   │   ├── DashboardPage.jsx        # Main dashboard view
│   │   ├── LeaderboardPage.jsx      # Full leaderboard with sort/filter
│   │   └── HistoryPage.jsx          # 30-day trend chart
│   ├── data/
│   │   └── mockData.js              # Mock data + computed fields
│   ├── App.jsx                      # Router + providers + layout
│   ├── main.jsx                     # React entry point
│   └── index.css                    # Tailwind + custom animations
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── package.json
└── README.md
```

## 🚀 How to Run

```bash
# Clone the repository
git clone https://github.com/AkaHarshit/India_Running_League.git
cd India_Running_League

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📊 Features

### Core Dashboard
- **Runner Info Card** — Name, challenge, and tier badge with color mapping
- **Linear Progress Bar** — Animated gradient bar with shimmer + stat cards
- **Circular Progress** — SVG ring with gradient stroke animation
- **Weekly Activity Chart** — Recharts bar chart with rest day differentiation
- **Leaderboard Snapshot** — Rank, top runner, distance to next rank

### Advanced Features
- **🌙 Dark Mode** — Toggle via ThemeContext + localStorage persistence
- **🧭 Multi-Page Routing** — Dashboard, Leaderboard, History (React Router)
- **📊 Run History** — 30-day trend with area/line chart toggle + date range filter
- **🏆 Full Leaderboard** — 20 runners with search, sort (rank/name/distance), tier filter
- **🎯 Goal Setter** — Form with validation, add/remove goals, toast feedback
- **🔔 Toast Notifications** — Custom notification system (useReducer)
- **⏳ Loading Skeletons** — Placeholder UI during page transitions (Suspense)
- **🛡️ Error Boundaries** — Graceful error handling with retry
- **⚡ Performance** — React.memo, useMemo, useCallback, lazy loading
- **📱 Responsive Navigation** — Mobile hamburger menu
- **🎬 Animated Counters** — Count-up numbers via requestAnimationFrame
- **🔗 Code Splitting** — Lazy-loaded page chunks

## 📝 Design Decisions

### Component Structure
Modular architecture with three layers: **pages** (route-level), **components** (reusable UI), and **data** (mock layer). Each component is wrapped with `React.memo` and receives data via props.

### State Management
- **ThemeContext** (Context API) — dark mode preference
- **ToastContext** (useReducer) — notification queue
- **useLocalStorage** (custom hook) — persistent user preferences with cross-tab sync
- **Component-level state** — form data, filters, sorting in GoalSetter and LeaderboardPage

### Data Flow
All data derives from `mockData.js`. Computed fields (remaining distance, progress %) are calculated at the data layer. Pages receive data as props from `App.jsx`, avoiding prop drilling for global concerns via Context API.

### Visualization Choices
- **Dual progress** (linear bar + circular ring) — intuitive distance tracking + dashboard metric
- **Recharts BarChart** — daily activity comparison
- **Area/Line chart toggle** — 30-day trend with average reference line
- **Sortable table** — full leaderboard with rank highlighting

### Performance Optimizations
- **React.lazy** + **Suspense** for route-based code splitting
- **React.memo** on all leaf components
- **useMemo** for filtered/sorted data
- **useCallback** for event handlers
- **requestAnimationFrame** for animated counters (60fps)

