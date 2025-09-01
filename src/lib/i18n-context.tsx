"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language } from './i18n';

// Define the translations structure
export interface Translations {
  [key: string]: {
    [key in Language]?: string;
  };
}

// Helper to get the browser language
const getBrowserLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'en' || browserLang === 'fr') {
      return browserLang as Language;
    }
  }
  return 'en'; // Default to English
};

// Initialize the context with default values
const defaultLanguage = 'en' as Language;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: (key: string, fallback?: string) => fallback || key,
});

// Create a provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [isClient, setIsClient] = useState(false);

  // Initialize language from local storage or browser language
  useEffect(() => {
    setIsClient(true);

    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      const initialLanguage = savedLanguage || getBrowserLanguage();
      setLanguageState(initialLanguage);
    }
  }, []);

  // Save language preference to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);

    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);

      // Force refresh all components that use translations
      // This ensures that all parts of the UI update when language changes
      window.dispatchEvent(new Event('languagechange'));
    }
  };

  // Translation function
  const t = (key: string, fallback?: string): string => {
    if (!isClient) return fallback || key;

    const translation = translations[key]?.[language];
    return translation || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Re-export translations for convenience
export { translations };
