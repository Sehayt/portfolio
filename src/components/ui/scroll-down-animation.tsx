"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n-context";

interface ScrollDownAnimationProps {
  targetId?: string;
  showText?: boolean;
  hideAfterScroll?: boolean;
  variant?: "light" | "dark" | "primary";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ScrollDownAnimation({
  targetId,
  showText = true,
  hideAfterScroll = true,
  variant = "primary",
  size = "md",
  className = "",
}: ScrollDownAnimationProps) {
  const [visible, setVisible] = useState(true);
  const { t } = useLanguage();

  // Handle scroll event to hide the animation after scrolling
  useEffect(() => {
    if (!hideAfterScroll) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = window.innerHeight * 0.3; // Hide after 30% of viewport height scrolled

      if (scrollPosition > threshold) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hideAfterScroll]);

  // Handle click to scroll to target section
  const handleClick = () => {
    if (!targetId) return;

    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Determine size class
  const sizeClasses = {
    sm: {
      container: "text-xs",
      chevron: "w-4 h-4",
      button: "w-8 h-8"
    },
    md: {
      container: "text-sm",
      chevron: "w-5 h-5",
      button: "w-10 h-10"
    },
    lg: {
      container: "text-base",
      chevron: "w-6 h-6",
      button: "w-12 h-12"
    }
  };

  // Determine variant class
  const variantClasses = {
    light: "text-white border-white/30 bg-white/10",
    dark: "text-gray-800 border-gray-800/30 bg-gray-800/10",
    primary: "text-primary border-primary/30 bg-primary/10"
  };

  const sizeCls = sizeClasses[size];
  const variantCls = variantClasses[variant];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 z-40 flex flex-col items-center ${sizeCls.container} ${className}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
        >
          {showText && (
            <motion.div
              className="mb-2 text-center opacity-80"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.8] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              {t("hero.scrollDown", "Scroll Down")}
            </motion.div>
          )}

          <motion.button
            onClick={handleClick}
            className={`flex items-center justify-center border ${sizeCls.button} rounded-full ${variantCls} cursor-pointer`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{
                y: [0, 4, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              <ChevronDown className={sizeCls.chevron} />
            </motion.div>
          </motion.button>

          {/* Ripple effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 mt-2">
            <motion.div
              className={`absolute rounded-full border ${variantCls} opacity-40`}
              initial={{ width: 10, height: 10 }}
              animate={{
                width: [10, 50],
                height: [10, 50],
                opacity: [0.4, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
              style={{ x: "-50%", y: "-50%" }}
            />
            <motion.div
              className={`absolute rounded-full border ${variantCls} opacity-40`}
              initial={{ width: 10, height: 10 }}
              animate={{
                width: [10, 50],
                height: [10, 50],
                opacity: [0.4, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.5,
              }}
              style={{ x: "-50%", y: "-50%" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
