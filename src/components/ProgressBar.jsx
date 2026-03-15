import { MapPin, Target, CheckCircle } from "lucide-react";
import { memo } from "react";
import useAnimatedCounter from "../hooks/useAnimatedCounter";

const ProgressBar = memo(function ProgressBar({ target, completed, remaining, percentage }) {
  const { count: animatedCompleted } = useAnimatedCounter(completed);
  const { count: animatedRemaining } = useAnimatedCounter(remaining);

  return (
    <div className="card animate-slide-up" style={{ animationDelay: "0.1s" }}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Distance Progress</h3>

      <div className="relative">
        <div className="w-full h-4 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 animate-progress-fill relative"
            style={{ "--progress-width": `${percentage}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse-slow" />
          </div>
        </div>
        <div className="absolute -top-1 transition-all duration-1000" style={{ left: `${Math.min(percentage, 92)}%` }}>
          <span className="text-xs font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/50 px-2 py-0.5 rounded-full border border-primary-200 dark:border-primary-800">
            {percentage}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-6">
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <Target className="w-5 h-5 text-accent-500 mx-auto mb-1" />
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Target</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">{target} KM</p>
        </div>
        <div className="text-center p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
          <CheckCircle className="w-5 h-5 text-primary-500 mx-auto mb-1" />
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Completed</p>
          <p className="text-lg font-bold text-primary-700 dark:text-primary-400">{animatedCompleted} KM</p>
        </div>
        <div className="text-center p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
          <MapPin className="w-5 h-5 text-amber-500 mx-auto mb-1" />
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Remaining</p>
          <p className="text-lg font-bold text-amber-700 dark:text-amber-400">{animatedRemaining} KM</p>
        </div>
      </div>
    </div>
  );
});

export default ProgressBar;
