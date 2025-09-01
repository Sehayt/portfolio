"use client";

import { useState } from "react";
import { Timeline, TimelineItem } from "@/components/ui/timeline";
import { AnimatedTitle } from "@/components/ui/animated-section";
import { GraduationCap, Calendar, BookOpen, Award, ChevronRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { ImageModal, useModal } from "@/components/ui/modal";
import { useLanguage } from "@/lib/i18n-context";

// Use the same education data structure from the EducationSection
const educationData = [
  {
    id: 1,
    period: "2019 - 2022",
    institution: "THE SCHOOL OF INFORMATION SCIENCES (ESI)",
    degree: "State Engineer Degree in Data and Knowledge",
    location: "Rabat, Morocco",
    description: "Earned a State Engineer Degree specializing in Data and Knowledge engineering, focusing on advanced data processing techniques and knowledge management systems.",
    icon: "🎓",
    achievements: [
      "Specialized in data engineering and knowledge management",
      "Developed expertise in Python, Java, SQL, and data processing frameworks",
      "Participated in academic research on machine learning applications",
      "Member of technical teams in clubs like Enactus and Geni Entreprise",
      "Completed internships focused on data science and analytics"
    ],
    courses: [
      "Data Engineering",
      "Machine Learning",
      "Database Systems",
      "Web Application Development",
      "Big Data Processing",
      "AI Fundamentals"
    ],
    certificates: [
      {
        name: "State Engineer Degree Certificate",
        //image: "/diplome.jpg",
        image: "https://ext.same-assets.com/0/1349013658.svg",
        date: "June 2022"
      }
    ]
  },
  {
    id: 2,
    period: "2017 - 2019",
    institution: "Preparatory Classes for Engineering Schools (CPGE)",
    degree: "Mathematics - Physics (MP)",
    location: "Casablanca, Morocco",
    description: "Completed intensive two-year preparatory program focusing on advanced mathematics and physics, providing strong analytical foundations for engineering studies.",
    icon: "🧮",
    achievements: [
      "Mastered advanced mathematical concepts and physical theories",
      "Developed strong problem-solving and analytical skills",
      "Prepared for and passed competitive entrance exams for engineering schools",
      "Ranked among top students in national competitive exams",
      "Built strong foundations in scientific and engineering principles"
    ],
    courses: [
      "Advanced Mathematics",
      "Theoretical Physics",
      "Linear Algebra",
      "Differential Equations",
      "Mechanics",
      "Scientific Computing"
    ],
    certificates: []
  }
];

// Certification data
const certificationData = {
  id: 3,
  period: "2022 - 2023",
  institution: "Professional Certifications",
  degree: "Cloud & Data Engineering Certifications",
  location: "Online",
  description: "Attained multiple professional certifications in cloud technologies, data engineering, and project management.",
  icon: "🏆",
  achievements: [
    "Google Cloud Associate Data Practitioner",
    "Astronomer Certification for Apache Airflow Fundamentals",
    "Databricks Lakehouse Fundamentals",
    "Scrum Foundation Professional Certification (SFPC™)"
  ],
  courses: [],
  certificates: [
    {
      name: "Google Cloud Associate Data Practitioner",
      image: "https://ext.same-assets.com/0/3072991592.svg",
      date: "2023"
    },
    {
      name: "Astronomer Certification - Apache Airflow",
      image: "https://ext.same-assets.com/0/2715258859.svg",
      date: "2023"
    },
    {
      name: "Databricks Lakehouse Fundamentals",
      image: "https://ext.same-assets.com/0/1462517727.svg",
      date: "2022"
    },
    {
      name: "Scrum Foundation Professional Certification",
      image: "https://ext.same-assets.com/0/2715258859.svg",
      date: "2022"
    }
  ]
};

// Add certifications to education data
const fullEducationData = [...educationData, certificationData];

export default function EducationTimelineSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const certificateModal = useModal();
  const [selectedCertificate, setSelectedCertificate] = useState<{
    image: string;
    name: string;
    date?: string;
  } | null>(null);
  const { t } = useLanguage();

  const openCertificateModal = (certificate: { image: string; name: string; date?: string }) => {
    setSelectedCertificate(certificate);
    certificateModal.open();
  };

  const toggleActive = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="education-timeline" className="py-20 bg-[hsl(var(--section-bg))]">
      <div className="container mx-auto px-4">
        <AnimatedTitle className="text-center mb-16">
          <h2 className="section-title">{t('education.title', 'Education Journey')}</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            {t('education.subtitle', 'An interactive timeline of my academic background and professional certifications')}
          </p>
        </AnimatedTitle>

        <Timeline className="max-w-5xl mx-auto">
          {fullEducationData.map((education, index) => (
            <TimelineItem
              key={education.id}
              year={education.period}
              title={education.institution}
              subtitle={education.degree}
              side={index % 2 === 0 ? "left" : "right"}
              index={index}
              onClick={() => toggleActive(index)}
              isActive={activeIndex === index}
              icon={index === 2 ? <Award className="h-5 w-5 text-primary" /> : <GraduationCap className="h-5 w-5 text-primary" />}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{education.location}</span>
                </div>
                <p className="text-foreground/80">{education.description}</p>

                {activeIndex === index && (
                  <>
                    {/* Achievements */}
                    <div className="mt-4">
                      <h4 className="font-medium text-sm uppercase tracking-wider text-primary/80 mb-2 flex items-center">
                        <Award className="h-4 w-4 mr-1.5" /> {index === 2 ? 'Certifications' : 'Key Achievements'}
                      </h4>
                      <ul className="space-y-2">
                        {education.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            className="flex items-start gap-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 + i * 0.1 }}
                          >
                            <span className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-0.5">
                              ✓
                            </span>
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Courses - only show if there are courses */}
                    {education.courses && education.courses.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium text-sm uppercase tracking-wider text-primary/80 mb-2 flex items-center">
                          <BookOpen className="h-4 w-4 mr-1.5" /> Key Courses
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {education.courses.map((course, i) => (
                            <motion.span
                              key={i}
                              className="text-sm bg-primary/10 px-3 py-1 rounded-full text-primary/90"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                                transition: {
                                  delay: 0.2 + i * 0.1,
                                  duration: 0.3,
                                  ease: "easeOut"
                                }
                              }}
                              whileHover={{ scale: 1.05 }}
                            >
                              {course}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Certificates */}
                    {education.certificates && education.certificates.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium text-sm uppercase tracking-wider text-primary/80 mb-2 flex items-center">
                          <Award className="h-4 w-4 mr-1.5" /> Certificates
                        </h4>
                        <div className="space-y-2">
                          {education.certificates.map((certificate, i) => (
                            <motion.div
                              key={i}
                              className="p-3 rounded-lg bg-primary/5 border border-primary/10 flex justify-between items-center cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                openCertificateModal(certificate);
                              }}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                              whileHover={{
                                scale: 1.02,
                                backgroundColor: "rgba(var(--primary), 0.1)",
                                transition: { duration: 0.2 }
                              }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-primary" />
                                <div>
                                  <h5 className="font-medium text-sm">{certificate.name}</h5>
                                  {certificate.date && (
                                    <p className="text-xs text-muted-foreground">{certificate.date}</p>
                                  )}
                                </div>
                              </div>
                              <ChevronRight className="h-4 w-4 text-primary/60" />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </TimelineItem>
          ))}
        </Timeline>

        <div className="flex justify-center mt-12">
          <motion.p
            className="text-sm text-muted-foreground text-center max-w-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            {t('education.clickPrompt', 'Click on any milestone to see more details about my educational journey and achievements.')}
          </motion.p>
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
//----------------------------------------------------------------------------------------------------------------------------
// "use client";

// import { useState } from "react";
// import { Timeline, TimelineItem } from "@/components/ui/timeline";
// import { AnimatedTitle } from "@/components/ui/animated-section";
// import { GraduationCap, Calendar, BookOpen, Award, ChevronRight, MapPin } from "lucide-react";
// import { motion } from "framer-motion";
// import { ImageModal, useModal } from "@/components/ui/modal";
// import { useLanguage } from "@/lib/i18n-context";

// export default function EducationTimelineSection() {
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);
//   const certificateModal = useModal();
//   const [selectedCertificate, setSelectedCertificate] = useState<{
//     image: string;
//     name: string;
//     date?: string;
//   } | null>(null);
//   const { t } = useLanguage();

//   // Education data with translation keys
//   const getEducationData = () => [
//     {
//       id: 1,
//       period: "2019 - 2022",
//       institution: t('education.esi.institution', 'THE SCHOOL OF INFORMATION SCIENCES (ESI)'),
//       degree: t('education.esi.degree', 'State Engineer Degree in Data and Knowledge'),
//       location: "Rabat, Morocco",
//       description: t('education.esi.description', 'Earned a State Engineer Degree specializing in Data and Knowledge engineering, focusing on advanced data processing techniques and knowledge management systems.'),
//       icon: "🎓",
//       achievements: [
//         "Specialized in data engineering and knowledge management",
//         "Developed expertise in Python, Java, SQL, and data processing frameworks",
//         "Participated in academic research on machine learning applications",
//         "Member of technical teams in clubs like Enactus and Geni Entreprise",
//         "Completed internships focused on data science and analytics"
//       ],
//       courses: [
//         "Data Engineering",
//         "Machine Learning",
//         "Database Systems",
//         "Web Application Development",
//         "Big Data Processing",
//         "AI Fundamentals"
//       ],
//       certificates: [
//         {
//           name: "State Engineer Degree Certificate",
//           image: "https://ext.same-assets.com/0/1349013658.svg",
//           date: "June 2022"
//         }
//       ]
//     },
//     {
//       id: 2,
//       period: "2017 - 2019",
//       institution: t('education.cpge.institution', 'Preparatory Classes for Engineering Schools (CPGE)'),
//       degree: t('education.cpge.degree', 'Mathematics - Physics (MP)'),
//       location: "Casablanca, Morocco",
//       description: t('education.cpge.description', 'Completed intensive two-year preparatory program focusing on advanced mathematics and physics, providing strong analytical foundations for engineering studies.'),
//       icon: "🧮",
//       achievements: [
//         "Mastered advanced mathematical concepts and physical theories",
//         "Developed strong problem-solving and analytical skills",
//         "Prepared for and passed competitive entrance exams for engineering schools",
//         "Ranked among top students in national competitive exams",
//         "Built strong foundations in scientific and engineering principles"
//       ],
//       courses: [
//         "Advanced Mathematics",
//         "Theoretical Physics",
//         "Linear Algebra",
//         "Differential Equations",
//         "Mechanics",
//         "Scientific Computing"
//       ],
//       certificates: []
//     },
//     {
//       id: 3,
//       period: "2022 - 2023",
//       institution: t('education.certifications.institution', 'Professional Certifications'),
//       degree: t('education.certifications.degree', 'Cloud & Data Engineering Certifications'),
//       location: "Online",
//       description: t('education.certifications.description', 'Attained multiple professional certifications in cloud technologies, data engineering, and project management.'),
//       icon: "🏆",
//       achievements: [
//         "Google Cloud Associate Data Practitioner",
//         "Astronomer Certification for Apache Airflow Fundamentals",
//         "Databricks Lakehouse Fundamentals",
//         "Scrum Foundation Professional Certification (SFPC™)"
//       ],
//       courses: [],
//       certificates: [
//         {
//           name: "Google Cloud Associate Data Practitioner",
//           image: "https://ext.same-assets.com/0/3072991592.svg",
//           date: "2023"
//         },
//         {
//           name: "Astronomer Certification - Apache Airflow",
//           image: "https://ext.same-assets.com/0/2715258859.svg",
//           date: "2023"
//         },
//         {
//           name: "Databricks Lakehouse Fundamentals",
//           image: "https://ext.same-assets.com/0/1462517727.svg",
//           date: "2022"
//         },
//         {
//           name: "Scrum Foundation Professional Certification",
//           image: "https://ext.same-assets.com/0/2715258859.svg",
//           date: "2022"
//         }
//       ]
//     }
//   ];

//   const educationData = getEducationData();

//   const openCertificateModal = (certificate: { image: string; name: string; date?: string }) => {
//     setSelectedCertificate(certificate);
//     certificateModal.open();
//   };

//   const toggleActive = (index: number) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   return (
//     <section id="education-timeline" className="py-20 bg-[hsl(var(--section-bg))]">
//       <div className="container mx-auto px-4">
//         <AnimatedTitle className="text-center mb-16">
//           <h2 className="section-title">{t('education.title', 'Education Journey')}</h2>
//           <p className="text-center text-muted-foreground max-w-2xl mx-auto">
//             {t('education.subtitle', 'An interactive timeline of my academic background and professional certifications')}
//           </p>
//         </AnimatedTitle>

//         <Timeline className="max-w-5xl mx-auto">
//           {educationData.map((education, index) => (
//             <TimelineItem
//               key={education.id}
//               year={education.period}
//               title={education.institution}
//               subtitle={education.degree}
//               side={index % 2 === 0 ? "left" : "right"}
//               index={index}
//               onClick={() => toggleActive(index)}
//               isActive={activeIndex === index}
//               icon={index === 2 ? <Award className="h-5 w-5 text-primary" /> : <GraduationCap className="h-5 w-5 text-primary" />}
//             >
//               <div className="space-y-4">
//                 <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1">
//                   <MapPin className="h-3.5 w-3.5" />
//                   <span>{education.location}</span>
//                 </div>
//                 <p className="text-foreground/80">{education.description}</p>

//                 {activeIndex === index && (
//                   <>
//                     {/* Achievements */}
//                     <div className="mt-4">
//                       <h4 className="font-medium text-sm uppercase tracking-wider text-primary/80 mb-2 flex items-center">
//                         <Award className="h-4 w-4 mr-1.5" /> {index === 2 ? 'Certifications' : 'Key Achievements'}
//                       </h4>
//                       <ul className="space-y-2">
//                         {education.achievements.map((achievement, i) => (
//                           <motion.li
//                             key={i}
//                             className="flex items-start gap-2"
//                             initial={{ opacity: 0, x: -10 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.3, delay: 0.1 + i * 0.1 }}
//                           >
//                             <span className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-0.5">
//                               ✓
//                             </span>
//                             <span>{achievement}</span>
//                           </motion.li>
//                         ))}
//                       </ul>
//                     </div>

//                     {/* Courses - only show if there are courses */}
//                     {education.courses && education.courses.length > 0 && (
//                       <div className="mt-4">
//                         <h4 className="font-medium text-sm uppercase tracking-wider text-primary/80 mb-2 flex items-center">
//                           <BookOpen className="h-4 w-4 mr-1.5" /> Key Courses
//                         </h4>
//                         <div className="flex flex-wrap gap-2">
//                           {education.courses.map((course, i) => (
//                             <motion.span
//                               key={i}
//                               className="text-sm bg-primary/10 px-3 py-1 rounded-full text-primary/90"
//                               initial={{ opacity: 0, scale: 0.8 }}
//                               animate={{
//                                 opacity: 1,
//                                 scale: 1,
//                                 transition: {
//                                   delay: 0.2 + i * 0.1,
//                                   duration: 0.3,
//                                   ease: "easeOut"
//                                 }
//                               }}
//                               whileHover={{ scale: 1.05 }}
//                             >
//                               {course}
//                             </motion.span>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {/* Certificates */}
//                     {education.certificates && education.certificates.length > 0 && (
//                       <div className="mt-4">
//                         <h4 className="font-medium text-sm uppercase tracking-wider text-primary/80 mb-2 flex items-center">
//                           <Award className="h-4 w-4 mr-1.5" /> Certificates
//                         </h4>
//                         <div className="space-y-2">
//                           {education.certificates.map((certificate, i) => (
//                             <motion.div
//                               key={i}
//                               className="p-3 rounded-lg bg-primary/5 border border-primary/10 flex justify-between items-center cursor-pointer"
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 openCertificateModal(certificate);
//                               }}
//                               initial={{ opacity: 0, y: 10 }}
//                               animate={{ opacity: 1, y: 0 }}
//                               transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
//                               whileHover={{
//                                 scale: 1.02,
//                                 backgroundColor: "rgba(var(--primary), 0.1)",
//                                 transition: { duration: 0.2 }
//                               }}
//                               whileTap={{ scale: 0.98 }}
//                             >
//                               <div className="flex items-center gap-2">
//                                 <Calendar className="h-4 w-4 text-primary" />
//                                 <div>
//                                   <h5 className="font-medium text-sm">{certificate.name}</h5>
//                                   {certificate.date && (
//                                     <p className="text-xs text-muted-foreground">{certificate.date}</p>
//                                   )}
//                                 </div>
//                               </div>
//                               <ChevronRight className="h-4 w-4 text-primary/60" />
//                             </motion.div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             </TimelineItem>
//           ))}
//         </Timeline>

//         <div className="flex justify-center mt-12">
//           <motion.p
//             className="text-sm text-muted-foreground text-center max-w-md"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5 }}
//             viewport={{ once: true }}
//           >
//             {t('education.clickPrompt', 'Click on any milestone to see more details about my educational journey and achievements.')}
//           </motion.p>
//         </div>
//       </div>

//       {/* Certificate Modal */}
//       {selectedCertificate && (
//         <ImageModal
//           isOpen={certificateModal.isOpen}
//           onClose={certificateModal.close}
//           imageSrc={selectedCertificate.image}
//           alt={`${selectedCertificate.name} Certificate`}
//           caption={`${selectedCertificate.name}${selectedCertificate.date ? ` - Issued: ${selectedCertificate.date}` : ''}`}
//         />
//       )}
//     </section>
//   );
// }
