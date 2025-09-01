"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Github, Link2, ExternalLink, Maximize2, Filter, SortAsc, SortDesc, X } from "lucide-react";
import { AnimatedCard, AnimatedTitle } from "@/components/ui/animated-section";
import { motion, AnimatePresence } from "framer-motion";
import { FadeInStagger, FadeInItem } from "@/components/ui/page-transition";
import { RevealImage } from "@/components/ui/reveal-image";
import { ImageModal, useModal } from "@/components/ui/modal";
import { useState, useEffect, useMemo } from "react";

// Project type for TypeScript
type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  screenshots: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  category: string;
  technologies: string[];
  github: string | null;
  demoLink: string | null;
};

// Add screenshots for projects
const projectsData = [
  {
    id: 1,
    title: "Car Rental Management",
    description:
      "A web platform for seamless vehicle reservations, fleet management, and secure online payments via PayPal.",
    image: "https://ext.same-assets.com/0/127475595.svg",
    screenshots: [
      {
        src: "https://ext.same-assets.com/2605111025/849522504.png",
        alt: "Car Rental Management Dashboard",
        caption: "Main dashboard showing available vehicles and booking stats"
      },
      {
        src: "https://ext.same-assets.com/0/127475595.svg",
        alt: "Car Rental Booking Flow",
        caption: "User booking flow with date selection and payment integration"
      }
    ],
    category: "Academic Project - Web App",
    technologies: ["Spring Boot", "Next.js", "JWT", "PostgreSQL", "PayPal SDK"],
    github: "https://github.com/mawin/car-rental-management",
    demoLink: null,
  },
  {
    id: 2,
    title: "Task Management",
    description:
      "Secure web application for managing professors' tasks with Google Calendar integration.",
    image: "https://ext.same-assets.com/0/3072991592.svg",
    screenshots: [
      {
        src: "https://ext.same-assets.com/0/3072991592.svg",
        alt: "Task Management Interface",
        caption: "Main task management interface with calendar integration"
      }
    ],
    category: "Academic Project - Web App",
    technologies: ["Java", "JavaFX", "MongoDB", "JSON", "MVC"],
    github: "https://github.com/mawin/task-management",
    demoLink: null,
  },
  {
    id: 3,
    title: "StudyMate",
    description:
      "A web application that helps students manage their courses, plan their studies, and optimize their schedules efficiently.",
    image: "https://ext.same-assets.com/0/2715258859.svg",
    screenshots: [
      {
        src: "https://ext.same-assets.com/0/2715258859.svg",
        alt: "StudyMate Dashboard",
        caption: "Student dashboard showing course schedule and study planner"
      }
    ],
    category: "Academic Project - Web App",
    technologies: ["Laravel", "TypeScript", "MySQL", "Bootstrap", "PHP", "JavaScript"],
    github: "https://github.com/mawin/studymate",
    demoLink: null,
  },
  {
    id: 4,
    title: "OAMA Chat",
    description:
      "Secure web application for real-time private messaging with end-to-end encryption.",
    image: "https://ext.same-assets.com/0/1462517727.svg",
    screenshots: [
      {
        src: "https://ext.same-assets.com/0/1462517727.svg",
        alt: "OAMA Chat Interface",
        caption: "Chat interface showing conversation and security features"
      }
    ],
    category: "Academic Project - Messaging App",
    technologies: [".NET", "C++", "MySQL", "Figma", "Visual Studio"],
    github: "https://github.com/mawin/oama-chat",
    demoLink: null,
  },
  {
    id: 5,
    title: "Linear Optimization Solver",
    description:
      "Web application for solving linear optimization problems using three methods: Simplex, Two-Phase, and Big M.",
    image: "https://ext.same-assets.com/0/1349013658.svg",
    screenshots: [
      {
        src: "https://ext.same-assets.com/0/1349013658.svg",
        alt: "Linear Optimization Solver",
        caption: "Problem setup interface with solution visualization"
      }
    ],
    category: "Operations Research Project - Web App",
    technologies: ["Flask", "Next.js", "Python", "NumPy", "Simplex"],
    github: "https://github.com/mawin/linear-optimization",
    demoLink: "https://linear-optimization.vercel.app",
  },
  {
    id: 6,
    title: "Facial Emotion Detection",
    description:
      "Application that uses machine learning to classify facial emotions in real-time using a camera feed.",
    image: "https://ext.same-assets.com/2605111025/849522504.jpeg",
    screenshots: [
      {
        src: "https://ext.same-assets.com/2605111025/849522504.jpeg",
        alt: "Facial Emotion Detection",
        caption: "Emotion detection interface showing real-time classification"
      }
    ],
    category: "Academic Project - Machine Learning",
    technologies: ["Python", "TensorFlow", "CNN", "NumPy", "Matplotlib"],
    github: "https://github.com/mawin/emotion-detection",
    demoLink: null,
  },
];

// Get unique categories and technologies for filters
const getUniqueCategories = () => {
  return Array.from(new Set(projectsData.map(project => project.category)));
};

