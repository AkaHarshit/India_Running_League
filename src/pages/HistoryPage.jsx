import { useState, useMemo, memo } from "react";
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";
import { Calendar, TrendingUp, Flame, Moon } from "lucide-react";
import useAnimatedCounter from "../hooks/useAnimatedCounter";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const val = payload[0].value;
    return (
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">{label}</p>
        <p className="text-sm text-primary-600 dark:text-primary-400 font-bold">
          {val === 0 ? "Rest Day 😴" : `${val} KM`}
        </p>
      </div>
    );
  }
  return null;
};

/**
 * Run history page with 30-day trend chart, stats summary, and chart type toggle.
 */
const HistoryPage = memo(function HistoryPage({ data }) {
  const [chartType, setChartType] = useState("area");
  const [dateRange, setDateRange] = useState("30");

  const displayData = useMemo(() => {
    const days = parseInt(dateRange);
    return data.slice(-days);
  }, [data, dateRange]);

  const stats = useMemo(() => {
    const activeDays = displayData.filter((d) => !d.isRest);
    const totalDist = activeDays.reduce((sum, d) => sum + d.distance, 0);
    const avgDist = activeDays.length > 0 ? totalDist / activeDays.length : 0;
    const maxDist = activeDays.length > 0 ? Math.max(...activeDays.map((d) => d.distance)) : 0;
    const streak = (() => {
      let count = 0;
      for (let i = displayData.length - 1; i >= 0; i--) {
        if (displayData[i].isRest) break;
        count++;
      }
      return count;
    })();
    return {
      totalDist: Math.round(totalDist * 10) / 10,
      avgDist: Math.round(avgDist * 10) / 10,
      maxDist: Math.round(maxDist * 10) / 10,
      activeDays: activeDays.length,
      restDays: displayData.length - activeDays.length,
      streak,
    };
  }, [displayData]);

  const { count: animatedTotal } = useAnimatedCounter(Math.round(stats.totalDist));
  const { count: animatedStreak } = useAnimatedCounter(stats.streak);
  const { count: animatedActive } = useAnimatedCounter(stats.activeDays);

  const avgLine = stats.avgDist;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="card text-center py-4">
          <TrendingUp className="w-5 h-5 text-primary-500 mx-auto mb-1" />
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{animatedTotal}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total KM</p>
        </div>
        <div className="card text-center py-4">
          <Flame className="w-5 h-5 text-amber-500 mx-auto mb-1" />
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{animatedStreak}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Day Streak</p>
        </div>
        <div className="card text-center py-4">
          <Calendar className="w-5 h-5 text-accent-500 mx-auto mb-1" />
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{animatedActive}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Active Days</p>
        </div>
        <div className="card text-center py-4">
          <Moon className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{stats.restDays}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Rest Days</p>
        </div>
      </div>

      {/* Chart */}
      <div className="card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Run History
          </h3>
          <div className="flex items-center gap-2">
            {/* Date range */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="7">Last 7 days</option>
              <option value="14">Last 14 days</option>
              <option value="30">Last 30 days</option>
            </select>

            {/* Chart type toggle */}
            <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setChartType("area")}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  chartType === "area"
                    ? "bg-primary-500 text-white"
                    : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100"
                }`}
              >
                Area
              </button>
              <button
                onClick={() => setChartType("line")}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  chartType === "line"
                    ? "bg-primary-500 text-white"
                    : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100"
                }`}
              >
                Line
              </button>
            </div>
          </div>
        </div>

        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "area" ? (
              <AreaChart data={displayData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorDist" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 11 }} interval="preserveStartEnd" />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} unit=" km" />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={avgLine} stroke="#3b82f6" strokeDasharray="5 5" strokeWidth={1} label={{ value: `Avg: ${avgLine} km`, position: "top", fill: "#3b82f6", fontSize: 11 }} />
                <Area type="monotone" dataKey="distance" stroke="#10b981" fillOpacity={1} fill="url(#colorDist)" strokeWidth={2} dot={false} activeDot={{ r: 5, fill: "#10b981" }} />
              </AreaChart>
            ) : (
              <LineChart data={displayData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 11 }} interval="preserveStartEnd" />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} unit=" km" />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={avgLine} stroke="#3b82f6" strokeDasharray="5 5" strokeWidth={1} label={{ value: `Avg: ${avgLine} km`, position: "top", fill: "#3b82f6", fontSize: 11 }} />
                <Line type="monotone" dataKey="distance" stroke="#10b981" strokeWidth={2} dot={{ r: 3, fill: "#10b981" }} activeDot={{ r: 6, fill: "#10b981" }} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Summary */}
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span>
            Best day: <strong className="text-gray-900 dark:text-white">{stats.maxDist} KM</strong>
          </span>
          <span>
            Avg per active day: <strong className="text-gray-900 dark:text-white">{stats.avgDist} KM</strong>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-0.5 bg-blue-500 inline-block" /> Average line
          </span>
        </div>
      </div>
    </div>
  );
});

export default HistoryPage;
