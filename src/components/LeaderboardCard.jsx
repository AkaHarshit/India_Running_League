import { Medal, TrendingUp, Zap } from "lucide-react";

export default function LeaderboardCard({ rank, topRunnerDistance, distanceToNextRank }) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Leaderboard Snapshot</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-xl border border-amber-200/50">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-sm">
            <Medal className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-500">Your Rank</p>
            <p className="text-2xl font-extrabold text-gray-900">#{rank}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-xl border border-primary-200/50">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-sm">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-500">Top Runner Distance</p>
            <p className="text-2xl font-extrabold text-gray-900">{topRunnerDistance} <span className="text-sm font-medium text-gray-400">KM</span></p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-accent-50 to-accent-100/50 rounded-xl border border-accent-200/50">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center shadow-sm">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-500">Distance to Next Rank</p>
            <p className="text-2xl font-extrabold text-gray-900">{distanceToNextRank} <span className="text-sm font-medium text-gray-400">KM</span></p>
          </div>
          <span className="text-xs font-semibold text-accent-600 bg-accent-100 px-2.5 py-1 rounded-full">Almost there!</span>
        </div>
      </div>
    </div>
  );
}
