"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function NavLink({
  href,
  children,
  className = "",
  activeClassName = "text-primary font-medium",
  isActive = false,
  onClick,
}: NavLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className={`relative text-sm transition-colors duration-300 ${className} ${isActive ? activeClassName : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {children}
      <motion.div
        className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: isHovered || isActive ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      />
    </Link>
  );
}

export function SlideInLink({
  href,
  children,
  className = "",
  activeClassName = "text-primary font-medium",
  isActive = false,
  onClick,
}: NavLinkProps) {
  return (
    <motion.div
      className="overflow-hidden relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        href={href}
        className={`block ${className} ${isActive ? activeClassName : ""}`}
        onClick={onClick}
      >
        {children}
      </Link>
    </motion.div>
  );
}

export function MagneticLink({
  href,
  children,
  className = "",
  activeClassName = "text-primary font-medium",
  isActive = false,
  onClick,
}: NavLinkProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    const x = clientX - left - width / 2;
    const y = clientY - top - height / 2;

    setPosition({ x, y });
  };

  return (
    <motion.div
      animate={{
        x: isHovered ? position.x * 0.3 : 0,
        y: isHovered ? position.y * 0.3 : 0
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <Link
        href={href}
        className={`inline-block ${className} ${isActive ? activeClassName : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setIsHovered(false);
          setPosition({ x: 0, y: 0 });
        }}
        onClick={onClick}
      >
        {children}
      </Link>
    </motion.div>
  );
}
