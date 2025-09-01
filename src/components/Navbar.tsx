"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ui/theme-toggle";
import { NavLink } from "@/components/ui/nav-link";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useLanguage } from "@/lib/i18n-context";

// Define navigation links
const navigationLinks = [
  { href: "#home", label: "nav.home" },
  { href: "#services", label: "nav.services" },// Added Services section
  { href: "#experience-timeline", label: "nav.experience" },
  { href: "#education-timeline", label: "nav.education" },
  // { href: "#projects", label: "nav.projects" },
  { href: "#skills", label: "nav.skills" },
  //{ href: "#blog", label: "nav.Blog" },
  { href: "#contact", label: "nav.contact" }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const prevScrollY = useRef(0);
  const [hideNav, setHideNav] = useState(false);
  const { t } = useLanguage();

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Hide navbar when scrolling down, show when scrolling up
      if (prevScrollY.current < currentScrollY && currentScrollY > 80) {
        setHideNav(true);
      } else {
        setHideNav(false);
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking a link
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur shadow-sm' : 'bg-transparent'
      } ${hideNav ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="container mx-auto px-4 py-3">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <Link href="#home" className="text-xl md:text-2xl font-bold">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent"
            >
              Portfolio
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                onClick={closeMenu}
              >
                {t(link.label, link.label.split('.')[1])}
              </NavLink>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Right Side Action Items */}
            <div className="hidden md:flex items-center ml-4">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="mr-3"
              >
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('hero.download', 'Download Resume')}
                </a>
              </Button>
            </div>

            {/* Toggle Buttons */}
            <div className="flex items-center space-x-3">
              {/* Language Toggle */}
              <LanguageToggle variant="minimal" className="hidden md:flex" />

              {/* Theme Toggle */}
              <ThemeToggle />
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-background/95 backdrop-blur mt-2 rounded-lg overflow-hidden border"
            >
              <div className="py-2 px-1">
                {navigationLinks.map((link) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <NavLink
                      href={link.href}
                      onClick={closeMenu}
                      className="block px-4 py-2 w-full text-left hover:bg-muted rounded-md my-1"
                    >
                      {t(link.label, link.label.split('.')[1])}
                    </NavLink>
                  </motion.div>
                ))}

                {/* Language Toggle in mobile menu */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                  className="px-4 py-3 border-t mt-2 flex justify-between items-center"
                >
                  <span className="text-sm text-muted-foreground">
                    {t('common.language', 'Language')}:
                  </span>
                  <LanguageToggle variant="buttons" />
                </motion.div>

                {/* Download Resume in mobile menu */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.3 }}
                  className="px-4 py-3"
                >
                  <Button
                    variant="default"
                    size="sm"
                    asChild
                    className="w-full"
                  >
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('hero.download', 'Download Resume')}
                    </a>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
