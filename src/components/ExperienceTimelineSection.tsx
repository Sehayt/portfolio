"use client";

import { useState } from "react";
import { Timeline, TimelineItem } from "@/components/ui/timeline";
import { AnimatedTitle } from "@/components/ui/animated-section";
import { Building, Briefcase, Users, Calendar, Award, Link, ChevronDown, ChevronUp, Lightbulb, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n-context";

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

  // Experience data with translation keys
  const getExperienceData = () => [
    {
      id: 1,
      title: t('experience.alten.title', 'Data & Analytics Engineer'),
      company: "Alten",
      period: "September 2022 - Present",
      description: t('experience.alten.description', 'Data & Analytics Engineer with dual roles supporting corporate strategy and analytics engineering for major clients like Bouygues Telecom and Renault. Implementing data analysis systems to support strategic decision-making using cloud technologies.'),
      skills: ["GCP", "Azure", "Python", "PostgreSQL", "Power BI", "BigQuery", "Data Pipelines"],
      achievements: [
        t('experience.alten.achievement1', "Designed data pipelines using Google Cloud Platform services for efficient data processing"),
        t('experience.alten.achievement2', "Used BigQuery for complex queries and data analysis, optimizing processing efficiency"),
        t('experience.alten.achievement3', "Developed Power BI dashboards for real-time monitoring of productivity and operational metrics"),
        t('experience.alten.achievement4', "Implemented real-time data flows with Google Cloud services for continuous data ingestion from Salesforce"),
        t('experience.alten.achievement5', "Created dynamic reports in Power BI, integrating complex data models for data-driven decisions"),
        t('experience.alten.achievement6', "Collaborated on market analysis and recruitment process optimization initiatives")
      ],
      projects: [
        {
          name: t('experience.alten.project1.name', "Corporate & Strategy Analytics"),
          description: t('experience.alten.project1.description', "Implemented data analysis systems using business intelligence tools (Azure, Python, Power Platform) for data automation and reporting"),
          technologies: ["Azure", "Python", "Power BI", "Power Apps", "Power Automate"]
        },
        {
          name: t('experience.alten.project2.name', "Bouygues Telecom Data Pipelines"),
          description: t('experience.alten.project2.description', "Designed and optimized data pipelines on Google Cloud Platform for efficient data processing and analysis"),
          technologies: ["GCP", "BigQuery", "Cloud Functions", "Data Studio", "Python"]
        },
        {
          name: t('experience.alten.project3.name', "Renault Salesforce Integration"),
          description: t('experience.alten.project3.description', "Implemented real-time data flows from Salesforce with dynamic Power BI reporting dashboards"),
          technologies: ["GCP", "Salesforce API", "Power BI", "Data Factory", "Cloud Storage"]
        }
      ],
      team: t('experience.alten.team', "Data & Analytics Team"),
      location: "Rabat, Morocco"
    },
    {
      id: 2,
      title: t('experience.ocp.title', 'Data & Analytics Engineer'),
      company: "OCP Solutions",
      period: "March 2022 - September 2022",
      description: t('experience.ocp.description', 'Developed a generic framework for machine learning techniques, with a focus on multilingual summary models. Implemented NLP solutions and integrated AI features with web applications.'),
      skills: ["Parquet", "Elasticsearch", "Spark", "Hugging Face", "PyTorch", "Flask", "Next.js", "MongoDB", "MySQL"],
      achievements: [
        t('experience.ocp.achievement1', "Developed a generic framework for machine learning techniques, including multilingual summary models"),
        t('experience.ocp.achievement2', "Deployed NLP models using Hugging Face and PyTorch for automatic text summarization"),
        t('experience.ocp.achievement3', "Integrated APIs with Flask to add AI features to interactive web applications"),
        t('experience.ocp.achievement4', "Worked with document processing pipelines using Elasticsearch and Parquet for efficient data storage"),
        t('experience.ocp.achievement5', "Implemented full-stack solutions connecting ML models with front-end interfaces")
      ],
      projects: [
        {
          name: t('experience.ocp.project1.name', "Multilingual Text Summarization"),
          description: t('experience.ocp.project1.description', "Developed and deployed NLP models for automatic multilingual text summarization"),
          technologies: ["Hugging Face", "PyTorch", "NLTK", "Spacy"]
        },
        {
          name: t('experience.ocp.project2.name', "AI Web Integration"),
          description: t('experience.ocp.project2.description', "Integrated machine learning models with web applications through REST APIs"),
          technologies: ["Flask", "Next.js", "MongoDB", "REST API"]
        },
        {
          name: t('experience.ocp.project3.name', "Document Processing Pipeline"),
          description: t('experience.ocp.project3.description', "Created data processing pipeline for document storage and retrieval"),
          technologies: ["Elasticsearch", "Spark", "Parquet", "MySQL"]
        }
      ],
      team: t('experience.ocp.team', "AI & Machine Learning Team"),
      location: "Casablanca, Morocco"
    },
    {
      id: 3,
      title: t('experience.1mweb.title', 'Data Scientist'),
      company: "1M WEB LTD",
      period: "July 2021 - September 2021",
      description: t('experience.1mweb.description', 'Developed a machine learning model for automatic CV information extraction. Leveraged NLP libraries for CV data analysis and extraction, automated workflows for parallel CV processing.'),
      skills: ["Python", "NLTK", "SpaCy", "TextBlob", "Apache Airflow", "Agile"],
      achievements: [
        t('experience.1mweb.achievement1', "Developed a machine learning model for automatic CV information extraction"),
        t('experience.1mweb.achievement2', "Leveraged NLP libraries (NLTK, SpaCy, TextBlob) for CV data analysis and extraction"),
        t('experience.1mweb.achievement3', "Automated workflows using Apache Airflow for parallel CV processing"),
        t('experience.1mweb.achievement4', "Worked in an Agile environment to integrate models into existing systems"),
        t('experience.1mweb.achievement5', "Enhanced recruitment processes through AI-powered document analysis")
      ],
      projects: [
        {
          name: t('experience.1mweb.project1.name', "CV Information Extraction"),
          description: t('experience.1mweb.project1.description', "ML-powered system to automatically extract structured data from CVs and resumes"),
          technologies: ["Python", "NLTK", "SpaCy", "TextBlob"]
        },
        {
          name: t('experience.1mweb.project2.name', "Workflow Automation"),
          description: t('experience.1mweb.project2.description', "Parallel processing system for CV analysis using Apache Airflow"),
          technologies: ["Apache Airflow", "Python", "Docker"]
        }
      ],
      team: t('experience.1mweb.team', "Data Science Team"),
      location: "London, United Kingdom (Remote)"
    },
    {
      id: 4,
      title: t('experience.ispits.title', 'Data Scientist'),
      company: "ISPITS, CHU",
      period: "June 2020 - August 2020",
      description: t('experience.ispits.description', 'Designed and developed a mobile app with Java and Android Studio for monitoring smartphone usage. Built a Flask backend for managing app data and implemented real-time notifications.'),
      skills: ["Java", "Android Studio", "Figma", "Flask", "UI/UX Design"],
      achievements: [
        t('experience.ispits.achievement1', "Designed and developed a mobile app with Java and Android Studio for monitoring smartphone usage"),
        t('experience.ispits.achievement2', "Built a Flask backend for managing app data, user sessions, and frontend-server communication"),
        t('experience.ispits.achievement3', "Implemented real-time notifications to alert users of risky behaviors"),
        t('experience.ispits.achievement4', "Created UI/UX designs using Figma for intuitive user experience"),
        t('experience.ispits.achievement5', "Integrated data collection and analysis components for usage pattern detection")
      ],
      projects: [
        {
          name: t('experience.ispits.project1.name', "Smartphone Usage Monitor"),
          description: t('experience.ispits.project1.description', "Mobile application for tracking and analyzing smartphone usage patterns"),
          technologies: ["Java", "Android Studio", "SQLite"]
        },
        {
          name: t('experience.ispits.project2.name', "App Backend System"),
          description: t('experience.ispits.project2.description', "Server-side application for data storage, analysis, and user management"),
          technologies: ["Flask", "Python", "RESTful API"]
        },
        {
          name: t('experience.ispits.project3.name', "UI/UX Design"),
          description: t('experience.ispits.project3.description', "Design of intuitive user interfaces and experiences for mobile application"),
          technologies: ["Figma", "Material Design"]
        }
      ],
      team: t('experience.ispits.team', "Mobile Development Team"),
      location: "Fès, Morocco"
    }
  ];

  const experienceData = getExperienceData();

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
                        <Award className="h-4 w-4 mr-1.5" /> {t('common.keyAchievements', 'Key Achievements')}
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
                          <Lightbulb className="h-4 w-4 mr-1.5" /> {t('common.keyProjects', 'Key Projects')}
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
                          {t('common.showMore', 'Show')} {experience.projects.length - 1} {experience.projects.length > 2 ? t('common.moreProjects', 'more projects') : t('common.moreProject', 'more project')}
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
