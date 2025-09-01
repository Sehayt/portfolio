"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import CursorFollower from "@/components/ui/cursor-follower";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { SectionNavigator } from "@/components/ui/section-navigator";
import { LanguageProvider } from "@/lib/i18n-context";
import { ToastProvider } from "@/components/ui/toast";

// Define the main sections of the website for the navigator
const mainSections = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "experience-timeline", label: "Experience" },
  { id: "education-timeline", label: "Education" },
  //{ id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  //{ id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" }
];

export default function ClientBody({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <LanguageProvider>
      <ToastProvider>
        <div className="relative">
          {isMounted && <CursorFollower />}
          <Navbar />
          <main>{children}</main>

          {/* Interactive UI elements */}
          {isMounted && (
            <>
              <ScrollToTop
                position="right"
                offset={20}
                size="md"
              />

              <SectionNavigator
                sections={mainSections}
                position="right"
                offset={20}
                showLabels={true}
              />
            </>
          )}
        </div>
      </ToastProvider>
    </LanguageProvider>
  );
}
