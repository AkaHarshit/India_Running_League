import { memo } from "react";

const CircularProgress = memo(function CircularProgress({ percentage }) {
  const size = 160;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="card animate-slide-up flex flex-col items-center justify-center" style={{ animationDelay: "0.15s" }}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Overall Progress</h3>
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={strokeWidth}
            className="text-gray-100 dark:text-gray-800" />
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="url(#progressGradient)" strokeWidth={strokeWidth}
            strokeLinecap="round" strokeDasharray={circumference} className="circular-progress-ring"
            style={{ "--circumference": circumference, "--dash-offset": dashOffset, strokeDashoffset: circumference }} />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-gray-900 dark:text-white">{percentage}%</span>
          <span className="text-xs font-medium text-gray-400 dark:text-gray-500 mt-0.5">Completed</span>
        </div>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">Keep pushing! You're doing great 🏃‍♂️</p>
    </div>
  );
});

export default CircularProgress;
