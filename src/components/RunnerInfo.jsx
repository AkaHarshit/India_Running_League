import { User, Trophy, Shield } from "lucide-react";
import { memo } from "react";

const tierColors = {
  RoadWarrior: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  TrailBlazer: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
  MarathonKing: "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
};

const RunnerInfo = memo(function RunnerInfo({ runner, challenge, tier }) {
  return (
    <div className="card animate-slide-up relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-accent-500" />
      <div className="flex items-start gap-4 pt-2">
        <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-md">
          <User className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white truncate">{runner}</h2>
          <div className="flex items-center gap-2 mt-1 text-gray-500 dark:text-gray-400">
            <Trophy className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-medium">{challenge}</span>
          </div>
          <div className="mt-3">
            <span className={`badge border ${tierColors[tier] || "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"}`}>
              <Shield className="w-3.5 h-3.5 mr-1.5" />
              {tier}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default RunnerInfo;
