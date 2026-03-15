/**
 * Skeleton loading component for content placeholders.
 * Supports various shapes: rectangle, circle, text lines.
 */
export function Skeleton({ className = "", variant = "rectangle", lines = 3 }) {
  const baseClass =
    "animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg";

  if (variant === "circle") {
    return <div className={`${baseClass} rounded-full ${className}`} />;
  }

  if (variant === "text") {
    return (
      <div className={`space-y-3 ${className}`}>
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={`${baseClass} h-4`}
            style={{ width: i === lines - 1 ? "60%" : "100%" }}
          />
        ))}
      </div>
    );
  }

  return <div className={`${baseClass} ${className}`} />;
}

/**
 * Full card skeleton matching the dashboard card style.
 */
export function CardSkeleton({ height = "h-48" }) {
  return (
    <div className={`card ${height} animate-pulse`}>
      <div className="h-5 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/5" />
      </div>
      <div className="mt-4 flex gap-3">
        <div className="h-16 flex-1 bg-gray-200 dark:bg-gray-700 rounded-xl" />
        <div className="h-16 flex-1 bg-gray-200 dark:bg-gray-700 rounded-xl" />
        <div className="h-16 flex-1 bg-gray-200 dark:bg-gray-700 rounded-xl" />
      </div>
    </div>
  );
}

/**
 * Dashboard skeleton for initial page load.
 */
export default function DashboardSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      <CardSkeleton height="h-28" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <CardSkeleton height="h-52" />
        </div>
        <CardSkeleton height="h-52" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardSkeleton height="h-72" />
        <CardSkeleton height="h-72" />
      </div>
    </div>
  );
}
