import { useMemo, memo, useCallback } from "react";
import RunnerInfo from "../components/RunnerInfo";
import ProgressBar from "../components/ProgressBar";
import CircularProgress from "../components/CircularProgress";
import WeeklyActivity from "../components/WeeklyActivity";
import LeaderboardCard from "../components/LeaderboardCard";
import GoalSetter from "../components/GoalSetter";
import ErrorBoundary from "../components/ErrorBoundary";
import useAnimatedCounter from "../hooks/useAnimatedCounter";

/**
 * Dashboard page — main runner progress view.
 * Uses React.memo for performance optimization.
 */
const DashboardPage = memo(function DashboardPage({
  runnerData,
  weeklyActivity,
  defaultGoals,
}) {
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

  // Memoize transformed data
  const memoizedWeeklyData = useMemo(() => weeklyActivity, [weeklyActivity]);
  const memoizedGoals = useMemo(() => defaultGoals, [defaultGoals]);

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Section 1: Runner Info */}
      <section className="mb-6">
        <ErrorBoundary>
          <RunnerInfo runner={runner} challenge={challenge} tier={tier} />
        </ErrorBoundary>
      </section>

      {/* Section 2: Progress Visualization */}
      <section className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ErrorBoundary>
            <ProgressBar
              target={target_distance}
              completed={completed_distance}
              remaining={remaining_distance}
              percentage={progress_percentage}
            />
          </ErrorBoundary>
        </div>
        <div className="md:col-span-1">
          <ErrorBoundary>
            <CircularProgress percentage={progress_percentage} />
          </ErrorBoundary>
        </div>
      </section>

      {/* Section 3: Activity + Leaderboard */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ErrorBoundary>
          <WeeklyActivity data={memoizedWeeklyData} />
        </ErrorBoundary>
        <ErrorBoundary>
          <LeaderboardCard
            rank={rank}
            topRunnerDistance={top_runner_distance}
            distanceToNextRank={distance_to_next_rank}
          />
        </ErrorBoundary>
      </section>

      {/* Section 4: Goal Setter */}
      <section className="mb-6">
        <ErrorBoundary>
          <GoalSetter initialGoals={memoizedGoals} />
        </ErrorBoundary>
      </section>
    </main>
  );
});

export default DashboardPage;
