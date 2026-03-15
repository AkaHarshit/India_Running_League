import { Activity } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-sm">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-tight">India Running League</h1>
              <p className="text-xs text-gray-400 font-medium">Runner Dashboard</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-primary-600 bg-primary-50 px-3 py-1.5 rounded-full border border-primary-200">
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
            Season Active
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <p className="text-gray-500">Dashboard sections coming soon...</p>
      </main>
    </div>
  );
}

export default App;
