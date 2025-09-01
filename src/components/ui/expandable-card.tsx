"use client";

import { ReactNode, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExpandableCardProps {
  children: ReactNode;
  details: ReactNode;
  className?: string;
  detailsClassName?: string;
  delay?: number;
  expandButtonLabel?: string;
  collapseButtonLabel?: string;
}

export function ExpandableCard({
  children,
  details,
  className = "",
  detailsClassName = "",
  delay = 0,
  expandButtonLabel = "See more details",
  collapseButtonLabel = "Show less"
}: ExpandableCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Smooth scroll into view when expanded on mobile
  useEffect(() => {
    if (isExpanded && cardRef.current && window.innerWidth < 768) {
      // Wait for the animation to complete before scrolling
      const timer = setTimeout(() => {
        const detailsElement = detailsRef.current;
        if (detailsElement) {
          // Calculate position to scroll to - the middle of the expanded content
          const detailsRect = detailsElement.getBoundingClientRect();
          const targetY =
            window.scrollY +
            detailsRect.top +
            (detailsRect.height / 2) -
            (window.innerHeight / 2);

          // Smooth scroll to the expanded content
          window.scrollTo({
            top: targetY,
            behavior: 'smooth'
          });
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  // Add touch feedback for mobile devices
  const touchAnimations = {
    tap: { scale: 0.98 },
    hover: { scale: 1.02 }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative card-3d-effect clickable-card ${className} ${isExpanded ? 'expanded' : ''}`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{
        opacity: 1,
        scale: 1,
        transition: {
          delay,
          duration: 0.5,
          ease: "easeOut"
        }
      }}
      whileHover={{
        y: isExpanded ? 0 : -5,
        boxShadow: "0 10px 30px -10px rgba(var(--primary), 0.3)",
        transition: { duration: 0.3 }
      }}
      whileTap={touchAnimations.tap}
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Card content */}
      <div
        className="group pulse-on-hover"
        onClick={toggleExpand}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleExpand();
            e.preventDefault();
          }
        }}
      >
        {children}

        {/* Expandable indicator */}
        <div className="absolute bottom-4 right-4 text-sm font-medium flex items-center gap-1 text-primary transition-all duration-300 opacity-70 group-hover:opacity-100 sparkle-hover slide-in-arrow">
          {isExpanded ? (
            <>
              {collapseButtonLabel} <ChevronUp className="h-4 w-4 pulse-element" />
            </>
          ) : (
            <>
              {expandButtonLabel} <ChevronDown className="h-4 w-4 pulse-element" />
            </>
          )}
        </div>
      </div>

      {/* Expandable details section with smooth animation */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            ref={detailsRef}
            className={`px-6 pb-6 pt-2 custom-scrollbar max-h-96 overflow-y-auto ${detailsClassName}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              transition: {
                height: {
                  duration: 0.4,
                  ease: [0.04, 0.62, 0.23, 0.98] // Custom easing for smooth animation
                },
                opacity: { duration: 0.3, delay: 0.1 }
              }
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: {
                height: { duration: 0.3 },
                opacity: { duration: 0.2 }
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  y: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  },
                  opacity: { duration: 0.4, delay: 0.2 }
                }
              }}
              exit={{ opacity: 0, y: 20 }}
            >
              {details}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ExpandableAchievements({ achievements }: { achievements: string[] }) {
  return (
    <div className="mt-4 space-y-2">
      <h4 className="font-medium text-sm uppercase tracking-wider text-primary/80 mb-2">Key Achievements</h4>
      <ul className="space-y-3">
        {achievements.map((achievement, index) => (
          <motion.li
            key={index}
            className="flex items-start gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }} // Added touch feedback
          >
            <span className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-0.5 pulse-element">
              ✓
            </span>
            <span className="sparkle-hover">{achievement}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
