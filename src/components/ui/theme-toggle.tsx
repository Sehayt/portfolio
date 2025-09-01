"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Hydration fix
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -10,
      scale: 0.9,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.07,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -5 },
    open: { opacity: 1, y: 0 }
  };

  // Theme option details
  const themeOptions = [
    {
      value: "light",
      label: "Light",
      icon: <Sun className="h-4 w-4" />,
      bgClass: "bg-blue-50",
      textClass: "text-blue-900"
    },
    {
      value: "dark",
      label: "Dark",
      icon: <Moon className="h-4 w-4" />,
      bgClass: "bg-slate-900",
      textClass: "text-slate-200"
    },
    {
      value: "system",
      label: "System",
      icon: <Monitor className="h-4 w-4" />,
      bgClass: "bg-gray-200",
      textClass: "text-gray-800"
    }
  ];

  // Get the current theme icon
  const currentThemeOption = themeOptions.find((option) => option.value === theme) || themeOptions[0];

  return (
    <div className="relative">
      <motion.button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`relative flex items-center justify-center w-9 h-9 rounded-full transition-colors ${
          theme === "dark"
            ? "bg-slate-800 text-white hover:bg-slate-700"
            : "bg-white text-slate-900 hover:bg-gray-100"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle theme"
        title="Toggle theme"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 30 }}
            transition={{ duration: 0.3, type: "spring" }}
          >
            {currentThemeOption.icon}
          </motion.div>
        </AnimatePresence>

        {/* Decorative ring */}
        <motion.span
          className="absolute inset-0 rounded-full border border-primary/40"
          animate={{ scale: [0.8, 1.05, 1], opacity: [0, 0.8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 3
          }}
        />
      </motion.button>

      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Dropdown menu */}
            <motion.div
              className="absolute right-0 mt-2 p-1 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden w-40"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {themeOptions.map((option) => (
                <motion.button
                  key={option.value}
                  className={`flex items-center w-full gap-2 px-3 py-2 text-sm rounded-md mb-1 last:mb-0 transition-colors ${
                    theme === option.value
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted/80 text-foreground/80"
                  }`}
                  onClick={() => {
                    setTheme(option.value);
                    setMenuOpen(false);
                  }}
                  variants={itemVariants}
                >
                  <span
                    className={`flex items-center justify-center w-6 h-6 rounded-full ${
                      option.bgClass
                    } ${option.textClass}`}
                  >
                    {option.icon}
                  </span>
                  <span>{option.label}</span>

                  {theme === option.value && (
                    <motion.span
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                      layoutId="activeThemeDot"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
