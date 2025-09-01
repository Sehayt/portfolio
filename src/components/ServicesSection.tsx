"use client";

import { motion } from "framer-motion";
import { Database, Cloud, BarChart3, Code, Cpu, Lightbulb } from "lucide-react";
import { useLanguage } from "@/lib/i18n-context";
import { AnimatedTitle } from "@/components/ui/animated-section";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  return (
    <motion.div
      className="bg-background rounded-xl p-6 shadow-sm border hover:shadow-md transition-all duration-300 h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

export default function ServicesSection() {
  const { t } = useLanguage();

  const services = [
    {
      icon: <Database className="h-10 w-10" />,
      title: t('services.dataEngineering.title', 'Data Engineering'),
      description: t('services.dataEngineering.description', 'Expert design and implementation of data pipelines, ETL processes, and data warehousing solutions using technologies like GCP, BigQuery, and Apache tools. Turning raw data into structured and accessible information for your business.')
    },
    {
      icon: <Cloud className="h-10 w-10" />,
      title: t('services.cloudSolutions.title', 'Cloud Solutions'),
      description: t('services.cloudSolutions.description', 'Implementation of cloud-based architectures on GCP and Azure with focus on scalability, security, and cost-efficiency. Design and deployment of cloud data platforms with continuous integration pipelines.')
    },
    {
      icon: <BarChart3 className="h-10 w-10" />,
      title: t('services.dataAnalytics.title', 'Data Analytics & Visualization'),
      description: t('services.dataAnalytics.description', 'Development of comprehensive analytical dashboards and reports using Power BI and other visualization tools. Transforming complex data into clear, actionable insights for strategic decision-making.')
    },
    {
      icon: <Cpu className="h-10 w-10" />,
      title: t('services.machineLearning.title', 'Machine Learning Solutions'),
      description: t('services.machineLearning.description', 'Design and implementation of custom machine learning and NLP models for business applications. Specialized in text analysis, document processing, and predictive analytics using PyTorch and Hugging Face.')
    },
    {
      icon: <Code className="h-10 w-10" />,
      title: t('services.dataAPIs.title', 'Data APIs & Integration'),
      description: t('services.dataAPIs.description', 'Development of robust APIs for data services using Flask, FastAPI, and GraphQL. Seamless integration of data systems with existing applications and third-party services for efficient information flow.')
    },
    {
      icon: <Lightbulb className="h-10 w-10" />,
      title: t('services.consulting.title', 'Data Strategy Consulting'),
      description: t('services.consulting.description', 'Strategic guidance on data architecture, governance, and analytics roadmaps. Helping organizations leverage their data assets effectively, improve data quality, and implement best practices for data-driven operations.')
    }
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <AnimatedTitle className="text-center">
          <h2 className="section-title">
            {t('services.title', 'My Services')}
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            {t('services.subtitle', 'Specialized data and cloud engineering services to help organizations transform their data into valuable insights and operational advantages.')}
          </p>
        </AnimatedTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
