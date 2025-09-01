"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Cursor shapes and effects
const cursorShapes = {
  default: {
    el: ({ x, y }: { x: number, y: number }) => (
      <motion.div
        className="rounded-full pointer-events-none"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          x: x - 16,
          y: y - 16,
          backgroundColor: "rgba(138, 43, 226, 0.2)",
          border: "1px solid rgba(138, 43, 226, 0.3)",
          zIndex: 9999,
        }}
        transition={{
          type: "spring",
          mass: 0.6,
          stiffness: 400,
          damping: 30
        }}
      />
    )
  },
  link: {
    el: ({ x, y }: { x: number, y: number }) => (
      <motion.div
        className="pointer-events-none"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 48,
          height: 48,
          x: x - 24,
          y: y - 24,
          zIndex: 9999,
        }}
        initial={{ scale: 0.8, opacity: 0.8 }}
        animate={{
          scale: [0.8, 1, 0.8],
          opacity: [0.8, 1, 0.8],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 backdrop-blur-sm border border-white/20" />
      </motion.div>
    )
  },
  button: {
    el: ({ x, y }: { x: number, y: number }) => (
      <motion.div
        className="pointer-events-none flex items-center justify-center"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 64,
          height: 64,
          x: x - 32,
          y: y - 32,
          zIndex: 9999,
        }}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1.1 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-indigo-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10" />
        <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping" style={{ animationDuration: "1.5s" }} />
      </motion.div>
    )
  },
  text: {
    el: ({ x, y }: { x: number, y: number }) => (
      <motion.div
        className="pointer-events-none"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          x: x - 20,
          y: y - 20,
          zIndex: 9999,
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm" />
        <motion.div
          className="absolute inset-0 rounded-full bg-white/5"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(255, 255, 255, 0.3)",
              "0 0 0 10px rgba(255, 255, 255, 0)",
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        />
      </motion.div>
    )
  },
  image: {
    el: ({ x, y }: { x: number, y: number }) => (
      <motion.div
        className="pointer-events-none flex items-center justify-center"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 80,
          height: 80,
          x: x - 40,
          y: y - 40,
          zIndex: 9999,
        }}
      >
        <div className="w-2/3 h-2/3 rounded-full bg-gradient-to-r from-amber-500/20 to-purple-500/20 backdrop-blur-sm" />
        <motion.div
          className="absolute w-full h-full rounded-full border border-amber-500/30"
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-amber-500/80" />
        </motion.div>
      </motion.div>
    )
  }
};

export default function CursorFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [dotScale, setDotScale] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);

    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const mouseDown = () => setDotScale(0.7);
    const mouseUp = () => setDotScale(1);

    const handleElementInteraction = (element: string, enter: boolean) => {
      setCursorVariant(enter ? element : "default");
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);

    // Add event listeners for different elements
    const links = document.querySelectorAll("a, button");
    const texts = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, label");
    const images = document.querySelectorAll("img");

    links.forEach(link => {
      link.addEventListener("mouseenter", () => handleElementInteraction("link", true));
      link.addEventListener("mouseleave", () => handleElementInteraction("link", false));
    });

    texts.forEach(text => {
      text.addEventListener("mouseenter", () => handleElementInteraction("text", true));
      text.addEventListener("mouseleave", () => handleElementInteraction("text", false));
    });

    images.forEach(image => {
      image.addEventListener("mouseenter", () => handleElementInteraction("image", true));
      image.addEventListener("mouseleave", () => handleElementInteraction("image", false));
    });

    // Find buttons and add special interaction
    const buttons = document.querySelectorAll("button, .button, [role='button']");
    buttons.forEach(button => {
      button.addEventListener("mouseenter", () => handleElementInteraction("button", true));
      button.addEventListener("mouseleave", () => handleElementInteraction("button", false));
    });

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);

      links.forEach(link => {
        link.removeEventListener("mouseenter", () => handleElementInteraction("link", true));
        link.removeEventListener("mouseleave", () => handleElementInteraction("link", false));
      });

      texts.forEach(text => {
        text.removeEventListener("mouseenter", () => handleElementInteraction("text", true));
        text.removeEventListener("mouseleave", () => handleElementInteraction("text", false));
      });

      images.forEach(image => {
        image.removeEventListener("mouseenter", () => handleElementInteraction("image", true));
        image.removeEventListener("mouseleave", () => handleElementInteraction("image", false));
      });

      buttons.forEach(button => {
        button.removeEventListener("mouseenter", () => handleElementInteraction("button", true));
        button.removeEventListener("mouseleave", () => handleElementInteraction("button", false));
      });
    };
  }, []);

  // Only show on desktop and only after component is mounted (client-side)
  if (!isMounted || (typeof window !== "undefined" && window.innerWidth < 768)) {
    return null;
  }

  const CursorComponent = cursorShapes[cursorVariant as keyof typeof cursorShapes]?.el || cursorShapes.default.el;

  return (
    <>
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 rounded-full bg-primary pointer-events-none z-[9999] hidden md:block"
        style={{
          width: 6,
          height: 6,
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: dotScale,
        }}
        transition={{
          type: "spring",
          mass: 0.1,
          stiffness: 900,
          damping: 30
        }}
      />

      <AnimatePresence mode="wait">
        <CursorComponent x={mousePosition.x} y={mousePosition.y} />
      </AnimatePresence>
    </>
  );
}
