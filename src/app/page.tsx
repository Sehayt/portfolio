import HeroSection from "@/components/HeroSection";
import EducationTimelineSection from "@/components/EducationTimelineSection";
import ExperienceTimelineSection from "@/components/ExperienceTimelineSection";
// import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { ScrollDownAnimation } from "@/components/ui/scroll-down-animation";
// import BlogSection from "@/components/BlogSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="min-h-screen flex flex-col">
        <HeroSection />
        <ScrollDownAnimation
          targetId="education-timeline"
          variant="primary"
          size="md"
          hideAfterScroll={true}
        />
      </div>
      <ServicesSection />
      <ExperienceTimelineSection />
      <EducationTimelineSection />
      <SkillsSection />
      {/* <BlogSection /> */}
      <ContactSection />
      <Footer />
    </main>
  );
}