const getUniqueTechnologies = () => {
  const technologies = new Set<string>();
  projectsData.forEach(project => {
    project.technologies.forEach(tech => technologies.add(tech));
  });
  return Array.from(technologies);
};

export default function ProjectsSection() {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    caption?: string;
  } | null>(null);

  const imageModal = useModal();
  const filterModal = useModal();

  // Filtering and sorting states
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projectsData);
  const [activeFilters, setActiveFilters] = useState<{
    categories: string[];
    technologies: string[];
  }>({
    categories: [],
    technologies: []
  });
  const [sortOption, setSortOption] = useState<{
    field: 'title' | 'category';
    direction: 'asc' | 'desc';
  }>({
    field: 'title',
    direction: 'asc'
  });

  const categories = useMemo(getUniqueCategories, []);
  const technologies = useMemo(getUniqueTechnologies, []);

  // Open image modal
  const openImageModal = (image: { src: string; alt: string; caption?: string }) => {
    setSelectedImage(image);
    imageModal.open();
  };

  // Filter toggle handler
  const toggleCategoryFilter = (category: string) => {
    setActiveFilters(prev => {
      const isActive = prev.categories.includes(category);

      return {
        ...prev,
        categories: isActive
          ? prev.categories.filter(c => c !== category)
          : [...prev.categories, category]
      };
    });
  };

  const toggleTechnologyFilter = (technology: string) => {
    setActiveFilters(prev => {
      const isActive = prev.technologies.includes(technology);

      return {
        ...prev,
        technologies: isActive
          ? prev.technologies.filter(t => t !== technology)
          : [...prev.technologies, technology]
      };
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({ categories: [], technologies: [] });
  };

  // Sort toggle handler
  const toggleSort = (field: 'title' | 'category') => {
    setSortOption(prev => {
      if (prev.field === field) {
        return {
          field,
          direction: prev.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return { field, direction: 'asc' };
    });
  };

  // Apply filters and sorting
  useEffect(() => {
    let result = [...projectsData];

    // Apply category filters
    if (activeFilters.categories.length > 0) {
      result = result.filter(project =>
        activeFilters.categories.includes(project.category)
      );
    }

    // Apply technology filters
    if (activeFilters.technologies.length > 0) {
      result = result.filter(project =>
        project.technologies.some(tech =>
          activeFilters.technologies.includes(tech)
        )
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;

      if (sortOption.field === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else if (sortOption.field === 'category') {
        comparison = a.category.localeCompare(b.category);
      }

      return sortOption.direction === 'asc' ? comparison : -comparison;
    });

    setFilteredProjects(result);
  }, [activeFilters, sortOption]);

  // Count active filters
  const activeFilterCount = activeFilters.categories.length + activeFilters.technologies.length;

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedTitle className="text-center">
          <h2 className="section-title">My Projects</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Here are some of my projects I have done.
          </p>
        </AnimatedTitle>

        {/* Filter and Sort Controls */}
        <div className="flex justify-center items-center mb-10 flex-wrap gap-3">
          <motion.button
            onClick={filterModal.open}
            className="px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter className="h-4 w-4" />
            Filter
            {activeFilterCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs">
                {activeFilterCount}
              </span>
            )}
          </motion.button>

          <div className="flex bg-card border border-border rounded-full overflow-hidden">
            <motion.button
              onClick={() => toggleSort('title')}
              className={`px-4 py-2 flex items-center gap-1 text-sm ${
                sortOption.field === 'title' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
              }`}
              whileHover={{ backgroundColor: 'rgba(var(--primary), 0.1)' }}
              whileTap={{ scale: 0.95 }}
            >
              Name
              {sortOption.field === 'title' && (
                sortOption.direction === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />
              )}
            </motion.button>
            <motion.button
              onClick={() => toggleSort('category')}
              className={`px-4 py-2 flex items-center gap-1 text-sm ${
                sortOption.field === 'category' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
              }`}
              whileHover={{ backgroundColor: 'rgba(var(--primary), 0.1)' }}
              whileTap={{ scale: 0.95 }}
            >
              Category
              {sortOption.field === 'category' && (
                sortOption.direction === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />
              )}
            </motion.button>
          </div>

          {activeFilterCount > 0 && (
            <motion.button
              onClick={clearFilters}
              className="px-4 py-2 rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              whileHover={{ scale: 1.05, borderColor: 'rgba(var(--primary), 0.3)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <X className="h-3 w-3" /> Clear filters
            </motion.button>
          )}
        </div>

        {/* Project filtering and sorting results info */}
        {(activeFilterCount > 0 || sortOption.field !== 'title' || sortOption.direction !== 'asc') && (
          <motion.div
            className="text-center text-sm text-muted-foreground mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Showing {filteredProjects.length} of {projectsData.length} projects
            {activeFilterCount > 0 && " with applied filters"}
            {(sortOption.field !== 'title' || sortOption.direction !== 'asc') &&
              `, sorted by ${sortOption.field} (${sortOption.direction === 'asc' ? 'A-Z' : 'Z-A'})`
            }
          </motion.div>
        )}

        {/* Projects Grid */}
        <FadeInStagger>
          {filteredProjects.length === 0 ? (
            <motion.div
              className="text-center p-12 border border-dashed border-border rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-muted-foreground mb-2">No projects match your current filters.</p>
              <button
                onClick={clearFilters}
                className="text-primary hover:underline"
              >
                Clear all filters
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <FadeInItem key={project.id}>
                  <motion.div
                    whileHover={{
                      y: -8,
                      scale: 1.02,
                      transition: {
                        y: { duration: 0.3, ease: "easeOut" },
                        scale: { duration: 0.2, ease: "easeOut" }
                      }
                    }}
                    className="h-full"
                  >
                    <Card className="bg-card border-border overflow-hidden flex flex-col h-full transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                      <div className="relative h-48 overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10"></div>

                        {/* Image overlay with view button */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-300 z-20 opacity-0 group-hover:opacity-100">
                          <motion.button
                            onClick={() => project.screenshots?.length && openImageModal(project.screenshots[0])}
                            className="bg-primary/90 text-white p-2 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            disabled={!project.screenshots?.length}
                          >
                            <Maximize2 className="h-5 w-5" />
                          </motion.button>
                        </div>

                        <RevealImage
                          src={project.image}
                          alt={project.title}
                          fill
                          className="transform group-hover:scale-110 transition-transform duration-500"
                        />
                        <motion.span
                          className="card-badge cursor-pointer"
                          initial={{ opacity: 0, y: -20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          viewport={{ once: true }}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCategoryFilter(project.category);
                          }}
                          whileHover={{
                            backgroundColor: "rgba(var(--primary), 0.2)",
                            scale: 1.05
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {project.category}
                        </motion.span>
                      </div>

                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl">{project.title}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {project.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="flex-grow">
                        <motion.div
                          className="flex flex-wrap gap-1 mb-4"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          viewport={{ once: true }}
                        >
                          {project.technologies.map((tech, techIndex) => (
                            <motion.span
                              key={tech}
                              className={`tech-badge sparkle-hover cursor-pointer ${
                                activeFilters.technologies.includes(tech) ? 'bg-primary/30 text-primary' : ''
                              }`}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{
                                opacity: 1,
                                scale: 1,
                                transition: {
                                  delay: 0.3 + (techIndex * 0.05),
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
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleTechnologyFilter(tech);
                              }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </motion.div>
                      </CardContent>

                      <CardFooter className="flex gap-3 border-t border-border pt-4">
                        {project.github && (
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground flex items-center text-sm gap-1 transition-colors"
                            whileHover={{ scale: 1.05, x: 3 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Github className="h-4 w-4" />
                            GitHub
                          </motion.a>
                        )}
                        {project.demoLink && (
                          <motion.a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground flex items-center text-sm gap-1 transition-colors"
                            whileHover={{ scale: 1.05, x: 3 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Link2 className="h-4 w-4" />
                            Live Demo
                          </motion.a>
                        )}
                        {project.screenshots?.length > 0 && (
                          <motion.button
                            onClick={() => openImageModal(project.screenshots[0])}
                            className="ml-auto text-muted-foreground hover:text-foreground flex items-center text-sm gap-1 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ExternalLink className="h-4 w-4" />
                            Preview
                          </motion.button>
                        )}
                      </CardFooter>
                    </Card>
                  </motion.div>
                </FadeInItem>
              ))}
            </div>
          )}
        </FadeInStagger>

        {/* Filter Modal */}
        <Modal
          isOpen={filterModal.isOpen}
          onClose={filterModal.close}
          title="Filter Projects"
          size="md"
        >
          <div className="p-4">
            <div className="mb-6">
              <h3 className="text-sm font-medium text-foreground mb-3">Filter by Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <motion.button
                    key={category}
                    onClick={() => toggleCategoryFilter(category)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      activeFilters.categories.includes(category)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-foreground mb-3">Filter by Technology</h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map(tech => (
                  <motion.button
                    key={tech}
                    onClick={() => toggleTechnologyFilter(tech)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      activeFilters.technologies.includes(tech)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tech}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-border">
              <motion.button
                onClick={clearFilters}
                className="px-4 py-2 rounded-md text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={activeFilterCount === 0}
              >
                Clear All
              </motion.button>
              <motion.button
                onClick={filterModal.close}
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Apply Filters ({filteredProjects.length})
              </motion.button>
            </div>
          </div>
        </Modal>

        {/* Image Modal */}
        {selectedImage && (
          <ImageModal
            isOpen={imageModal.isOpen}
            onClose={imageModal.close}
            imageSrc={selectedImage.src}
            alt={selectedImage.alt}
            caption={selectedImage.caption}
          />
        )}
      </div>
    </section>
  );
}

// Modal component for filter UI
function Modal({ isOpen, onClose, children, title, size = "md" }: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  // Configure size classes
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300
            }}
            className={`bg-card border border-border rounded-lg shadow-2xl ${sizeClasses[size]} w-full z-10 overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
          >
            {title && (
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="text-lg font-medium text-foreground">{title}</h3>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
