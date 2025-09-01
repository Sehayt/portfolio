"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimate, stagger } from "framer-motion";

interface AnimatedCharactersProps {
  text: string;
  className?: string;
  staggerChildren?: number;
  delayStart?: number;
}

interface AnimatedTextProps {
  text: string | string[];
  className?: string;
  highlightClassName?: string;
  highlightWords?: string[];
  tag?: keyof JSX.IntrinsicElements;
}

export function AnimatedCharacters({
  text,
  className = "",
  staggerChildren = 0.025,
  delayStart = 0,
}: AnimatedCharactersProps) {
  const characters = text.split("");

  const containerVariants = {
    hidden: {},
    visible: (i = 1) => ({
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delayStart
      }
    })
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={childVariants}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}

export function TypewriterText({
  text,
  className = "",
}: AnimatedCharactersProps) {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, margin: "-50px" });
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    if (isInView && !isAnimationComplete) {
      animate(
        "span",
        { opacity: 1 },
        { duration: 0.02, delay: stagger(0.05) }
      ).then(() => setIsAnimationComplete(true));
    }
  }, [isInView, animate, isAnimationComplete]);

  return (
    <motion.span
      ref={scope}
      className={`inline ${className}`}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          style={{ opacity: 0, display: "inline-block" }}
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
      <span className="sr-only">{text}</span>
    </motion.span>
  );
}

export function HighlightedText({
  text,
  className = "",
  highlightClassName = "text-primary font-bold",
  highlightWords = [],
  tag: Component = "p",
}: AnimatedTextProps) {
  const words = typeof text === "string" ? text.split(" ") : text;

  return (
    <Component className={className}>
      {words.map((word, i) => {
        const shouldHighlight = highlightWords.includes(word);
        return (
          <motion.span
            key={i}
            className={shouldHighlight ? highlightClassName : ""}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                delay: i * 0.03,
                duration: 0.5,
                ease: "easeOut"
              }
            }}
            viewport={{ once: true }}
            style={{ display: "inline-block" }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        );
      })}
    </Component>
  );
}

export function GradientText({ text, className = "" }: AnimatedCharactersProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
      setRotation(angle);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={ref}
      className={`inline-block relative ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.span
        className="inline-block bg-gradient-to-r from-purple-500 via-blue-600 to-cyan-500 bg-clip-text text-transparent"
        style={{
          backgroundImage: `linear-gradient(${rotation}deg, var(--tw-gradient-stops))`
        }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
}
