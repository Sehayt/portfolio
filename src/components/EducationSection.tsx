"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedTitle } from "@/components/ui/animated-section";
import { ExpandableCard, ExpandableAchievements } from "@/components/ui/expandable-card";
import { motion } from "framer-motion";
import { Calendar, GraduationCap, BookOpen, Award, Bookmark, ExternalLink } from "lucide-react";
import { ImageModal, useModal } from "@/components/ui/modal";
import { useState } from "react";

const educationData = [
  {
    id: 1,
    period: "2014 - 2018",
    institution: "Stanford University",
    degree: "Bachelor of Science in Computer Science",
    description: "Graduated with honors, focusing on Human-Computer Interaction and Web Technologies.",
    icon: "🎓",
    achievements: [
      "Dean's List for Academic Excellence (2015-2018)",
      "Senior Project: Developed an accessible web platform for online learning",
      "Teaching Assistant for Introduction to Web Development course",
      "Member of Computer Science Student Association",
      "Participated in Stanford's annual hackathon, winning 2nd place in 2017"
    ],
    courses: [
      "Data Structures and Algorithms",
      "Human-Computer Interaction",
      "Web Application Development",
      "Database Systems",
      "Computer Networks"
    ],
    certificates: [
      {
        name: "Bachelor's Degree Certificate",
        image: "https://ext.same-assets.com/0/1349013658.svg",
        date: "June 2018"
      }
    ]
  },
  {
    id: 2,
    period: "2018 - 2020",
    institution: "Massachusetts Institute of Technology",
    degree: "Master of Science in Computer Science",
    description:
      "Specialized in User Experience Design and Frontend Architecture with a minor in Artificial Intelligence.",
    icon: "🖥️",
    achievements: [
      "GPA: 3.92/4.0",
      "Master's Thesis: 'Improving Web Accessibility Through AI-Assisted Interface Design'",
      "Research Assistant in the Human-Computer Interaction Lab",
      "Published paper in ACM CHI Conference 2020",
      "Led frontend development for department's research showcase website"
    ],
    courses: [
      "Advanced User Interface Design",
      "Frontend Architecture Patterns",
      "Machine Learning Fundamentals",
      "Design Thinking for Engineers",
      "Data Visualization"
    ],
    certificates: [
      {
        name: "Master's Degree Certificate",
        image: "https://ext.same-assets.com/0/3072991592.svg",
        date: "May 2020"
      },
      {
        name: "Research Excellence Award",
        image: "https://ext.same-assets.com/0/2715258859.svg",
        date: "April 2020"
      }
    ]
  },
  {
    id: 3,
    period: "2022",
    institution: "Google UX Design Professional Certificate",
    degree: "UX Design Certification",
    description:
      "Completed comprehensive coursework in user experience research, wireframing, prototyping, and usability testing.",
    icon: "🎯",
    achievements: [
      "Completed all 7 courses with distinction",
      "Capstone Project: Redesigned e-commerce mobile app with 25% improved conversion rate",
      "Conducted user interviews and usability testing with 20+ participants",
      "Created design system using Figma for consistent UX across products",
      "Applied accessibility best practices to improve inclusive design"
    ],
    courses: [
      "Foundations of UX Design",
      "UX Research and Testing",
      "Creating High-Fidelity Designs",
      "Responsive Web Design",
      "Design for Accessibility"
    ],
    certificates: [
      {
        name: "Google UX Design Certificate",
        image: "https://ext.same-assets.com/0/1462517727.svg",
        date: "December 2022"
      }
    ]
  },
];

export default function EducationSection() {
  const certificateModal = useModal();
  const [selectedCertificate, setSelectedCertificate] = useState<{
    image: string;
    name: string;
    date?: string;
  } | null>(null);

  const openCertificateModal = (certificate: { image: string; name: string; date?: string }) => {
    setSelectedCertificate(certificate);
    certificateModal.open();
  };

  return (
    <section id="education" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedTitle className="text-center">
          <h2 className="section-title">Education Journey</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Academic background and continuous learning that shapes my professional expertise
          </p>
        </AnimatedTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {educationData.map((item, index) => (
            <ExpandableCard
              key={item.id}
              className="bg-card border-border overflow-hidden"
              delay={0.1 * index}
              expandButtonLabel="View courses & achievements"
              details={
                <div className="space-y-6">
                  <ExpandableAchievements achievements={item.achievements} />

                  <div className="mt-4">
                    <h4 className="font-medium text-sm uppercase tracking-wider text-primary/80 mb-2 flex items-center">
                      <BookOpen className="h-4 w-4 mr-1.5" /> Key Courses
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {item.courses.map((course, i) => (
                        <motion.span
                          key={i}
                          className="text-sm bg-primary/10 px-3 py-1 rounded-full text-primary/90 sparkle-hover"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            transition: {
                              delay: 0.2 + (i * 0.05),
                              duration: 0.3,
                              ease: "easeOut"
                            }
                          }}
                          whileHover={{
                            scale: 1.05,
                            y: -2,
                            transition: {
                              duration: 0.2,
                              type: "spring",
                              stiffness: 300
                            }
                          }}
                        >
                          {course}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {item.certificates && item.certificates.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-medium text-sm uppercase tracking-wider text-primary/80 mb-3 flex items-center">
                        <Award className="h-4 w-4 mr-1.5" /> Certificates
                      </h4>
                      <div className="space-y-2">
                        {item.certificates.map((certificate, i) => (
                          <motion.div
                            key={i}
                            className="p-3 rounded-lg bg-primary/5 border border-primary/10 flex justify-between items-center cursor-pointer"
                            onClick={() => openCertificateModal(certificate)}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                            whileHover={{
                              scale: 1.02,
                              backgroundColor: "rgba(var(--primary), 0.1)",
                              transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center gap-2">
                              <Bookmark className="h-4 w-4 text-primary" />
                              <div>
                                <h5 className="font-medium text-sm">{certificate.name}</h5>
                                {certificate.date && (
                                  <p className="text-xs text-muted-foreground">{certificate.date}</p>
                                )}
                              </div>
                            </div>
                            <ExternalLink className="h-4 w-4 text-primary/60" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              }
            >
              <CardHeader className="pb-2">
                <motion.div
                  className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xl mb-4 pulse-element"
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.2, type: "spring" }
                  }}
                >
                  {item.icon}
                </motion.div>
                <div className="text-sm text-primary mb-2 flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1.5" />
                  {item.period}
                </div>
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-primary/70" />
                  {item.institution}
                </CardTitle>
                <CardDescription className="text-muted-foreground font-medium pl-7">
                  {item.degree}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </ExpandableCard>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <ImageModal
          isOpen={certificateModal.isOpen}
          onClose={certificateModal.close}
          imageSrc={selectedCertificate.image}
          alt={`${selectedCertificate.name} Certificate`}
          caption={`${selectedCertificate.name}${selectedCertificate.date ? ` - Issued: ${selectedCertificate.date}` : ''}`}
        />
      )}
    </section>
  );
}
