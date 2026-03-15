import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import Navbar from "./components/Navbar";
import ToastContainer from "./components/ToastContainer";
import DashboardSkeleton from "./components/Skeleton";
import ErrorBoundary from "./components/ErrorBoundary";
import { runnerData, weeklyActivity, leaderboardData, runHistory, defaultGoals } from "./data/mockData";

// Lazy load pages for code splitting
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const LeaderboardPage = lazy(() => import("./pages/LeaderboardPage"));
const HistoryPage = lazy(() => import("./pages/HistoryPage"));

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            <Navbar />

            <ErrorBoundary showDetails>
              <Suspense fallback={<DashboardSkeleton />}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <DashboardPage
                        runnerData={runnerData}
                        weeklyActivity={weeklyActivity}
                        defaultGoals={defaultGoals}
                      />
                    }
                  />
                  <Route
                    path="/leaderboard"
                    element={<LeaderboardPage data={leaderboardData} />}
                  />
                  <Route
                    path="/history"
                    element={<HistoryPage data={runHistory} />}
                  />
                </Routes>
              </Suspense>
            </ErrorBoundary>

            {/* Footer */}
            <footer className="text-center text-xs text-gray-400 dark:text-gray-600 py-6">
              <p>© 2026 India Running League • Runner Progress Dashboard</p>
            </footer>

            <ToastContainer />
          </div>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
