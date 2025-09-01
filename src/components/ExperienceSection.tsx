"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedTitle } from "@/components/ui/animated-section";
import { Building, Calendar, Circle, Link, Users, Award, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { ExpandableCard, ExpandableAchievements } from "@/components/ui/expandable-card";

const experienceData = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechGlobe Inc.",
    period: "2020 - Present",
    description:
      "Lead the frontend development of the company's flagship product, improving performance by 60%. Architected and implemented a component library used across multiple products. Mentored junior developers and conducted code reviews. Collaborated with UX designers to create intuitive user interfaces.",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux", "GraphQL"],
    achievements: [
      "Improved application performance by 60% through code optimization and modern React patterns",
      "Created a company-wide design system and component library used across 5+ products",
      "Mentored 8 junior developers, with 3 receiving promotions within a year",
      "Reduced bug reports by 40% through implementation of comprehensive testing strategies",
      "Led migration from legacy codebase to modern React framework, completing project 2 weeks ahead of schedule"
    ],
    projects: [
      {
        name: "Customer Dashboard Redesign",
        description: "Complete overhaul of customer analytics platform with improved UX and performance",
        technologies: ["React", "TypeScript", "D3.js"]
      },
      {
        name: "Component Library",
        description: "Creation of reusable UI component system with comprehensive documentation",
        technologies: ["Storybook", "Tailwind CSS", "Jest"]
      },
      {
        name: "Mobile App Integration",
        description: "Implementation of responsive design for seamless desktop/mobile experience",
        technologies: ["React Native", "Redux", "Expo"]
      }
    ],
    team: "Product Engineering (15 members)",
    location: "San Francisco, CA (Remote)"
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "DesignWave Studios",
    period: "2018 - 2020",
    description:
      "Designed user interfaces and experiences for web and mobile applications. Conducted user research and usability testing to inform design decisions. Created wireframes, prototypes, and high-fidelity mockups. Collaborated with developers to ensure accurate implementation of designs.",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Wireframing", "Design Systems"],
    achievements: [
      "Conducted user research sessions with 100+ participants to inform design decisions",
      "Created design system that reduced design inconsistencies by 75% across product suite",
      "Improved user satisfaction scores by 35% based on post-redesign surveys",
      "Implemented accessibility improvements resulting in WCAG AA compliance",
      "Designed UI/UX for mobile app that achieved 4.8/5 star rating in App Store"
    ],
    projects: [
      {
        name: "E-commerce Platform Redesign",
        description: "End-to-end redesign of checkout flow, increasing conversion by 25%",
        technologies: ["Figma", "ProtoPie", "Optimal Workshop"]
      },
      {
        name: "Healthcare Provider Portal",
        description: "Design of intuitive interface for medical professionals, reducing training time by 40%",
        technologies: ["Adobe XD", "Illustrator", "InVision"]
      },
      {
        name: "Banking Mobile App",
        description: "Mobile-first design for personal finance management app with 250k+ users",
        technologies: ["Sketch", "Principle", "UserTesting.com"]
      }
    ],
    team: "Design Team (7 members)",
    location: "Boston, MA"
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "InnoTech Solutions",
    period: "2016 - 2018",
    description:
      "Developed responsive web applications using modern JavaScript frameworks. Optimized front-end performance and improved page load times by 40%. Implemented complex UI components and interactive features. Collaborated with backend developers to integrate APIs.",
    skills: ["JavaScript", "React", "CSS3/Sass", "Webpack", "Jest", "RESTful APIs"],
    achievements: [
      "Reduced page load time by 40% through code splitting and lazy loading techniques",
      "Built reusable component library that decreased development time for new features by 30%",
      "Implemented automated testing suite with 85% code coverage",
      "Collaborated with backend team to design efficient API endpoints, reducing data transfer by 25%",
      "Led frontend architecture planning for company's flagship SaaS product"
    ],
    projects: [
      {
        name: "CRM Dashboard",
        description: "Interactive customer relationship management dashboard with real-time updates",
        technologies: ["React", "Redux", "Socket.io"]
      },
      {
        name: "Content Management System",
        description: "Custom CMS with drag-and-drop page builder for marketing team",
        technologies: ["JavaScript", "jQuery", "SCSS"]
      },
      {
        name: "Analytics Platform",
        description: "Data visualization tool with interactive charts and customizable reporting",
        technologies: ["D3.js", "React", "Node.js"]
      }
    ],
    team: "Frontend Development (5 members)",
    location: "Chicago, IL"
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-[hsl(var(--section-bg))]">
      <div className="container mx-auto px-4">
        <AnimatedTitle className="text-center">
          <h2 className="section-title">My Experience</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Professional journey and roles that have shaped my expertise
          </p>
        </AnimatedTitle>

        <div className="space-y-10 max-w-4xl mx-auto">
          {experienceData.map((item, index) => (
            <ExpandableCard
              key={item.id}
              className="bg-card border-border overflow-hidden"
              delay={0.2 * index}
              expandButtonLabel="View details & projects"
              details={
                <div className="space-y-6 pt-2">
                  <ExpandableAchievements achievements={item.achievements} />

                  <div className="mt-6">
                    <h4 className="font-medium text-sm uppercase tracking-wider text-primary/80 mb-3">
                      <Lightbulb className="h-4 w-4 inline-block mr-1" /> Key Projects
                    </h4>
                    <div className="space-y-3">
                      {item.projects.map((project, idx) => (
                        <motion.div
                          key={project.name}
                          className="p-3 rounded-lg bg-primary/5 border border-primary/10"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 + idx * 0.1 }}
                        >
                          <h5 className="font-medium text-primary flex items-center">
                            <Link className="h-3.5 w-3.5 mr-1.5" />
                            {project.name}
                          </h5>
                          <p className="text-sm mt-1 text-foreground/70">{project.description}</p>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {project.technologies.map(tech => (
                              <span key={tech} className="text-xs px-2 py-0.5 bg-primary/20 rounded-full text-primary/80">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-primary/70" />
                      <span className="text-muted-foreground">{item.team}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="h-4 w-4 text-primary/70" />
                      <span className="text-muted-foreground">{item.location}</span>
                    </div>
                  </div>
                </div>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] relative">
                <div className="absolute left-8 top-0 bottom-0 hidden md:block">
                  <motion.div
                    className="absolute left-[-8px] top-8 w-4 h-4 rounded-full bg-primary"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.4 * index, duration: 0.3 }}
                    viewport={{ once: true }}
                  />
                  <div className="h-full border-l-2 border-muted ml-[-1px]" />
                </div>

                <CardHeader className="pb-2 md:pl-16">
                  <div className="flex items-center gap-2 mb-1">
                    <Building className="h-4 w-4 text-primary" />
                    <CardDescription className="text-primary font-medium">
                      {item.company}
                    </CardDescription>
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <Calendar className="h-3 w-3" />
                    {item.period}
                  </div>
                </CardHeader>

                <CardContent className="pt-4 md:pt-8">
                  <p className="text-foreground/80 mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill, idx) => (
                      <motion.span
                        key={skill}
                        className="tech-badge sparkle-hover"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{
                          opacity: 1,
                          scale: 1,
                          transition: {
                            delay: 0.3 + (idx * 0.05),
                            duration: 0.3,
                            ease: "easeOut"
                          }
                        }}
                        whileHover={{
                          scale: 1.1,
                          y: -2,
                          transition: {
                            duration: 0.2,
                            type: "spring",
                            stiffness: 400
                          }
                        }}
                        viewport={{ once: true }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </CardContent>
              </div>
            </ExpandableCard>
          ))}
        </div>
      </div>
    </section>
  );
}
