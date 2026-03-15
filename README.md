# 🏃 Runner Progress Dashboard

A clean, modern fitness dashboard UI that visualizes a runner's progress in the **India Running League (IRL)** challenge. Built as a single-page React application with responsive design and smooth animations.

## 🖼️ Screenshots

> Add screenshots here after running the project.
>
> - Full dashboard view
> - Mobile responsive view

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React** | UI framework |
| **Vite** | Build tool & dev server |
| **Tailwind CSS v3** | Utility-first styling |
| **Recharts** | Chart visualization |
| **Lucide React** | Icon library |

## 📁 Folder Structure

```
runner-progress-dashboard/
├── src/
│   ├── components/
│   │   ├── RunnerInfo.jsx          # Runner details card
│   │   ├── ProgressBar.jsx         # Linear progress bar with stats
│   │   ├── CircularProgress.jsx    # SVG circular progress ring
│   │   ├── WeeklyActivity.jsx      # Recharts bar chart
│   │   └── LeaderboardCard.jsx     # Leaderboard snapshot card
│   ├── data/
│   │   └── mockData.js             # Static mock data + computed fields
│   ├── App.jsx                     # Main dashboard layout
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Tailwind imports + custom animations
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── package.json
└── README.md
```

## 🚀 How to Run

```bash
# Clone the repository
git clone <repo-url>
cd runner-progress-dashboard

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📊 Features

- **Runner Info Card** — Name, challenge, and tier badge
- **Linear Progress Bar** — Animated gradient bar with target/completed/remaining stats
- **Circular Progress** — SVG ring with animated stroke and percentage display
- **Weekly Activity Chart** — Recharts bar chart with rest day differentiation
- **Leaderboard Snapshot** — Rank, top runner distance, distance to next rank
- **Responsive Design** — Works on desktop, tablet, and mobile
- **Smooth Animations** — CSS transitions, keyframe animations, hover effects

## 📝 Design Decisions

### Component Structure
The app follows a modular component architecture. Each dashboard section is its own isolated component receiving data via props, making the code easy to read, test, and extend. `App.jsx` acts as the layout orchestrator.

### Data Flow
All data flows from a single `mockData.js` file. Computed fields (remaining distance, progress percentage) are calculated once at the data layer, not inside components. This keeps components pure and focused on rendering.

### Visualization Choices
- **Linear progress bar** gives an intuitive at-a-glance sense of completion
- **Circular progress** provides a more engaging, dashboard-style metric
- **Recharts BarChart** was chosen for the weekly activity because bar charts are the most natural way to compare discrete daily values
- Rest days are visually distinguished with grey bars and a custom tooltip

### Styling
Tailwind CSS v3 with a custom green/blue fitness theme ensures visual consistency. Cards use subtle shadows and rounded corners for a modern feel. Animations are CSS-only (no JS libraries) to keep the bundle small.

## 📄 License

MIT
