"use client";

import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { createPortal } from "react-dom";

// Toast types
export type ToastType = "success" | "error" | "info" | "warning";

// Toast interface
export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  title?: string;
}

// Toast context interface
interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

// Create context with default values
const ToastContext = createContext<ToastContextType>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

// Custom hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Global toast reference for use outside of React components
let toastHandler: ToastContextType | null = null;

// Toast Provider Component
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Add a new toast
  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    // Generate random ID
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);

    // Auto-remove after duration (default 5000ms)
    if (toast.duration !== 0) {
      const duration = toast.duration || 5000;
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  // Remove a toast by ID
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  // Set up the global toast handler
  useEffect(() => {
    setIsMounted(true);
    toastHandler = { toasts, addToast, removeToast };

    return () => {
      setIsMounted(false);
      toastHandler = null;
    };
  }, [toasts, addToast, removeToast]);

  // Render only on client-side
  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {isMounted && createPortal(<ToastContainer />, document.body)}
    </ToastContext.Provider>
  );
}

// Toast item component
function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const getToastStyles = (type: ToastType) => {
    switch (type) {
      case "success":
        return {
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          bg: "bg-green-50 dark:bg-green-900/20",
          border: "border-green-500/30"
        };
      case "error":
        return {
          icon: <AlertCircle className="h-5 w-5 text-red-500" />,
          bg: "bg-red-50 dark:bg-red-900/20",
          border: "border-red-500/30"
        };
      case "warning":
        return {
          icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
          bg: "bg-amber-50 dark:bg-amber-900/20",
          border: "border-amber-500/30"
        };
      case "info":
      default:
        return {
          icon: <Info className="h-5 w-5 text-blue-500" />,
          bg: "bg-blue-50 dark:bg-blue-900/20",
          border: "border-blue-500/30"
        };
    }
  };

  const styles = getToastStyles(toast.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`relative w-full max-w-sm rounded-lg border p-4 shadow-lg backdrop-blur-sm ${styles.bg} ${styles.border}`}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5">{styles.icon}</div>
        <div className="flex-1 min-w-0">
          {toast.title && (
            <h4 className="font-medium leading-none tracking-tight">
              {toast.title}
            </h4>
          )}
          <p className={`${toast.title ? 'mt-1' : ''} text-sm text-muted-foreground`}>
            {toast.message}
          </p>
        </div>
        <button
          onClick={onClose}
          className="ml-auto -mr-1 h-6 w-6 rounded-full hover:bg-muted flex items-center justify-center"
        >
          <X className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Close</span>
        </button>
      </div>
      <motion.div
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{
          duration: (toast.duration || 5000) / 1000,
          ease: "linear"
        }}
        className="absolute bottom-0 left-0 h-1 bg-foreground/10"
      />
    </motion.div>
  );
}

// Toast container component
function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-0 right-0 z-50 w-full p-4 md:max-w-sm md:bottom-4 md:right-4 flex flex-col-reverse gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} onClose={() => removeToast(toast.id)} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// External toast API - doesn't use hooks directly
// Instead uses the global reference set by the ToastProvider
export const toast = {
  show: (message: string, options: Partial<Omit<Toast, "id" | "message">> = {}) => {
    if (!toastHandler) {
      console.warn("Toast provider not mounted yet");
      return;
    }
    toastHandler.addToast({
      message,
      type: options.type || "info",
      duration: options.duration,
      title: options.title
    });
  },

  success: (message: string, options: Partial<Omit<Toast, "id" | "message" | "type">> = {}) => {
    if (!toastHandler) {
      console.warn("Toast provider not mounted yet");
      return;
    }
    toastHandler.addToast({
      message,
      type: "success",
      duration: options.duration,
      title: options.title
    });
  },

  error: (message: string, options: Partial<Omit<Toast, "id" | "message" | "type">> = {}) => {
    if (!toastHandler) {
      console.warn("Toast provider not mounted yet");
      return;
    }
    toastHandler.addToast({
      message,
      type: "error",
      duration: options.duration,
      title: options.title
    });
  },

  warning: (message: string, options: Partial<Omit<Toast, "id" | "message" | "type">> = {}) => {
    if (!toastHandler) {
      console.warn("Toast provider not mounted yet");
      return;
    }
    toastHandler.addToast({
      message,
      type: "warning",
      duration: options.duration,
      title: options.title
    });
  },

  info: (message: string, options: Partial<Omit<Toast, "id" | "message" | "type">> = {}) => {
    if (!toastHandler) {
      console.warn("Toast provider not mounted yet");
      return;
    }
    toastHandler.addToast({
      message,
      type: "info",
      duration: options.duration,
      title: options.title
    });
  }
};
