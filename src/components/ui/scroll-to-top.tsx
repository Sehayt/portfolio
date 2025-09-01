"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

interface ScrollToTopProps {
  showAtHeight?: number;
  position?: "right" | "left";
  offset?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ScrollToTop({
  showAtHeight = 300,
  position = "right",
  offset = 20,
  size = "md",
  className = ""
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Size classes based on the size prop
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-14 h-14"
  };

  // Position classes based on the position and offset props
  const positionClasses = {
    right: `right-${offset} left-auto`,
    left: `left-${offset} right-auto`,
  };

  // Check if we should show the button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY > showAtHeight);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Call once to initialize
    handleScroll();

    // Clean up
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAtHeight]);

  // Scroll to top with smooth animation
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className={`fixed bottom-${offset} z-40 flex items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg ${sizeClasses[size]} ${className}`}
          style={{ [position]: `${offset}px` }}
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
              type: "spring",
              stiffness: 260,
              damping: 20
            }
          }}
          exit={{
            opacity: 0,
            scale: 0.5,
            y: 20,
            transition: { duration: 0.2 }
          }}
          whileHover={{
            scale: 1.1,
            backgroundColor: "rgba(var(--primary), 0.95)",
            boxShadow: "0 10px 25px -5px rgba(var(--primary), 0.5)"
          }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6" />

          {/* Ripple animation for additional visual feedback */}
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-primary"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
