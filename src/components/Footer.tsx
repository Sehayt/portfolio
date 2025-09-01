"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  // {
  //   name: "GitHub",
  //   url: "https://github.com/mawin",
  //   icon: <Github className="w-5 h-5" />
  // },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/oussama-shait-580653255/",
    icon: <Linkedin className="w-5 h-5" />
  },
  // {
  //   name: "Twitter",
  //   url: "https://twitter.com/mawin",
  //   icon: <Twitter className="w-5 h-5" />
  // },
];

// const footerLinks = [
//   { name: "Home", href: "#home" },
//   { name: "Experience", href: "#experience" },
//   { name: "Education", href: "#education" },
//   // { name: "Projects", href: "#projects" },
//   { name: "Skills", href: "#skills" },
//   { name: "Contact", href: "#contact" },
// ];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 border-t border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {currentYear} <span className="text-primary">Oussama SHAIT</span>. All rights reserved.
          </div>

          <div className="flex space-x-4">
            {socialLinks.map(({ name, url, icon }) => (
              <motion.a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
