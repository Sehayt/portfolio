"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function ThemeProvider({ children, ...props }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [initialTheme, setInitialTheme] = useState("dark");

  // Prevent flash of unstyled content
  useEffect(() => {
    // Get the initial theme from local storage or default
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setInitialTheme(savedTheme);
      } else {
        // Check for system preference
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setInitialTheme(prefersDark ? "dark" : "light");
      }
    }

    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Return early with initial theme
    return (
      <div className={initialTheme}>
        {children}
      </div>
    );
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      {...props}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key="theme-provider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </NextThemesProvider>
  );
}

// Re-export useTheme from next-themes
export { useTheme } from "next-themes";
