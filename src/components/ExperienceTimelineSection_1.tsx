"use client";

import { useState } from "react";
import { Timeline, TimelineItem } from "@/components/ui/timeline";
import { AnimatedTitle } from "@/components/ui/animated-section";
import { Building, Briefcase, Users, Calendar, Award, Link, ChevronDown, ChevronUp, Lightbulb, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n-context";

// Using the same experience data
const experienceData = [
  {
    id: 1,
    title: "Data & Analytics Engineer",
    company: "Alten",
    period: "September 2022 - Present",
    description:
      "Data & Analytics Engineer with dual roles supporting corporate strategy and analytics engineering for major clients like Bouygues Telecom and Renault. Implementing data analysis systems to support strategic decision-making using cloud technologies.",
    skills: ["GCP", "Azure", "Python", "PostgreSQL", "Power BI", "BigQuery", "Data Pipelines"],
    achievements: [
      "Designed data pipelines using Google Cloud Platform services for efficient data processing",
      "Used BigQuery for complex queries and data analysis, optimizing processing efficiency",
      "Developed Power BI dashboards for real-time monitoring of productivity and operational metrics",
      "Implemented real-time data flows with Google Cloud services for continuous data ingestion from Salesforce",
      "Created dynamic reports in Power BI, integrating complex data models for data-driven decisions",
      "Collaborated on market analysis and recruitment process optimization initiatives"
    ],
    projects: [
      {
        name: "Corporate & Strategy Analytics",
        description: "Implemented data analysis systems using business intelligence tools (Azure, Python, Power Platform) for data automation and reporting",
        technologies: ["Azure", "Python", "Power BI", "Power Apps", "Power Automate"]
      },
      {
        name: "Bouygues Telecom Data Pipelines",
        description: "Designed and optimized data pipelines on Google Cloud Platform for efficient data processing and analysis",
        technologies: ["GCP", "BigQuery", "Cloud Functions", "Data Studio", "Python"]
      },
      {
        name: "Renault Salesforce Integration",
        description: "Implemented real-time data flows from Salesforce with dynamic Power BI reporting dashboards",
        technologies: ["GCP", "Salesforce API", "Power BI", "Data Factory", "Cloud Storage"]
      }
    ],
    team: "Data & Analytics Team",
    location: "Rabat, Morocco"
  },
  {
    id: 2,
    title: "Data & Analytics Engineer",
    company: "OCP Solutions",
    period: "March 2022 - September 2022",
    description:
      "Developed a generic framework for machine learning techniques, with a focus on multilingual summary models. Implemented NLP solutions and integrated AI features with web applications.",
    skills: ["Parquet", "Elasticsearch", "Spark", "Hugging Face", "PyTorch", "Flask", "Next.js", "MongoDB", "MySQL"],
    achievements: [
      "Developed a generic framework for machine learning techniques, including multilingual summary models",
      "Deployed NLP models using Hugging Face and PyTorch for automatic text summarization",
      "Integrated APIs with Flask to add AI features to interactive web applications",
      "Worked with document processing pipelines using Elasticsearch and Parquet for efficient data storage",
      "Implemented full-stack solutions connecting ML models with front-end interfaces"
    ],
    projects: [
      {
        name: "Multilingual Text Summarization",
        description: "Developed and deployed NLP models for automatic multilingual text summarization",
        technologies: ["Hugging Face", "PyTorch", "NLTK", "Spacy"]
      },
      {
        name: "AI Web Integration",
        description: "Integrated machine learning models with web applications through REST APIs",
        technologies: ["Flask", "Next.js", "MongoDB", "REST API"]
      },
      {
        name: "Document Processing Pipeline",
        description: "Created data processing pipeline for document storage and retrieval",
        technologies: ["Elasticsearch", "Spark", "Parquet", "MySQL"]
      }
    ],
    team: "AI & Machine Learning Team",
    location: "Casablanca, Morocco"
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "1M WEB LTD",
    period: "July 2021 - September 2021",
    description:
      "Developed a machine learning model for automatic CV information extraction. Leveraged NLP libraries for CV data analysis and extraction, automated workflows for parallel CV processing.",
    skills: ["Python", "NLTK", "SpaCy", "TextBlob", "Apache Airflow", "Agile"],
    achievements: [
      "Developed a machine learning model for automatic CV information extraction",
      "Leveraged NLP libraries (NLTK, SpaCy, TextBlob) for CV data analysis and extraction",
      "Automated workflows using Apache Airflow for parallel CV processing",
      "Worked in an Agile environment to integrate models into existing systems",
      "Enhanced recruitment processes through AI-powered document analysis"
    ],
    projects: [
      {
        name: "CV Information Extraction",
        description: "ML-powered system to automatically extract structured data from CVs and resumes",
        technologies: ["Python", "NLTK", "SpaCy", "TextBlob"]
      },
      {
        name: "Workflow Automation",
        description: "Parallel processing system for CV analysis using Apache Airflow",
        technologies: ["Apache Airflow", "Python", "Docker"]
      }
    ],
    team: "Data Science Team",
    location: "London, United Kingdom (Remote)"
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "ISPITS, CHU",
    period: "June 2020 - August 2020",
    description:
      "Designed and developed a mobile app with Java and Android Studio for monitoring smartphone usage. Built a Flask backend for managing app data and implemented real-time notifications.",
    skills: ["Java", "Android Studio", "Figma", "Flask", "UI/UX Design"],
    achievements: [
      "Designed and developed a mobile app with Java and Android Studio for monitoring smartphone usage",
      "Built a Flask backend for managing app data, user sessions, and frontend-server communication",
      "Implemented real-time notifications to alert users of risky behaviors",
      "Created UI/UX designs using Figma for intuitive user experience",
      "Integrated data collection and analysis components for usage pattern detection"
    ],
    projects: [
      {
        name: "Smartphone Usage Monitor",
        description: "Mobile application for tracking and analyzing smartphone usage patterns",
        technologies: ["Java", "Android Studio", "SQLite"]
      },
      {
        name: "App Backend System",
        description: "Server-side application for data storage, analysis, and user management",
        technologies: ["Flask", "Python", "RESTful API"]
      },
      {
        name: "UI/UX Design",
        description: "Design of intuitive user interfaces and experiences for mobile application",
        technologies: ["Figma", "Material Design"]
      }
    ],
    team: "Mobile Development Team",
    location: "Fès, Morocco"
  }
];

// Project Type
type Project = {
  name: string;
  description: string;
  technologies: string[];
};

export default function ExperienceTimelineSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [expandedProjects, setExpandedProjects] = useState<boolean>(false);
  const { t } = useLanguage();

  // Toggle active index
  const toggleActive = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
      setExpandedProjects(false);
    } else {
      setActiveIndex(index);
      setExpandedProjects(false);
    }
  };

  // Toggle expanded projects
  const toggleProjects = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedProjects(!expandedProjects);
  };

  return (
    <section id="experience-timeline" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedTitle className="text-center mb-16">
          <h2 className="section-title">{t('experience.title', 'Professional Journey')}</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            {t('experience.subtitle', 'An interactive timeline showcasing my career progression and key projects')}
          </p>
        </AnimatedTitle>

        <Timeline className="max-w-5xl mx-auto">
          {experienceData.map((experience, index) => (
            <TimelineItem
              key={experience.id}
              year={experience.period}
              title={experience.title}
              subtitle={experience.company}
              side={index % 2 === 0 ? "left" : "right"}
              index={index}
              onClick={() => toggleActive(index)}
              isActive={activeIndex === index}
              icon={<Briefcase className="h-5 w-5 text-primary" />}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-primary/80" />
                  <span className="text-sm text-muted-foreground">{experience.location}</span>
                </div>
                <p className="text-foreground/80">{experience.description}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {experience.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        transition: {
                          delay: 0.1 + i * 0.05,
                          duration: 0.3,
                          ease: "easeOut"
                        }
                      }}
                      whileHover={{ scale: 1.05, y: -1 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                {/* Additional content when item is active */}
                {activeIndex === index && (
                  <div className="mt-4 space-y-5 pt-3 border-t border-border">
                    {/* Top Achievements */}
                    <div>
                      <h4 className="font-medium text-sm uppercase tracking-wider text-primary/80 mb-3 flex items-center">
                        <Award className="h-4 w-4 mr-1.5" /> Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {experience.achievements.slice(0, 3).map((achievement, i) => (
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

                    {/* Projects Section */}
                    <div>
                      <div
                        className="flex justify-between items-center cursor-pointer mb-3"
                        onClick={toggleProjects}
                      >
                        <h4 className="font-medium text-sm uppercase tracking-wider text-primary/80 flex items-center">
                          <Lightbulb className="h-4 w-4 mr-1.5" /> Key Projects
                        </h4>
                        <button
                          className="text-primary/70 hover:text-primary p-1 rounded-full hover:bg-primary/10 transition-colors"
                        >
                          {expandedProjects ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                      </div>

                      <AnimatePresence>
                        {(expandedProjects || !expandedProjects) && (
                          <div className="space-y-3">
                            {experience.projects.slice(0, expandedProjects ? undefined : 1).map((project, idx) => (
                              <motion.div
                                key={project.name}
                                className="p-3 rounded-lg bg-primary/5 border border-primary/10"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
                                transition={{ duration: 0.3, delay: 0.2 + idx * 0.1 }}
                              >
                                <h5 className="font-medium text-primary flex items-center">
                                  <Link className="h-3.5 w-3.5 mr-1.5" />
                                  {project.name}
                                </h5>
                                <p className="text-sm mt-1 text-foreground/70">
                                  {project.description}
                                </p>
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                  {project.technologies.map(tech => (
                                    <span
                                      key={tech}
                                      className="text-xs px-2 py-0.5 bg-primary/20 rounded-full text-primary/80"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </AnimatePresence>

                      {!expandedProjects && experience.projects.length > 1 && (
                        <motion.button
                          className="text-sm text-primary hover:text-primary/80 hover:underline mt-2 flex items-center"
                          onClick={toggleProjects}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          whileHover={{ x: 2 }}
                        >
                          Show {experience.projects.length - 1} more project{experience.projects.length > 2 ? 's' : ''}
                          <ChevronDown className="h-3 w-3 ml-1" />
                        </motion.button>
                      )}
                    </div>

                    {/* Team Information */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4 text-primary/70" />
                      <span>{experience.team}</span>
                    </div>
                  </div>
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
            {t('experience.clickPrompt', 'Click on any milestone to view details about my role, achievements, and key projects.')}
          </motion.p>
        </div>
      </div>
    </section>
  );
}






//------------------------------------------------------------------------------------------------------------------------

// "use client";

// import { useState } from "react";
// import { Timeline, TimelineItem } from "@/components/ui/timeline";
// import { AnimatedTitle } from "@/components/ui/animated-section";
// import { Building, Briefcase, Users, Calendar, Award, Link, ChevronDown, ChevronUp, Lightbulb, MapPin } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useLanguage } from "@/lib/i18n-context";

// // Project Type
// type Project = {
//   name: string;
//   description: string;
//   technologies: string[];
// };

// export default function ExperienceTimelineSection() {
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);
//   const [expandedProjects, setExpandedProjects] = useState<boolean>(false);
//   const { t } = useLanguage();

//   // Experience data with translation keys
//   const getExperienceData = () => [
//     {
//       id: 1,
//       title: t('experience.alten.title', 'Data & Analytics Engineer'),
//       company: "Alten",
//       period: "September 2022 - Present",
//       description: t('experience.alten.description', 'Data & Analytics Engineer with dual roles supporting corporate strategy and analytics engineering for major clients like Bouygues Telecom and Renault. Implementing data analysis systems to support strategic decision-making using cloud technologies.'),
//       skills: ["GCP", "Azure", "Python", "PostgreSQL", "Power BI", "BigQuery", "Data Pipelines"],
//       achievements: [
//         "Designed data pipelines using Google Cloud Platform services for efficient data processing",
//         "Used BigQuery for complex queries and data analysis, optimizing processing efficiency",
//         "Developed Power BI dashboards for real-time monitoring of productivity and operational metrics",
//         "Implemented real-time data flows with Google Cloud services for continuous data ingestion from Salesforce",
//         "Created dynamic reports in Power BI, integrating complex data models for data-driven decisions",
//         "Collaborated on market analysis and recruitment process optimization initiatives"
//       ],
//       projects: [
//         {
//           name: "Corporate & Strategy Analytics",
//           description: "Implemented data analysis systems using business intelligence tools (Azure, Python, Power Platform) for data automation and reporting",
//           technologies: ["Azure", "Python", "Power BI", "Power Apps", "Power Automate"]
//         },
//         {
//           name: "Bouygues Telecom Data Pipelines",
//           description: "Designed and optimized data pipelines on Google Cloud Platform for efficient data processing and analysis",
//           technologies: ["GCP", "BigQuery", "Cloud Functions", "Data Studio", "Python"]
//         },
//         {
//           name: "Renault Salesforce Integration",
//           description: "Implemented real-time data flows from Salesforce with dynamic Power BI reporting dashboards",
//           technologies: ["GCP", "Salesforce API", "Power BI", "Data Factory", "Cloud Storage"]
//         }
//       ],
//       team: "Data & Analytics Team",
//       location: "Rabat, Morocco"
//     },
//     {
//       id: 2,
//       title: t('experience.ocp.title', 'Data & Analytics Engineer'),
//       company: "OCP Solutions",
//       period: "March 2022 - September 2022",
//       description: t('experience.ocp.description', 'Developed a generic framework for machine learning techniques, with a focus on multilingual summary models. Implemented NLP solutions and integrated AI features with web applications.'),
//       skills: ["Parquet", "Elasticsearch", "Spark", "Hugging Face", "PyTorch", "Flask", "Next.js", "MongoDB", "MySQL"],
//       achievements: [
//         "Developed a generic framework for machine learning techniques, including multilingual summary models",
//         "Deployed NLP models using Hugging Face and PyTorch for automatic text summarization",
//         "Integrated APIs with Flask to add AI features to interactive web applications",
//         "Worked with document processing pipelines using Elasticsearch and Parquet for efficient data storage",
//         "Implemented full-stack solutions connecting ML models with front-end interfaces"
//       ],
//       projects: [
//         {
//           name: "Multilingual Text Summarization",
//           description: "Developed and deployed NLP models for automatic multilingual text summarization",
//           technologies: ["Hugging Face", "PyTorch", "NLTK", "Spacy"]
//         },
//         {
//           name: "AI Web Integration",
//           description: "Integrated machine learning models with web applications through REST APIs",
//           technologies: ["Flask", "Next.js", "MongoDB", "REST API"]
//         },
//         {
//           name: "Document Processing Pipeline",
//           description: "Created data processing pipeline for document storage and retrieval",
//           technologies: ["Elasticsearch", "Spark", "Parquet", "MySQL"]
//         }
//       ],
//       team: "AI & Machine Learning Team",
//       location: "Casablanca, Morocco"
//     },
//     {
//       id: 3,
//       title: t('experience.1mweb.title', 'Data Scientist'),
//       company: "1M WEB LTD",
//       period: "July 2021 - September 2021",
//       description: t('experience.1mweb.description', 'Developed a machine learning model for automatic CV information extraction. Leveraged NLP libraries for CV data analysis and extraction, automated workflows for parallel CV processing.'),
//       skills: ["Python", "NLTK", "SpaCy", "TextBlob", "Apache Airflow", "Agile"],
//       achievements: [
//         "Developed a machine learning model for automatic CV information extraction",
//         "Leveraged NLP libraries (NLTK, SpaCy, TextBlob) for CV data analysis and extraction",
//         "Automated workflows using Apache Airflow for parallel CV processing",
//         "Worked in an Agile environment to integrate models into existing systems",
//         "Enhanced recruitment processes through AI-powered document analysis"
//       ],
//       projects: [
//         {
//           name: "CV Information Extraction",
//           description: "ML-powered system to automatically extract structured data from CVs and resumes",
//           technologies: ["Python", "NLTK", "SpaCy", "TextBlob"]
//         },
//         {
//           name: "Workflow Automation",
//           description: "Parallel processing system for CV analysis using Apache Airflow",
//           technologies: ["Apache Airflow", "Python", "Docker"]
//         }
//       ],
//       team: "Data Science Team",
//       location: "London, United Kingdom (Remote)"
//     },
//     {
//       id: 4,
//       title: t('experience.ispits.title', 'Data Scientist'),
//       company: "ISPITS, CHU",
//       period: "June 2020 - August 2020",
//       description: t('experience.ispits.description', 'Designed and developed a mobile app with Java and Android Studio for monitoring smartphone usage. Built a Flask backend for managing app data and implemented real-time notifications.'),
//       skills: ["Java", "Android Studio", "Figma", "Flask", "UI/UX Design"],
//       achievements: [
//         "Designed and developed a mobile app with Java and Android Studio for monitoring smartphone usage",
//         "Built a Flask backend for managing app data, user sessions, and frontend-server communication",
//         "Implemented real-time notifications to alert users of risky behaviors",
//         "Created UI/UX designs using Figma for intuitive user experience",
//         "Integrated data collection and analysis components for usage pattern detection"
//       ],
//       projects: [
//         {
//           name: "Smartphone Usage Monitor",
//           description: "Mobile application for tracking and analyzing smartphone usage patterns",
//           technologies: ["Java", "Android Studio", "SQLite"]
//         },
//         {
//           name: "App Backend System",
//           description: "Server-side application for data storage, analysis, and user management",
//           technologies: ["Flask", "Python", "RESTful API"]
//         },
//         {
//           name: "UI/UX Design",
//           description: "Design of intuitive user interfaces and experiences for mobile application",
//           technologies: ["Figma", "Material Design"]
//         }
//       ],
//       team: "Mobile Development Team",
//       location: "Fès, Morocco"
//     }
//   ];

//   const experienceData = getExperienceData();

//   // Toggle active index
//   const toggleActive = (index: number) => {
//     if (activeIndex === index) {
//       setActiveIndex(null);
//       setExpandedProjects(false);
//     } else {
//       setActiveIndex(index);
//       setExpandedProjects(false);
//     }
//   };

//   // Toggle expanded projects
//   const toggleProjects = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setExpandedProjects(!expandedProjects);
//   };

//   return (
//     <section id="experience-timeline" className="py-20 bg-background">
//       <div className="container mx-auto px-4">
//         <AnimatedTitle className="text-center mb-16">
//           <h2 className="section-title">{t('experience.title', 'Professional Journey')}</h2>
//           <p className="text-center text-muted-foreground max-w-2xl mx-auto">
//             {t('experience.subtitle', 'An interactive timeline showcasing my career progression and key projects')}
//           </p>
//         </AnimatedTitle>

//         <Timeline className="max-w-5xl mx-auto">
//           {experienceData.map((experience, index) => (
//             <TimelineItem
//               key={experience.id}
//               year={experience.period}
//               title={experience.title}
//               subtitle={experience.company}
//               side={index % 2 === 0 ? "left" : "right"}
//               index={index}
//               onClick={() => toggleActive(index)}
//               isActive={activeIndex === index}
//               icon={<Briefcase className="h-5 w-5 text-primary" />}
//             >
//               <div className="space-y-4">
//                 <div className="flex items-center gap-2 mb-2">
//                   <MapPin className="h-4 w-4 text-primary/80" />
//                   <span className="text-sm text-muted-foreground">{experience.location}</span>
//                 </div>
//                 <p className="text-foreground/80">{experience.description}</p>

//                 {/* Skills */}
//                 <div className="flex flex-wrap gap-1.5 mt-3">
//                   {experience.skills.map((skill, i) => (
//                     <motion.span
//                       key={skill}
//                       className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary"
//                       initial={{ opacity: 0, scale: 0.8 }}
//                       animate={{
//                         opacity: 1,
//                         scale: 1,
//                         transition: {
//                           delay: 0.1 + i * 0.05,
//                           duration: 0.3,
//                           ease: "easeOut"
//                         }
//                       }}
//                       whileHover={{ scale: 1.05, y: -1 }}
//                     >
//                       {skill}
//                     </motion.span>
//                   ))}
//                 </div>

//                 {/* Additional content when item is active */}
//                 {activeIndex === index && (
//                   <div className="mt-4 space-y-5 pt-3 border-t border-border">
//                     {/* Top Achievements */}
//                     <div>
//                       <h4 className="font-medium text-sm uppercase tracking-wider text-primary/80 mb-3 flex items-center">
//                         <Award className="h-4 w-4 mr-1.5" /> Key Achievements
//                       </h4>
//                       <ul className="space-y-2">
//                         {experience.achievements.slice(0, 3).map((achievement, i) => (
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

//                     {/* Projects Section */}
//                     <div>
//                       <div
//                         className="flex justify-between items-center cursor-pointer mb-3"
//                         onClick={toggleProjects}
//                       >
//                         <h4 className="font-medium text-sm uppercase tracking-wider text-primary/80 flex items-center">
//                           <Lightbulb className="h-4 w-4 mr-1.5" /> Key Projects
//                         </h4>
//                         <button
//                           className="text-primary/70 hover:text-primary p-1 rounded-full hover:bg-primary/10 transition-colors"
//                         >
//                           {expandedProjects ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
//                         </button>
//                       </div>

//                       <AnimatePresence>
//                         {(expandedProjects || !expandedProjects) && (
//                           <div className="space-y-3">
//                             {experience.projects.slice(0, expandedProjects ? undefined : 1).map((project, idx) => (
//                               <motion.div
//                                 key={project.name}
//                                 className="p-3 rounded-lg bg-primary/5 border border-primary/10"
//                                 initial={{ opacity: 0, y: 10 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
//                                 transition={{ duration: 0.3, delay: 0.2 + idx * 0.1 }}
//                               >
//                                 <h5 className="font-medium text-primary flex items-center">
//                                   <Link className="h-3.5 w-3.5 mr-1.5" />
//                                   {project.name}
//                                 </h5>
//                                 <p className="text-sm mt-1 text-foreground/70">
//                                   {project.description}
//                                 </p>
//                                 <div className="flex flex-wrap gap-1.5 mt-2">
//                                   {project.technologies.map(tech => (
//                                     <span
//                                       key={tech}
//                                       className="text-xs px-2 py-0.5 bg-primary/20 rounded-full text-primary/80"
//                                     >
//                                       {tech}
//                                     </span>
//                                   ))}
//                                 </div>
//                               </motion.div>
//                             ))}
//                           </div>
//                         )}
//                       </AnimatePresence>

//                       {!expandedProjects && experience.projects.length > 1 && (
//                         <motion.button
//                           className="text-sm text-primary hover:text-primary/80 hover:underline mt-2 flex items-center"
//                           onClick={toggleProjects}
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           transition={{ delay: 0.3 }}
//                           whileHover={{ x: 2 }}
//                         >
//                           Show {experience.projects.length - 1} more project{experience.projects.length > 2 ? 's' : ''}
//                           <ChevronDown className="h-3 w-3 ml-1" />
//                         </motion.button>
//                       )}
//                     </div>

//                     {/* Team Information */}
//                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                       <Users className="h-4 w-4 text-primary/70" />
//                       <span>{experience.team}</span>
//                     </div>
//                   </div>
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
//             {t('experience.clickPrompt', 'Click on any milestone to view details about my role, achievements, and key projects.')}
//           </motion.p>
//         </div>
//       </div>
//     </section>
//   );
// }
