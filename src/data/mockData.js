// Mock data for the Runner Progress Dashboard
const mockData = {
  runner: "Rahul Sharma",
  challenge: "IRL Season 1",
  tier: "RoadWarrior",
  target_distance: 100,
  completed_distance: 62,
  weekly_runs: [5, 8, 0, 6, 7],
  rank: 18,
  top_runner_distance: 124,
};

// Computed fields
export const runnerData = {
  ...mockData,
  remaining_distance: mockData.target_distance - mockData.completed_distance,
  progress_percentage: Math.round(
    (mockData.completed_distance / mockData.target_distance) * 100
  ),
  distance_to_next_rank: 3,
};

// Weekly activity with day labels
export const weeklyActivity = [
  { day: "Mon", distance: mockData.weekly_runs[0] },
  { day: "Tue", distance: mockData.weekly_runs[1] },
  { day: "Wed", distance: mockData.weekly_runs[2], isRest: true },
  { day: "Thu", distance: mockData.weekly_runs[3] },
  { day: "Fri", distance: mockData.weekly_runs[4] },
];

// Extended leaderboard data for full leaderboard page
export const leaderboardData = [
  { rank: 1, name: "Vikram Patel", distance: 124, tier: "MarathonKing", city: "Mumbai", change: 0 },
  { rank: 2, name: "Priya Nair", distance: 118, tier: "MarathonKing", city: "Bangalore", change: 1 },
  { rank: 3, name: "Arjun Mehta", distance: 112, tier: "MarathonKing", city: "Delhi", change: -1 },
  { rank: 4, name: "Sneha Reddy", distance: 105, tier: "TrailBlazer", city: "Hyderabad", change: 2 },
  { rank: 5, name: "Karan Singh", distance: 101, tier: "TrailBlazer", city: "Pune", change: 0 },
  { rank: 6, name: "Anita Desai", distance: 98, tier: "TrailBlazer", city: "Chennai", change: -2 },
  { rank: 7, name: "Rohit Gupta", distance: 95, tier: "TrailBlazer", city: "Kolkata", change: 1 },
  { rank: 8, name: "Meera Joshi", distance: 91, tier: "RoadWarrior", city: "Pune", change: 0 },
  { rank: 9, name: "Amit Kumar", distance: 88, tier: "RoadWarrior", city: "Delhi", change: 3 },
  { rank: 10, name: "Divya Sharma", distance: 85, tier: "RoadWarrior", city: "Jaipur", change: -1 },
  { rank: 11, name: "Nikhil Verma", distance: 82, tier: "RoadWarrior", city: "Lucknow", change: 0 },
  { rank: 12, name: "Ritu Agarwal", distance: 79, tier: "RoadWarrior", city: "Ahmedabad", change: 2 },
  { rank: 13, name: "Suresh Babu", distance: 76, tier: "RoadWarrior", city: "Chennai", change: -1 },
  { rank: 14, name: "Pooja Menon", distance: 73, tier: "RoadWarrior", city: "Kochi", change: 1 },
  { rank: 15, name: "Deepak Chauhan", distance: 70, tier: "RoadWarrior", city: "Chandigarh", change: 0 },
  { rank: 16, name: "Kavita Rao", distance: 67, tier: "RoadWarrior", city: "Bangalore", change: -2 },
  { rank: 17, name: "Manish Tiwari", distance: 65, tier: "RoadWarrior", city: "Bhopal", change: 1 },
  { rank: 18, name: "Rahul Sharma", distance: 62, tier: "RoadWarrior", city: "Mumbai", change: 0, isCurrentUser: true },
  { rank: 19, name: "Asha Pillai", distance: 59, tier: "RoadWarrior", city: "Trivandrum", change: -1 },
  { rank: 20, name: "Raj Malhotra", distance: 55, tier: "RoadWarrior", city: "Delhi", change: 0 },
];

// 30-day run history for trend chart
export const runHistory = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const date = new Date(2026, 2, day); // March 2026
  const isRest = date.getDay() === 0 || date.getDay() === 3; // Sun & Wed rest
  const base = isRest ? 0 : 3 + Math.random() * 8;
  return {
    day,
    date: date.toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
    distance: Math.round(base * 10) / 10,
    isRest,
  };
});

// Goals data
export const defaultGoals = [
  { id: 1, title: "Complete 100 KM", target: 100, current: 62, unit: "KM", deadline: "2026-04-30" },
  { id: 2, title: "Run 5 days/week", target: 5, current: 4, unit: "days", deadline: "2026-03-22" },
  { id: 3, title: "Maintain 6 min/km pace", target: 6, current: 6.2, unit: "min/km", deadline: "2026-04-15" },
];

export default runnerData;
