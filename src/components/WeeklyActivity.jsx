import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

export default function WeeklyActivity({ data }) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity</h3>
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 13 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} unit=" km" />
            <Bar dataKey="distance" fill="#10b981" radius={[8, 8, 0, 0]} maxBarSize={45} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
