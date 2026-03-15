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
  distance_to_next_rank: 3, // mock calculation
};

export default runnerData;
