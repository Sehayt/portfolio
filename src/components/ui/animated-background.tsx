"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  colorMode?: "light" | "dark" | "auto";
  intensity?: "subtle" | "medium" | "strong";
  type?: "gradient" | "particles" | "noise" | "waves";
  speed?: "slow" | "medium" | "fast";
}

export function AnimatedGradient({
  className = "",
  children,
  colorMode = "auto",
  intensity = "medium",
  speed = "medium",
}: AnimatedBackgroundProps) {
  const isDark = colorMode === "dark" || (colorMode === "auto" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const intensityMap = {
    subtle: isDark ? 0.03 : 0.05,
    medium: isDark ? 0.07 : 0.1,
    strong: isDark ? 0.1 : 0.15,
  };

  const speedMap = {
    slow: 15,
    medium: 10,
    fast: 5,
  };

  // Colors for dark mode
  const darkColors = [
    `rgba(79, 70, 229, ${intensityMap[intensity]})`,
    `rgba(139, 92, 246, ${intensityMap[intensity]})`,
    `rgba(59, 130, 246, ${intensityMap[intensity]})`,
    `rgba(16, 185, 129, ${intensityMap[intensity]})`,
  ];

  // Colors for light mode
  const lightColors = [
    `rgba(79, 70, 229, ${intensityMap[intensity]})`,
    `rgba(139, 92, 246, ${intensityMap[intensity]})`,
    `rgba(59, 130, 246, ${intensityMap[intensity]})`,
    `rgba(16, 185, 129, ${intensityMap[intensity]})`,
  ];

  const colors = isDark ? darkColors : lightColors;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            `radial-gradient(circle at 20% 30%, ${colors[0]}, transparent 50%),
             radial-gradient(circle at 80% 70%, ${colors[1]}, transparent 50%),
             radial-gradient(circle at 40% 80%, ${colors[2]}, transparent 50%),
             radial-gradient(circle at 70% 20%, ${colors[3]}, transparent 50%)`,

            `radial-gradient(circle at 70% 40%, ${colors[0]}, transparent 50%),
             radial-gradient(circle at 30% 80%, ${colors[1]}, transparent 50%),
             radial-gradient(circle at 90% 50%, ${colors[2]}, transparent 50%),
             radial-gradient(circle at 20% 10%, ${colors[3]}, transparent 50%)`,
          ],
        }}
        transition={{
          duration: speedMap[speed],
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      {children}
    </div>
  );
}

export function ParticlesBackground({
  className = "",
  children,
  colorMode = "auto",
  intensity = "medium",
}: AnimatedBackgroundProps) {
  const particleCount = intensity === "subtle" ? 20 : intensity === "medium" ? 40 : 60;
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const isDark = colorMode === "dark" || (colorMode === "auto" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const baseOpacity = isDark ? 0.2 : 0.15;

  // Generate particles based on intensity
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    velocity: {
      x: (Math.random() - 0.5) * 0.3,
      y: (Math.random() - 0.5) * 0.3,
    },
  }));

  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full bg-primary`}
          initial={{
            x: `${particle.x}%`,
            y: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: baseOpacity,
          }}
          animate={{
            x: [
              `${particle.x}%`,
              `${(particle.x + particle.velocity.x * 100 + 100) % 100}%`,
            ],
            y: [
              `${particle.y}%`,
              `${(particle.y + particle.velocity.y * 100 + 100) % 100}%`,
            ],
            opacity: [baseOpacity, baseOpacity * 1.5, baseOpacity],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{ zIndex: -1 }}
        />
      ))}
      {children}
    </div>
  );
}

export function NoiseBackground({
  className = "",
  children,
  intensity = "medium",
  speed = "medium",
}: AnimatedBackgroundProps) {
  const intensityValue =
    intensity === "subtle" ? 0.03 :
    intensity === "medium" ? 0.05 : 0.08;

  const speedValue =
    speed === "slow" ? 10 :
    speed === "medium" ? 6 : 3;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 -z-10 opacity-40">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={intensityValue}
              numOctaves="3"
              stitchTiles="stitch"
            >
              <animate
                attributeName="baseFrequency"
                values={`${intensityValue};${intensityValue * 1.5};${intensityValue}`}
                dur={`${speedValue}s`}
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feColorMatrix type="saturate" values="0.1" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
      {children}
    </div>
  );
}

export function WavesBackground({
  className = "",
  children,
  colorMode = "auto",
  intensity = "medium",
  speed = "medium",
}: AnimatedBackgroundProps) {
  const isDark = colorMode === "dark" || (colorMode === "auto" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const intensityMap = {
    subtle: isDark ? 0.05 : 0.07,
    medium: isDark ? 0.1 : 0.15,
    strong: isDark ? 0.15 : 0.25,
  };

  const speedMap = {
    slow: 20,
    medium: 15,
    fast: 10,
  };

  const color1 = isDark ?
    `rgba(79, 70, 229, ${intensityMap[intensity]})` :
    `rgba(79, 70, 229, ${intensityMap[intensity]})`;

  const color2 = isDark ?
    `rgba(139, 92, 246, ${intensityMap[intensity]})` :
    `rgba(139, 92, 246, ${intensityMap[intensity]})`;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 -z-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <motion.path
            initial={{ d: "M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,112C960,117,1056,107,1152,101.3C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" }}
            animate={{
              d: [
                "M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,112C960,117,1056,107,1152,101.3C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,128L48,133.3C96,139,192,149,288,154.7C384,160,480,160,576,154.7C672,149,768,139,864,149.3C960,160,1056,192,1152,186.7C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,96L48,128C96,160,192,224,288,224C384,224,480,160,576,133.3C672,107,768,117,864,144C960,171,1056,213,1152,202.7C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,112C960,117,1056,107,1152,101.3C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ]
            }}
            transition={{
              duration: speedMap[speed],
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop"
            }}
            fill={color1}
          />
          <motion.path
            initial={{ d: "M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,165.3C672,149,768,139,864,154.7C960,171,1056,213,1152,213.3C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" }}
            animate={{
              d: [
                "M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,165.3C672,149,768,139,864,154.7C960,171,1056,213,1152,213.3C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,224L48,202.7C96,181,192,139,288,149.3C384,160,480,224,576,234.7C672,245,768,203,864,186.7C960,171,1056,181,1152,186.7C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,224L48,218.7C96,213,192,203,288,176C384,149,480,107,576,112C672,117,768,171,864,176C960,181,1056,139,1152,117.3C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,165.3C672,149,768,139,864,154.7C960,171,1056,213,1152,213.3C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ]
            }}
            transition={{
              duration: speedMap[speed],
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
              delay: 0.5
            }}
            fill={color2}
          />
        </svg>
      </div>
      {children}
    </div>
  );
}
