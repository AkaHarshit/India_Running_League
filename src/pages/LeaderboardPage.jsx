import { useState, useMemo, useCallback, memo } from "react";
import { Search, ArrowUpDown, ChevronUp, ChevronDown, Filter, MapPin, Medal } from "lucide-react";
import useAnimatedCounter from "../hooks/useAnimatedCounter";

const tierColors = {
  RoadWarrior: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  TrailBlazer: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  MarathonKing: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
};

/**
 * Full leaderboard page with search, sort, filter, and animated rank highlighting.
 */
const LeaderboardPage = memo(function LeaderboardPage({ data }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("rank");
  const [sortDirection, setSortDirection] = useState("asc");
  const [tierFilter, setTierFilter] = useState("all");

  const { count: totalRunners } = useAnimatedCounter(data.length);
  const totalDistance = useMemo(() => data.reduce((sum, r) => sum + r.distance, 0), [data]);
  const { count: animatedTotalDist } = useAnimatedCounter(totalDistance);

  const handleSort = useCallback((field) => {
    setSortDirection((prev) => (sortField === field ? (prev === "asc" ? "desc" : "asc") : "asc"));
    setSortField(field);
  }, [sortField]);

  // Filter + Sort
  const filteredData = useMemo(() => {
    let result = [...data];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) => r.name.toLowerCase().includes(q) || r.city.toLowerCase().includes(q)
      );
    }

    // Tier filter
    if (tierFilter !== "all") {
      result = result.filter((r) => r.tier === tierFilter);
    }

    // Sort
    result.sort((a, b) => {
      let cmp = 0;
      if (sortField === "rank") cmp = a.rank - b.rank;
      else if (sortField === "distance") cmp = a.distance - b.distance;
      else if (sortField === "name") cmp = a.name.localeCompare(b.name);
      return sortDirection === "desc" ? -cmp : cmp;
    });

    return result;
  }, [data, searchQuery, tierFilter, sortField, sortDirection]);

  const SortIcon = useCallback(
    ({ field }) => {
      if (sortField !== field) return <ArrowUpDown className="w-3.5 h-3.5 text-gray-300" />;
      return sortDirection === "asc" ? (
        <ChevronUp className="w-3.5 h-3.5 text-primary-500" />
      ) : (
        <ChevronDown className="w-3.5 h-3.5 text-primary-500" />
      );
    },
    [sortField, sortDirection]
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 animate-fade-in">
      {/* Header stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="card text-center py-4">
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{totalRunners}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">Total Runners</p>
        </div>
        <div className="card text-center py-4">
          <p className="text-2xl font-extrabold text-primary-600 dark:text-primary-400">
            {animatedTotalDist} <span className="text-sm font-medium text-gray-400">KM</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">Combined Distance</p>
        </div>
        <div className="card text-center py-4 hidden sm:block">
          <p className="text-2xl font-extrabold text-accent-600 dark:text-accent-400">IRL S1</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">Current Season</p>
        </div>
      </div>

      {/* Controls */}
      <div className="card mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            />
          </div>

          {/* Tier filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="px-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            >
              <option value="all">All Tiers</option>
              <option value="MarathonKing">MarathonKing</option>
              <option value="TrailBlazer">TrailBlazer</option>
              <option value="RoadWarrior">RoadWarrior</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th
                  className="px-4 py-3 text-left font-semibold text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors"
                  onClick={() => handleSort("rank")}
                >
                  <span className="flex items-center gap-1">
                    Rank <SortIcon field="rank" />
                  </span>
                </th>
                <th
                  className="px-4 py-3 text-left font-semibold text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors"
                  onClick={() => handleSort("name")}
                >
                  <span className="flex items-center gap-1">
                    Runner <SortIcon field="name" />
                  </span>
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500 dark:text-gray-400 hidden sm:table-cell">
                  City
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500 dark:text-gray-400">
                  Tier
                </th>
                <th
                  className="px-4 py-3 text-right font-semibold text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors"
                  onClick={() => handleSort("distance")}
                >
                  <span className="flex items-center justify-end gap-1">
                    Distance <SortIcon field="distance" />
                  </span>
                </th>
                <th className="px-4 py-3 text-center font-semibold text-gray-500 dark:text-gray-400">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((runner) => (
                <tr
                  key={runner.rank}
                  className={`border-b border-gray-50 dark:border-gray-800/50 transition-colors ${
                    runner.isCurrentUser
                      ? "bg-primary-50/50 dark:bg-primary-900/20"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {runner.rank <= 3 ? (
                        <Medal className={`w-4 h-4 ${runner.rank === 1 ? "text-amber-500" : runner.rank === 2 ? "text-gray-400" : "text-amber-700"}`} />
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500 font-medium">
                          #{runner.rank}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-medium ${runner.isCurrentUser ? "text-primary-700 dark:text-primary-300" : "text-gray-900 dark:text-white"}`}>
                      {runner.name}
                      {runner.isCurrentUser && (
                        <span className="ml-2 text-xs bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 px-1.5 py-0.5 rounded-full">
                          You
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400 hidden sm:table-cell">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {runner.city}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${tierColors[runner.tier]}`}>
                      {runner.tier}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-gray-900 dark:text-white">
                    {runner.distance} KM
                  </td>
                  <td className="px-4 py-3 text-center">
                    {runner.change > 0 && (
                      <span className="text-xs text-primary-600 dark:text-primary-400 font-semibold flex items-center justify-center gap-0.5">
                        <ChevronUp className="w-3.5 h-3.5" /> {runner.change}
                      </span>
                    )}
                    {runner.change < 0 && (
                      <span className="text-xs text-red-500 font-semibold flex items-center justify-center gap-0.5">
                        <ChevronDown className="w-3.5 h-3.5" /> {Math.abs(runner.change)}
                      </span>
                    )}
                    {runner.change === 0 && (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-400 dark:text-gray-500">
                    No runners found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-4">
        Showing {filteredData.length} of {data.length} runners
      </p>
    </div>
  );
});

export default LeaderboardPage;
