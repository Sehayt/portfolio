"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n-context";
import { Language } from "@/lib/i18n";

// Define available language options
type LanguageOption = {
  code: Language;
  label: string;
  flag?: string;
};

const languageOptions: LanguageOption[] = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" }
];

interface LanguageToggleProps {
  variant?: "minimal" | "dropdown" | "buttons";
  showLabels?: boolean;
  showFlags?: boolean;
  className?: string;
}

export function LanguageToggle({
  variant = "dropdown",
  showLabels = true,
  showFlags = false,
  className = ""
}: LanguageToggleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  // Handle language change
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  // Find the current language option
  const currentOption = languageOptions.find(option => option.code === language)!;

  // Render minimal variant (just an icon)
  if (variant === "minimal") {
    return (
      <div className={`language-toggle ${className}`}>
        <button
          className="p-2 rounded-full hover:bg-muted transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            const currentIndex = languageOptions.findIndex(option => option.code === language);
            const nextIndex = (currentIndex + 1) % languageOptions.length;
            setLanguage(languageOptions[nextIndex].code);
          }}
          title={t('common.changeLanguage', 'Change language')}
        >
          <Globe className="w-5 h-5" />
        </button>
      </div>
    );
  }

  // Render buttons variant
  if (variant === "buttons") {
    return (
      <div className={`language-toggle flex space-x-1 ${className}`}>
        {languageOptions.map((option) => (
          <button
            key={option.code}
            className={`py-1 px-2 rounded text-sm ${
              language === option.code
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            }`}
            onClick={() => setLanguage(option.code)}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  }

  // Default: dropdown variant
  return (
    <div className={`language-toggle relative ${className}`}>
      <motion.button
        className="flex items-center space-x-1 px-2 py-1.5 rounded-md hover:bg-muted transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        whileTap={{ scale: 0.97 }}
      >
        <Globe className="w-4 h-4 opacity-70" />
        {showLabels && (
          <>
            <span className="text-sm">{currentOption.label}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute z-50 right-0 mt-1 w-40 rounded-md shadow-lg bg-background border"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="py-1">
              {languageOptions.map((option) => (
                <button
                  key={option.code}
                  className={`w-full text-left flex items-center px-4 py-2 text-sm ${
                    language === option.code
                      ? "bg-muted/50 text-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                  onClick={() => handleLanguageChange(option.code)}
                >
                  <span className="flex-1">{option.label}</span>
                  {language === option.code && (
                    <Check className="w-4 h-4 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
