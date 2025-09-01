"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface RevealImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
}

export function RevealImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  fill = false,
}: RevealImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        rootMargin: "0px",
        threshold: 0.1
      }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ opacity: 0.999 }}
    >
      <motion.div
        className="absolute inset-0 bg-background z-10"
        initial={{ scaleY: 1 }}
        animate={
          isInView
            ? {
                scaleY: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.645, 0.045, 0.355, 1.0],
                  delay: 0.2
                }
              }
            : { scaleY: 1 }
        }
        style={{ originY: 0 }}
      />
      <motion.div
        className="w-full h-full"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={
          isInView
            ? {
                scale: 1,
                opacity: 1,
                transition: {
                  duration: 0.6,
                  ease: "easeOut",
                  delay: 0.6
                }
              }
            : { scale: 1.1, opacity: 0 }
        }
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            className={`object-cover transition-transform ${isLoaded ? "blur-0" : "blur-sm"}`}
            priority={priority}
            onLoad={() => setIsLoaded(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width || 500}
            height={height || 300}
            className={`w-full h-auto object-cover transition-transform ${isLoaded ? "blur-0" : "blur-sm"}`}
            priority={priority}
            onLoad={() => setIsLoaded(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </motion.div>
    </div>
  );
}

export function ParallaxImage({
  src,
  alt,
  className = "",
  priority = false,
}: RevealImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        rootMargin: "0px",
        threshold: 0.1
      }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="w-full h-full"
        initial={{ y: 20 }}
        animate={
          isInView
            ? {
                y: 0,
                transition: {
                  duration: 0.8,
                  ease: "easeOut"
                }
              }
            : { y: 20 }
        }
        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </motion.div>
    </div>
  );
}
