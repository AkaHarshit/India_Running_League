import { useState, useCallback, memo } from "react";
import { Plus, Target, Calendar, Trash2, CheckCircle } from "lucide-react";
import { useToast } from "../context/ToastContext";

/**
 * Goal setter form with validation and toast notifications.
 * Allows adding and removing personal running goals.
 */
const GoalSetter = memo(function GoalSetter({ initialGoals }) {
  const [goals, setGoals] = useState(initialGoals);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", target: "", unit: "KM", deadline: "" });
  const [errors, setErrors] = useState({});
  const { addToast } = useToast();

  const validate = useCallback(() => {
    const errs = {};
    if (!formData.title.trim()) errs.title = "Goal title is required";
    if (!formData.target || Number(formData.target) <= 0) errs.target = "Target must be positive";
    if (!formData.deadline) errs.deadline = "Deadline is required";
    else if (new Date(formData.deadline) < new Date()) errs.deadline = "Deadline must be in the future";
    return errs;
  }, [formData]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const errs = validate();
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        addToast("Please fix the errors in the form", "error");
        return;
      }
      const newGoal = {
        id: Date.now(),
        title: formData.title.trim(),
        target: Number(formData.target),
        current: 0,
        unit: formData.unit,
        deadline: formData.deadline,
      };
      setGoals((prev) => [...prev, newGoal]);
      setFormData({ title: "", target: "", unit: "KM", deadline: "" });
      setErrors({});
      setShowForm(false);
      addToast(`Goal "${newGoal.title}" added!`, "success");
    },
    [formData, validate, addToast]
  );

  const removeGoal = useCallback(
    (id) => {
      setGoals((prev) => prev.filter((g) => g.id !== id));
      addToast("Goal removed", "info");
    },
    [addToast]
  );

  const handleChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  return (
    <div className="card animate-slide-up" style={{ animationDelay: "0.3s" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          My Goals
        </h3>
        <button
          onClick={() => setShowForm((p) => !p)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Goal
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl space-y-3 animate-fade-in">
          <div>
            <input
              type="text"
              placeholder="Goal title (e.g., Run 50 KM this month)"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className={`w-full px-3 py-2 text-sm rounded-lg border ${
                errors.title ? "border-red-300 bg-red-50 dark:bg-red-900/20" : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              } text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors`}
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <input
                type="number"
                placeholder="Target"
                value={formData.target}
                onChange={(e) => handleChange("target", e.target.value)}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${
                  errors.target ? "border-red-300 bg-red-50 dark:bg-red-900/20" : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                } text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors`}
              />
              {errors.target && <p className="text-xs text-red-500 mt-1">{errors.target}</p>}
            </div>
            <select
              value={formData.unit}
              onChange={(e) => handleChange("unit", e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            >
              <option value="KM">KM</option>
              <option value="days">Days</option>
              <option value="min/km">min/km</option>
            </select>
            <div>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => handleChange("deadline", e.target.value)}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${
                  errors.deadline ? "border-red-300 bg-red-50 dark:bg-red-900/20" : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                } text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors`}
              />
              {errors.deadline && <p className="text-xs text-red-500 mt-1">{errors.deadline}</p>}
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => { setShowForm(false); setErrors({}); }}
              className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
            >
              Save Goal
            </button>
          </div>
        </form>
      )}

      {/* Goals list */}
      <div className="space-y-3">
        {goals.map((goal) => {
          const progress = Math.min(Math.round((goal.current / goal.target) * 100), 100);
          return (
            <div
              key={goal.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 group transition-colors"
            >
              <div className="flex-shrink-0">
                {progress >= 100 ? (
                  <CheckCircle className="w-5 h-5 text-primary-500" />
                ) : (
                  <Target className="w-5 h-5 text-accent-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {goal.title}
                  </p>
                  <button
                    onClick={() => removeGoal(goal.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all"
                    aria-label="Remove goal"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">
                    {goal.current}/{goal.target} {goal.unit}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                  <Calendar className="w-3 h-3" />
                  <span>Due {new Date(goal.deadline).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</span>
                </div>
              </div>
            </div>
          );
        })}
        {goals.length === 0 && (
          <p className="text-center text-sm text-gray-400 dark:text-gray-500 py-6">
            No goals yet. Add one to track your progress!
          </p>
        )}
      </div>
    </div>
  );
});

export default GoalSetter;
