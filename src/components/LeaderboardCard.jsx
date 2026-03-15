import { Medal } from "lucide-react";

export default function LeaderboardCard({ rank, topRunnerDistance, distanceToNextRank }) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Leaderboard Snapshot</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-xl border border-amber-200/50">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-sm">
            <Medal className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">Your Rank</p>
            <p className="text-2xl font-extrabold text-gray-900">#{rank}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
