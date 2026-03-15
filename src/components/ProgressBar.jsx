export default function ProgressBar({ target, completed, remaining, percentage }) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Distance Progress</h3>
      <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-primary-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-sm text-gray-500 mt-2">{completed} / {target} KM ({percentage}%)</p>
    </div>
  );
}
