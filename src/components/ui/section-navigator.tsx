"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

// Define a section type
interface Section {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface SectionNavigatorProps {
  sections: Section[];
  position?: "left" | "right";
  offset?: number;
  showLabels?: boolean;
  className?: string;
}

export function SectionNavigator({
  sections,
  position = "right",
  offset = 30,
  showLabels = true,
  className = ""
}: SectionNavigatorProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveringSection, setHoveringSection] = useState<string | null>(null);
  const observerRefs = useRef<{ [key: string]: IntersectionObserver }>({});

  // Create intersection observers for each section
  useEffect(() => {
    // Initialize visibility after a delay to ensure all sections are rendered
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    // Setup observers for each section
    sections.forEach(section => {
      const sectionElement = document.getElementById(section.id);

      if (sectionElement) {
        // Create a new observer for this section
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              // If the section is at least 30% visible, consider it active
              if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
                setActiveSection(section.id);
              }
            });
          },
          {
            // Root margin to detect slightly before the section comes into view
            rootMargin: "0px 0px -30% 0px",
            threshold: [0.3, 0.6]
          }
        );

        // Start observing the section
        observer.observe(sectionElement);

        // Store the observer in our ref
        observerRefs.current[section.id] = observer;
      }
    });

    return () => {
      // Clean up all observers and the timeout
      clearTimeout(timer);
      Object.values(observerRefs.current).forEach(observer => observer.disconnect());
    };
  }, [sections]);

  // Handle click on a section indicator
  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);

    if (sectionElement) {
      // Calculate position with offset for fixed header if needed
      const headerOffset = 80; // Adjust based on your header height
      const elementPosition = sectionElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed z-40 ${position === 'left' ? 'left-4' : 'right-4'} top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-2 ${className}`}
          initial={{ opacity: 0, x: position === 'left' ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: position === 'left' ? -20 : 20 }}
          transition={{ duration: 0.3 }}
        >
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            const isHovering = hoveringSection === section.id;

            return (
              <div
                key={section.id}
                className="relative group flex items-center"
                onMouseEnter={() => setHoveringSection(section.id)}
                onMouseLeave={() => setHoveringSection(null)}
              >
                {/* Section label */}
                {showLabels && (isHovering || isActive) && (
                  <motion.div
                    className={`absolute ${position === 'left' ? 'left-8' : 'right-8'} whitespace-nowrap bg-card border border-border rounded-md py-1 px-3 text-sm shadow-md`}
                    initial={{ opacity: 0, x: position === 'left' ? -10 : 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: position === 'left' ? -10 : 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {section.label}
                    <div
                      className={`absolute top-1/2 transform -translate-y-1/2 ${
                        position === 'left' ? 'right-[-6px]' : 'left-[-6px]'
                      } w-3 h-3 bg-card border-t border-${position === 'left' ? 'r' : 'l'} border-border rotate-45`}
                    />
                  </motion.div>
                )}

                {/* Section indicator dot */}
                <motion.button
                  onClick={() => scrollToSection(section.id)}
                  className={`w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-background transition-all ${
                    isActive
                      ? 'bg-primary ring-primary w-4 h-4'
                      : 'bg-muted ring-border hover:bg-primary/50 hover:ring-primary/50'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={false}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    backgroundColor: isActive ? 'var(--primary)' : isHovering ? 'rgba(var(--primary), 0.5)' : 'var(--muted)'
                  }}
                  transition={{ duration: 0.2 }}
                  aria-label={`Navigate to ${section.label} section`}
                />

                {/* Line connecting dots */}
                {sections.indexOf(section) < sections.length - 1 && (
                  <motion.div
                    className="absolute top-[14px] w-[2px] h-4 bg-border left-1/2 transform -translate-x-1/2"
                    initial={{ height: 0 }}
                    animate={{ height: 16 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
