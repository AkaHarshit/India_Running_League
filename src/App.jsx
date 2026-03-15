import { Activity } from "lucide-react";
import RunnerInfo from "./components/RunnerInfo";
import ProgressBar from "./components/ProgressBar";
import CircularProgress from "./components/CircularProgress";
import WeeklyActivity from "./components/WeeklyActivity";
import LeaderboardCard from "./components/LeaderboardCard";
import { runnerData, weeklyActivity } from "./data/mockData";

function App() {
  const {
    runner,
    challenge,
    tier,
    target_distance,
    completed_distance,
    remaining_distance,
    progress_percentage,
    rank,
    top_runner_distance,
    distance_to_next_rank,
  } = runnerData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-sm">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-tight">
                India Running League
              </h1>
              <p className="text-xs text-gray-400 font-medium">
                Runner Dashboard
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-primary-600 bg-primary-50 px-3 py-1.5 rounded-full border border-primary-200">
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
            Season Active
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Section 1: Runner Info */}
        <section className="mb-6">
          <RunnerInfo runner={runner} challenge={challenge} tier={tier} />
        </section>

        {/* Section 2: Progress Visualization */}
        <section className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <ProgressBar
              target={target_distance}
              completed={completed_distance}
              remaining={remaining_distance}
              percentage={progress_percentage}
            />
          </div>
          <div className="md:col-span-1">
            <CircularProgress percentage={progress_percentage} />
          </div>
        </section>

        {/* Section 3 & 4: Activity + Leaderboard */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WeeklyActivity data={weeklyActivity} />
          <LeaderboardCard
            rank={rank}
            topRunnerDistance={top_runner_distance}
            distanceToNextRank={distance_to_next_rank}
          />
        </section>

        {/* Footer */}
        <footer className="mt-10 text-center text-xs text-gray-400 pb-6">
          <p>© 2026 India Running League • Runner Progress Dashboard</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
