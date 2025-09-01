"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { AnimatedSkill, AnimatedTitle } from "@/components/ui/animated-section";
import { motion, AnimatePresence } from "framer-motion";
import { WavesBackground } from "./ui/animated-background";
import { Search, X, Filter, SlidersHorizontal, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n-context";

// Define the skill interface for TypeScript
type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

interface Skill {
  name: string;
  description: string;
  icon: string;
  level: SkillLevel;
  tags: string[];
}

// Adding skill levels and tags to the existing skills data
const skillCategories = [
  {
    id: "programming",
    label: "Programming",
    skills: [
      {
        name: "Python",
        description: "Data Processing & Machine Learning",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
        level: "expert" as SkillLevel,
        tags: ["data", "ml", "backend"]
      },
      {
        name: "Java",
        description: "Application Development",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
        level: "advanced" as SkillLevel,
        tags: ["backend", "mobile"]
      },
      {
        name: "JavaScript",
        description: "Web Development & Frontend",
        icon: "https://ext.same-assets.com/2803063555/2631936918.svg",
        level: "advanced" as SkillLevel,
        tags: ["frontend", "web"]
      },
      {
        name: "SQL",
        description: "Database Queries & Data Management",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg",
        level: "expert" as SkillLevel,
        tags: ["data", "database"]
      },
      {
        name: "PL/SQL",
        description: "Procedural Language Extensions",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqldeveloper/sqldeveloper-plain.svg",
        level: "advanced" as SkillLevel,
        tags: ["data", "database"]
      },
      {
        name: "Scala",
        description: "Functional Programming & Big Data",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scala/scala-original.svg",
        level: "intermediate" as SkillLevel,
        tags: ["data", "backend"]
      }
    ],
  },
  {
    id: "web-frameworks",
    label: "Web Frameworks",
    skills: [
      {
        name: "Next.js",
        description: "React Framework for Web Apps",
        icon: "https://ext.same-assets.com/2803063555/2631654787.svg",
        level: "advanced" as SkillLevel,
        tags: ["frontend", "web"]
      },
      {
        name: "Flask",
        description: "Python Web Framework",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg",
        level: "advanced" as SkillLevel,
        tags: ["backend", "web", "api"]
      },
      {
        name: "Django",
        description: "High-level Python Framework",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg",
        level: "intermediate" as SkillLevel,
        tags: ["backend", "web"]
      },
      {
        name: "FastAPI",
        description: "Modern API Framework",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
        level: "intermediate" as SkillLevel,
        tags: ["api", "backend"]
      },
      {
        name: "GraphQL",
        description: "API Query Language",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg",
        level: "intermediate" as SkillLevel,
        tags: ["api", "data"]
      }
    ]
  },
  {
    id: "data-processing",
    label: "Data Processing",
    skills: [
      {
        name: "Apache Spark",
        description: "Distributed Computing Engine",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachespark/apachespark-original.svg",
        level: "advanced" as SkillLevel,
        tags: ["big data", "processing"]
      },
      {
        name: "Apache Airflow",
        description: "Workflow Orchestration",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apacheairflow/apacheairflow-original.svg",
        level: "advanced" as SkillLevel,
        tags: ["automation", "workflows"]
      },
      {
        name: "BigQuery",
        description: "Cloud Data Warehouse",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
        level: "expert" as SkillLevel,
        tags: ["data", "cloud", "analytics"]
      },
      {
        name: "Apache Beam",
        description: "Data Processing Pipelines",
        icon: "https://miro.medium.com/v2/resize:fit:400/1*3JeGCUCbGxTkkIMPEjoPFw.png",
        level: "intermediate" as SkillLevel,
        tags: ["data", "processing"]
      },
      {
        name: "Hadoop",
        description: "Distributed Storage & Processing",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/hadoop/hadoop-original.svg",
        level: "intermediate" as SkillLevel,
        tags: ["big data", "storage"]
      },
      {
        name: "Kafka",
        description: "Event Streaming Platform",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg",
        level: "intermediate" as SkillLevel,
        tags: ["streaming", "messaging"]
      }
    ]
  },
  {
    id: "cloud",
    label: "Cloud",
    skills: [
      {
        name: "Google Cloud Platform",
        description: "Cloud Computing Services",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
        level: "expert" as SkillLevel,
        tags: ["cloud", "infrastructure"]
      },
      {
        name: "Azure",
        description: "Microsoft Cloud Platform",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
        level: "advanced" as SkillLevel,
        tags: ["cloud", "infrastructure"]
      },
      {
        name: "Kubernetes",
        description: "Container Orchestration",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg",
        level: "intermediate" as SkillLevel,
        tags: ["orchestration", "containers"]
      },
      {
        name: "Terraform",
        description: "Infrastructure as Code",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg",
        level: "intermediate" as SkillLevel,
        tags: ["iac", "devops"]
      },
      {
        name: "Docker",
        description: "Containerization Platform",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
        level: "advanced" as SkillLevel,
        tags: ["containers", "devops"]
      }
    ]
  },
  {
    id: "databases",
    label: "Databases",
    skills: [
      {
        name: "MongoDB",
        description: "NoSQL Database",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
        level: "advanced" as SkillLevel,
        tags: ["nosql", "database"]
      },
      {
        name: "MySQL",
        description: "Relational Database",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
        level: "advanced" as SkillLevel,
        tags: ["sql", "database"]
      },
      {
        name: "PostgreSQL",
        description: "Advanced Relational Database",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
        level: "expert" as SkillLevel,
        tags: ["sql", "database"]
      },
      {
        name: "Elasticsearch",
        description: "Search & Analytics Engine",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/elasticsearch/elasticsearch-original.svg",
        level: "advanced" as SkillLevel,
        tags: ["search", "analytics"]
      }
    ]
  },
  {
    id: "ml-ai",
    label: "ML & AI",
    skills: [
      {
        name: "Hugging Face",
        description: "NLP & Machine Learning Models",
        icon: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg",
        level: "advanced" as SkillLevel,
        tags: ["ml", "nlp"]
      },
      {
        name: "PyTorch",
        description: "Deep Learning Framework",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
        level: "advanced" as SkillLevel,
        tags: ["ml", "deep learning"]
      },
      {
        name: "TensorFlow",
        description: "Machine Learning Platform",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",
        level: "intermediate" as SkillLevel,
        tags: ["ml", "deep learning"]
      },
      {
        name: "Generative AI",
        description: "Content Generation & LLMs",
        icon: "https://cdn-icons-png.flaticon.com/512/8637/8637114.png",
        level: "intermediate" as SkillLevel,
        tags: ["ai", "llm"]
      },
      // {
      //   name: "NLTK",
      //   description: "Natural Language Processing",
      //   icon: "https://miro.medium.com/v2/resize:fit:592/1*YM2HXc7f4v02pZBEO8h-fw.png",
      //   level: "advanced" as SkillLevel,
      //   tags: ["nlp", "text"]
      // },
      // {
      //   name: "SpaCy",
      //   description: "Advanced NLP Library",
      //   icon: "https://spacy.io/static/icon-dark.svg",
      //   level: "advanced" as SkillLevel,
      //   tags: ["nlp", "text"]
      // }
    ]
  },
  {
    id: "tools",
    label: "Tools & Others",
    skills: [
      {
        name: "Power BI",
        description: "Business Intelligence & Visualization",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/powerbi/powerbi-original.svg",
        level: "expert" as SkillLevel,
        tags: ["visualization", "analytics"]
      },
      {
        name: "Power Apps",
        description: "Low-Code Development Platform",
        icon: "https://static.wikia.nocookie.net/logopedia/images/4/44/Microsoft_Power_Apps_%282020%29.svg",
        level: "advanced" as SkillLevel,
        tags: ["low-code", "apps"]
      },
      {
        name: "Power Automate",
        description: "Workflow Automation",
        icon: "https://static.wikia.nocookie.net/logopedia/images/1/11/Microsoft_Power_Automate_%282020%29.svg",
        level: "advanced" as SkillLevel,
        tags: ["automation", "workflow"]
      },
      {
        name: "Dataverse",
        description: "Data Storage & Management",
        icon: "https://static.wikia.nocookie.net/logopedia/images/c/cf/Microsoft_Dataverse_%282020%29.svg",
        level: "intermediate" as SkillLevel,
        tags: ["data", "storage"]
      },
      {
        name: "Git",
        description: "Version Control System",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
        level: "advanced" as SkillLevel,
        tags: ["version control", "collaboration"]
      },
      {
        name: "Bitbucket",
        description: "Git Code Repository",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bitbucket/bitbucket-original.svg",
        level: "advanced" as SkillLevel,
        tags: ["version control", "ci/cd"]
      },
      {
        name: "Jira",
        description: "Project Management Tool",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg",
        level: "advanced" as SkillLevel,
        tags: ["agile", "project management"]
      }
    ]
  }
];

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState("languages");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSkills, setFilteredSkills] = useState<{[key: string]: Skill[]}>({});
  const [activeFilters, setActiveFilters] = useState<{
    levels: string[];
    tags: string[];
  }>({
    levels: [],
    tags: []
  });
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const { t } = useLanguage();

  // Get all unique tags across all skills
  const allTags = Array.from(
    new Set(
      skillCategories.flatMap(category =>
        category.skills.flatMap(skill => skill.tags || [])
      )
    )
  );

  // Get all unique skill levels
  const skillLevels: SkillLevel[] = ["beginner", "intermediate", "advanced", "expert"];

  // Filter skills based on search query and active filters
  useEffect(() => {
    const newFilteredSkills: {[key: string]: Skill[]} = {};

    skillCategories.forEach(category => {
      const filtered = category.skills.filter(skill => {
        const matchesSearch =
          !searchQuery ||
          skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (skill.tags && skill.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));

        const matchesLevel =
          activeFilters.levels.length === 0 ||
          (skill.level && activeFilters.levels.includes(skill.level));

        const matchesTags =
          activeFilters.tags.length === 0 ||
          (skill.tags && activeFilters.tags.some(tag => skill.tags?.includes(tag)));

        return matchesSearch && matchesLevel && matchesTags;
      });

      if (filtered.length > 0) {
        newFilteredSkills[category.id] = filtered;
      }
    });

    setFilteredSkills(newFilteredSkills);

      // Check if the current selected category has skills
    if (!newFilteredSkills[selectedCategory]?.length) {
      // If no skills, select "programming" category
      setSelectedCategory("programming");
  }
  }, [searchQuery, activeFilters, selectedCategory]);

  // Toggle filter for tags and levels
  const toggleFilter = (type: 'levels' | 'tags', value: string) => {
    setActiveFilters(prev => {
      const currentFilters = prev[type];
      const isActive = currentFilters.includes(value);

      return {
        ...prev,
        [type]: isActive
          ? currentFilters.filter(item => item !== value)
          : [...currentFilters, value]
      };
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({ levels: [], tags: [] });
    setSearchQuery("");
  };

  // Count active filters
  const activeFilterCount = activeFilters.levels.length + activeFilters.tags.length + (searchQuery ? 1 : 0);

  // Check if there are any filtered skills for the current category
  const hasFilteredSkills = Object.keys(filteredSkills).length > 0;
  const currentCategoryHasSkills = selectedCategory in filteredSkills && filteredSkills[selectedCategory]?.length > 0;

  return (
    <WavesBackground intensity="subtle" speed="slow">
      <section id="skills" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedTitle className="text-center">
            <h2 className="section-title">{t('skills.title', 'Skills & Technologies')}</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('skills.subtitle', 'Tools and technologies I use to build modern, responsive, and user-friendly applications')}
            </p>
          </AnimatedTitle>

          {/* Search and filter bar */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-3 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-full md:w-auto md:flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder={t('common.search', 'Search skills, technologies...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <motion.div className="relative">
              <motion.button
                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-muted/50 hover:bg-muted border border-border rounded-full transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="h-4 w-4" />
                {t('common.filter', 'Filter')}
                {activeFilterCount > 0 && (
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs">
                    {activeFilterCount}
                  </span>
                )}
              </motion.button>

              {/* Filter dropdown */}
              <AnimatePresence>
                {isFilterMenuOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 p-4 bg-card border border-border rounded-lg shadow-lg z-10 w-64"
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-sm flex items-center gap-1">
                        <SlidersHorizontal className="h-3.5 w-3.5" />
                        {t('common.filter', 'Filters')}
                      </h3>
                      {activeFilterCount > 0 && (
                        <button
                          onClick={clearFilters}
                          className="text-xs text-primary hover:underline"
                        >
                          {t('common.clearAll', 'Clear all')}
                        </button>
                      )}
                    </div>

                    {/* Skill level filters */}
                    <div className="mb-4">
                      <h4 className="text-xs font-medium mb-2 text-muted-foreground">Skill Level</h4>
                      <div className="flex flex-wrap gap-2">
                        {skillLevels.map(level => (
                          <button
                            key={level}
                            onClick={() => toggleFilter('levels', level)}
                            className={`text-xs px-2 py-1 rounded-full border transition-colors ${
                              activeFilters.levels.includes(level)
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-muted/50 text-muted-foreground border-border hover:bg-muted'
                            }`}
                          >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                            {activeFilters.levels.includes(level) && (
                              <CheckCircle2 className="h-3 w-3 ml-1 inline" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tags filters */}
                    <div>
                      <h4 className="text-xs font-medium mb-2 text-muted-foreground">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {allTags.map(tag => (
                          <button
                            key={tag}
                            onClick={() => toggleFilter('tags', tag)}
                            className={`text-xs px-2 py-1 rounded-full border transition-colors ${
                              activeFilters.tags.includes(tag)
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-muted/50 text-muted-foreground border-border hover:bg-muted'
                            }`}
                          >
                            {tag}
                            {activeFilters.tags.includes(tag) && (
                              <CheckCircle2 className="h-3 w-3 ml-1 inline" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Clear filters button */}
            {activeFilterCount > 0 && (
              <motion.button
                onClick={clearFilters}
                className="text-sm text-muted-foreground hover:text-foreground border border-border rounded-full px-3 py-1 flex items-center gap-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="h-3.5 w-3.5" />
                {t('common.clearAll', 'Clear all')}
              </motion.button>
            )}
          </motion.div>

          {/* Display message when no skills match the filters */}
          {!hasFilteredSkills && (
            <motion.div
              className="text-center py-12 border border-dashed border-border rounded-lg max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-muted-foreground">No skills match your current filters.</p>
              <button
                onClick={clearFilters}
                className="text-primary hover:underline mt-2"
              >
                {t('common.clearAll', 'Clear all filters')}
              </button>
            </motion.div>
          )}

          {/* Skill Categories Tabs */}
          {hasFilteredSkills && (
            <Tabs
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              className="w-full max-w-4xl mx-auto"
            >
              <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 bg-card p-1 mb-8">
                {Object.keys(filteredSkills).map((categoryId) => {
                  const category = skillCategories.find(c => c.id === categoryId);
                  return (
                    <TabsTrigger
                      key={categoryId}
                      value={categoryId}
                      className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary relative"
                    >
                      {category?.label}
                      <span className="absolute -top-1 -right-1 text-xs bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center">
                        {filteredSkills[categoryId].length}
                      </span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {/* Show message when current category has no skills */}
              {/* {!currentCategoryHasSkills && (
                <motion.div
                  className="text-center py-8 border border-dashed border-border rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-muted-foreground">
                    No skills in this category match your filters.
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try selecting a different category or adjusting your filters.
                  </p>
                </motion.div>
              )} */}
              

              {/* Skills display */}
              {Object.entries(filteredSkills).map(([categoryId, skills]) => (
                <TabsContent key={categoryId} value={categoryId} className="mt-4">
                  <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AnimatePresence>
                      {skills.map((skill, index) => (
                        <AnimatedSkill
                          key={skill.name}
                          className="flex flex-col items-center text-center space-y-3 relative"
                          delay={0.1 * index}
                        >
                          {/* Skill level indicator */}
                          {skill.level && (
                            <div className="absolute -top-1 -right-1 text-xs px-2 py-0.5 rounded-full bg-primary/80 text-primary-foreground capitalize">
                              {skill.level}
                            </div>
                          )}

                          <motion.div
                            className="skill-icon w-16 h-16 flex items-center justify-center"
                            whileHover={{
                              scale: 1.1,
                              rotate: 5,
                              transition: { duration: 0.2 }
                            }}
                          >
                            <Image
                              src={skill.icon}
                              alt={skill.name}
                              width={48}
                              height={48}
                              className="object-contain"
                            />
                          </motion.div>
                          <div>
                            <h3 className="font-medium">{skill.name}</h3>
                            <p className="text-xs text-muted-foreground mt-1">{skill.description}</p>

                            {/* Skill tags */}
                            {skill.tags && skill.tags.length > 0 && (
                              <div className="flex flex-wrap justify-center gap-1 mt-2">
                                {skill.tags.map(tag => (
                                  <span
                                    key={tag}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleFilter('tags', tag);
                                    }}
                                    className={`text-[10px] px-1.5 py-0.5 rounded-full cursor-pointer transition-colors ${
                                      activeFilters.tags.includes(tag)
                                        ? 'bg-primary/80 text-primary-foreground'
                                        : 'bg-muted/70 text-muted-foreground hover:bg-muted/90'
                                    }`}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </AnimatedSkill>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          )}

          {/* Search and filter stats */}
          {activeFilterCount > 0 && hasFilteredSkills && (
            <motion.p
              className="text-center text-sm text-muted-foreground mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Showing {Object.values(filteredSkills).flat().length} of {skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)} skills
            </motion.p>
          )}
        </div>
      </section>
    </WavesBackground>
  );
}
