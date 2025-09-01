"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedCard, AnimatedTitle } from "@/components/ui/animated-section";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n-context";

const blogPosts = [
  {
    id: 1,
    title: "Building Accessible Web Applications",
    excerpt: "Learn how to create more inclusive web experiences with these practical accessibility tips.",
    coverImage: "https://ext.same-assets.com/0/3072991592.svg",
    date: "May 12, 2023",
    readTime: "5 min read",
    tags: ["Accessibility", "Frontend", "HTML"],
    url: "/blog/building-accessible-web-applications",
  },
  {
    id: 2,
    title: "The Future of React: What's Coming in React 19",
    excerpt: "Exploring the upcoming features and improvements in React 19 and how they'll change the way we build interfaces.",
    coverImage: "https://ext.same-assets.com/0/127475595.svg",
    date: "April 3, 2023",
    readTime: "8 min read",
    tags: ["React", "JavaScript", "Frontend"],
    url: "/blog/future-of-react-19",
  },
  {
    id: 3,
    title: "Optimizing Website Performance: A Complete Guide",
    excerpt: "Deep dive into techniques for improving load times, reducing bundle sizes, and creating lightning-fast web experiences.",
    coverImage: "https://ext.same-assets.com/0/2715258859.svg",
    date: "March 15, 2023",
    readTime: "12 min read",
    tags: ["Performance", "Web Development", "Optimization"],
    url: "/blog/website-performance-guide",
  },
];

export default function BlogSection() {
  const { t } = useLanguage();
  return (
    <section id="blog" className="py-20 bg-[hsl(var(--section-bg))]">
      <div className="container mx-auto px-4">
        <AnimatedTitle className="text-center">
          <h2 className="section-title">Blog & Insights</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            
            {t('blog.subtitle', 'Thoughts, tutorials, and insights on web development, design, and technology')}
          </p>
        </AnimatedTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {blogPosts.map((post, index) => (
            <AnimatedCard
              key={post.id}
              className="bg-card border-border overflow-hidden flex flex-col h-full"
              delay={0.1 * index}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <CardHeader className="pb-2">
                <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
                  <span>{post.date}</span>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3 text-muted-foreground">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow pt-0">
                <div className="flex flex-wrap gap-1 mt-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="border-t border-border pt-4">
                <Link href={post.url} className="text-primary hover:text-primary/80 flex items-center text-sm">
                  Read article
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </AnimatedCard>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link href="/blog">
            <Button variant="outline" className="mx-auto">
              View all articles
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
