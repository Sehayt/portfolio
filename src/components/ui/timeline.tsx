"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface TimelineItemProps {
  year: string;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  side?: "left" | "right";
  index?: number;
  onClick?: () => void;
  isActive?: boolean;
}

export function TimelineItem({
  year,
  title,
  subtitle,
  icon,
  children,
  className = "",
  side = "left",
  index = 0,
  onClick,
  isActive = false
}: TimelineItemProps) {
  const isLeft = side === "left";
  const delay = 0.1 + index * 0.1;
  const containerClass = isLeft
    ? "md:flex-row"
    : "md:flex-row-reverse";

  return (
    <motion.div
      className={`flex ${containerClass} items-start gap-4 mb-12 last:mb-0 relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay
        }
      }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Timeline connector */}
      <div className="absolute left-[19px] top-10 bottom-[-48px] w-[2px] bg-border md:left-1/2 md:ml-[-1px]">
        {!isActive && <div className="h-full" />}
        {isActive && (
          <motion.div
            className="h-full bg-primary w-full"
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        )}
      </div>

      {/* Content container */}
      <div
        className={`flex-1 ${isLeft ? "md:text-right md:pr-8" : "md:pl-8"}`}
        onClick={onClick}
      >
        <motion.div
          className={`inline-block mb-2 rounded-full px-3 py-1 text-sm font-medium ${
            isActive
              ? "bg-primary text-primary-foreground"
              : "bg-primary/10 text-primary"
          }`}
          whileHover={{
            scale: 1.05,
            backgroundColor: isActive ? "" : "rgba(var(--primary), 0.2)"
          }}
          initial={{ x: isLeft ? -20 : 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: delay + 0.1 }}
          viewport={{ once: true }}
        >
          {year}
        </motion.div>
        <motion.h3
          className="text-xl font-bold mb-1 flex items-center gap-2"
          initial={{ x: isLeft ? -20 : 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: delay + 0.2 }}
          viewport={{ once: true }}
        >
          {!isLeft && icon && <span>{icon}</span>}
          <span>{title}</span>
          {isLeft && icon && <span>{icon}</span>}
        </motion.h3>
        {subtitle && (
          <motion.p
            className="text-muted-foreground mb-3"
            initial={{ x: isLeft ? -20 : 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: delay + 0.3 }}
            viewport={{ once: true }}
          >
            {subtitle}
          </motion.p>
        )}
        <motion.div
          className="bg-card p-4 rounded-lg border border-border shadow-sm"
          initial={{
            y: 20,
            opacity: 0,
            scale: 0.95,
          }}
          whileInView={{
            y: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.4,
            delay: delay + 0.3
          }}
          whileHover={{
            y: -5,
            boxShadow: "0 10px 30px -15px rgba(var(--primary), 0.3)",
            borderColor: "rgba(var(--primary), 0.2)",
            transition: { duration: 0.2 }
          }}
          viewport={{ once: true }}
        >
          {children}
        </motion.div>
      </div>

      {/* Center timeline dot */}
      <div className="flex items-center justify-center relative z-10 mt-1">
        <motion.div
          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
            isActive
              ? "border-primary bg-primary text-primary-foreground"
              : "border-primary/30 bg-card text-primary"
          }`}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
            delay: delay + 0.2
          }}
          whileHover={{ scale: 1.1 }}
          viewport={{ once: true }}
        >
          {index + 1}
        </motion.div>
      </div>

      {/* Empty div to balance layout */}
      <div className="flex-1 hidden md:block"></div>
    </motion.div>
  );
}

interface TimelineProps {
  children: ReactNode;
  className?: string;
}

export function Timeline({ children, className = "" }: TimelineProps) {
  return (
    <div className={`relative py-4 ${className}`}>
      {/* Center line shown only on larger screens */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-border hidden md:block" />
      <div className="relative">
        {children}
      </div>
    </div>
  );
}
