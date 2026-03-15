import { createContext, useContext, useReducer, useCallback, useMemo } from "react";

const ToastContext = createContext(null);

// Toast reducer for managing notification state
function toastReducer(state, action) {
  switch (action.type) {
    case "ADD_TOAST":
      return [...state, { id: Date.now(), ...action.payload }];
    case "REMOVE_TOAST":
      return state.filter((toast) => toast.id !== action.id);
    default:
      return state;
  }
}

/**
 * Toast notification provider.
 * Supports success, error, info, and warning types.
 * Auto-dismisses after configurable duration.
 */
export function ToastProvider({ children }) {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const addToast = useCallback((message, type = "info", duration = 3000) => {
    const id = Date.now();
    dispatch({ type: "ADD_TOAST", payload: { message, type, duration } });

    setTimeout(() => {
      dispatch({ type: "REMOVE_TOAST", id });
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    dispatch({ type: "REMOVE_TOAST", id });
  }, []);

  const value = useMemo(
    () => ({ toasts, addToast, removeToast }),
    [toasts, addToast, removeToast]
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
