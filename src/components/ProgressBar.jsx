export default function ProgressBar({ target, completed, remaining, percentage }) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Distance Progress</h3>
      <div className="relative">
        <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 animate-progress-fill relative"
            style={{ "--progress-width": `${percentage}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse-slow" />
          </div>
        </div>
        <div className="absolute -top-1" style={{ left: `${Math.min(percentage, 92)}%` }}>
          <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full border border-primary-200">
            {percentage}%
          </span>
        </div>
      </div>
    </div>
  );
}
