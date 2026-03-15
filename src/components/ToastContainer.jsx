import { useToast } from "../context/ToastContext";
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from "lucide-react";
import { memo, useCallback } from "react";

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const colorMap = {
  success:
    "bg-primary-50 dark:bg-primary-900/30 border-primary-200 dark:border-primary-800 text-primary-800 dark:text-primary-200",
  error:
    "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200",
  warning:
    "bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200",
  info: "bg-accent-50 dark:bg-accent-900/30 border-accent-200 dark:border-accent-800 text-accent-800 dark:text-accent-200",
};

/**
 * Individual toast notification item.
 */
const ToastItem = memo(function ToastItem({ toast, onRemove }) {
  const Icon = iconMap[toast.type] || Info;
  const colors = colorMap[toast.type] || colorMap.info;

  const handleRemove = useCallback(() => onRemove(toast.id), [toast.id, onRemove]);

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-sm animate-slide-up ${colors}`}
      role="alert"
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <p className="text-sm font-medium flex-1">{toast.message}</p>
      <button
        onClick={handleRemove}
        className="flex-shrink-0 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
});

/**
 * Toast container renders all active toasts in a fixed position.
 */
export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] space-y-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
}
