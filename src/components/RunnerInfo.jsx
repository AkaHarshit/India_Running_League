export default function RunnerInfo({ runner, challenge, tier }) {
  return (
    <div className="card">
      <h2 className="text-xl font-bold text-gray-900">{runner}</h2>
      <p className="text-sm text-gray-500 mt-1">{challenge}</p>
      <span className="badge bg-gray-100 text-gray-800 mt-3">{tier}</span>
    </div>
  );
}
