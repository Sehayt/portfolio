"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const fadeInUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

export function AnimatedSection({
  children,
  className = "",
  delay = 0
}: AnimatedSectionProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      variants={fadeInUpVariants}
      custom={delay}
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedTitle({
  children,
  className = "",
  delay = 0
}: AnimatedSectionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          delay,
          duration: 0.5,
          ease: "easeOut"
        }
      }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedCard({
  children,
  className = "",
  delay = 0
}: AnimatedSectionProps) {
  return (
    <motion.div
      className={className}
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
        y: -5,
        boxShadow: "0 10px 30px -10px rgba(var(--primary), 0.3)",
        transition: { duration: 0.3 }
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedSkill({
  children,
  className = "",
  delay = 0
}: AnimatedSectionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{
        opacity: 1,
        scale: 1,
        transition: {
          delay,
          duration: 0.4,
          ease: "easeOut"
        }
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}
