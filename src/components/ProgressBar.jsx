import { MapPin, Target, CheckCircle } from "lucide-react";

export default function ProgressBar({
  target,
  completed,
  remaining,
  percentage,
}) {
  return (
    <div className="card animate-slide-up" style={{ animationDelay: "0.1s" }}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Distance Progress
      </h3>

      {/* Progress bar */}
      <div className="relative">
        <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 animate-progress-fill relative"
            style={{ "--progress-width": `${percentage}%` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse-slow" />
          </div>
        </div>

        {/* Percentage label */}
        <div
          className="absolute -top-1 transition-all duration-1000"
          style={{ left: `${Math.min(percentage, 92)}%` }}
        >
          <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full border border-primary-200">
            {percentage}%
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mt-6">
        <div className="text-center p-3 bg-gray-50 rounded-xl">
          <Target className="w-5 h-5 text-accent-500 mx-auto mb-1" />
          <p className="text-xs text-gray-500 font-medium">Target</p>
          <p className="text-lg font-bold text-gray-900">{target} KM</p>
        </div>
        <div className="text-center p-3 bg-primary-50 rounded-xl">
          <CheckCircle className="w-5 h-5 text-primary-500 mx-auto mb-1" />
          <p className="text-xs text-gray-500 font-medium">Completed</p>
          <p className="text-lg font-bold text-primary-700">{completed} KM</p>
        </div>
        <div className="text-center p-3 bg-amber-50 rounded-xl">
          <MapPin className="w-5 h-5 text-amber-500 mx-auto mb-1" />
          <p className="text-xs text-gray-500 font-medium">Remaining</p>
          <p className="text-lg font-bold text-amber-700">{remaining} KM</p>
        </div>
      </div>
    </div>
  );
}
