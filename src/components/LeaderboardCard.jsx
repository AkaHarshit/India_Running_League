import { Medal, TrendingUp, Zap } from "lucide-react";
import { memo } from "react";

const LeaderboardCard = memo(function LeaderboardCard({ rank, topRunnerDistance, distanceToNextRank }) {
  return (
    <div className="card animate-slide-up relative overflow-hidden" style={{ animationDelay: "0.25s" }}>
      <div className="absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-br from-accent-100 to-primary-100 dark:from-accent-900/20 dark:to-primary-900/20 rounded-full opacity-50" />
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 relative z-10">Leaderboard Snapshot</h3>
      <div className="space-y-4 relative z-10">
        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-900/10 rounded-xl border border-amber-200/50 dark:border-amber-800/50">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-sm">
            <Medal className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Your Rank</p>
            <p className="text-2xl font-extrabold text-gray-900 dark:text-white">#{rank}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary-50 to-primary-100/50 dark:from-primary-900/20 dark:to-primary-900/10 rounded-xl border border-primary-200/50 dark:border-primary-800/50">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-sm">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Top Runner Distance</p>
            <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{topRunnerDistance} <span className="text-sm font-medium text-gray-400">KM</span></p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-accent-50 to-accent-100/50 dark:from-accent-900/20 dark:to-accent-900/10 rounded-xl border border-accent-200/50 dark:border-accent-800/50">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center shadow-sm">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Distance to Next Rank</p>
            <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{distanceToNextRank} <span className="text-sm font-medium text-gray-400">KM</span></p>
          </div>
          <span className="text-xs font-semibold text-accent-600 dark:text-accent-400 bg-accent-100 dark:bg-accent-900/30 px-2.5 py-1 rounded-full">Almost there!</span>
        </div>
      </div>
    </div>
  );
});

export default LeaderboardCard;
