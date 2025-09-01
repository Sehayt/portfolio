// "use client";

// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import Image from "next/image";
// import { Github, Linkedin, Mail } from "lucide-react";
// import { motion } from "framer-motion";
// import { AnimatedSection } from "./ui/animated-section";
// import { AnimatedCharacters, GradientText, TypewriterText } from "./ui/animated-text";
// import { ParticlesBackground } from "./ui/animated-background";
// import { useLanguage } from "@/lib/i18n-context";

// export default function HeroSection() {
//   const { t } = useLanguage();
  
//   return (
//     <ParticlesBackground intensity="medium" colorMode="auto">
//       <section id="home" className="py-20 relative overflow-hidden bg-[hsl(var(--hero-bg))]">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
//             <AnimatedSection className="w-full lg:w-1/2 space-y-6" delay={0.2}>
//               <div className="space-y-3">
//                 <TypewriterText
//                   text={t('hero.greeting', 'Hey there!')}
//                   className="text-muted-foreground"
//                 />
//                 <div className="text-4xl md:text-5xl font-bold">
//                   {t('hero.iam', "I'm")} <GradientText text="Oussama Shait" />
//                 </div>
//                 <div className="text-xl md:text-2xl font-medium text-muted-foreground">
//                   <AnimatedCharacters
//                     text={t('hero.title', "DATA & ANALYTICS ENGINEER - GCP CERTIFIED")}
//                     staggerChildren={0.015}
//                     delayStart={0.6}
//                   />
//                 </div>
//               </div>

//               <motion.p
//                 className="text-muted-foreground leading-relaxed"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 1.2 }}
//               >
//                 {t('hero.description', "Data Analytics Engineer specializing in cloud technologies and machine learning, with extensive experience in operational strategy. Expert in leveraging GCP and Azure to transform data into drivers of performance and strategic decision-making.")}
//               </motion.p>

//               <motion.div
//                 className="flex items-center space-x-4 pt-2"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 1.4 }}
//               >
//                 <motion.a
//                   href="https://github.com/oussamashait"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-secondary rounded-full p-2 hover:bg-secondary/80 transition-colors"
//                   whileHover={{ y: -3, scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <Github className="h-5 w-5" />
//                 </motion.a>
//                 <motion.a
//                   href="https://www.linkedin.com/in/oussamashait"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-secondary rounded-full p-2 hover:bg-secondary/80 transition-colors"
//                   whileHover={{ y: -3, scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <Linkedin className="h-5 w-5" />
//                 </motion.a>
//                 <motion.a
//                   href="mailto:oussamashait@gmail.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-secondary rounded-full p-2 hover:bg-secondary/80 transition-colors"
//                   whileHover={{ y: -3, scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <Mail className="h-5 w-5" />
//                 </motion.a>
//               </motion.div>

//               <motion.div
//                 className="flex flex-col sm:flex-row gap-4 pt-2"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 1.6 }}
//               >
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <a href="#contact">
//                     <Button className="w-full sm:w-auto">
//                       {t('hero.getInTouch', 'Get in Touch')}
//                     </Button>
//                   </a>
//                 </motion.div>
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <a
//                     href="/resume.pdf"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <Button variant="outline" className="w-full sm:w-auto">
//                       {t('hero.download', 'Download Resume')}
//                     </Button>
//                   </a>
//                 </motion.div>
//               </motion.div>
//             </AnimatedSection>

//             <motion.div
//               className="w-full lg:w-1/2 flex justify-center lg:justify-end relative"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//             >
//               <div className="relative">
//                 {/* Profile Picture Container */}
//                 <motion.div
//                   className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
//                   initial={{ scale: 0.8, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   transition={{ duration: 0.8, delay: 0.6 }}
//                 >
//                   {/* Animated border/ring */}
//                   <motion.div
//                     className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-blue-500 to-purple-500 p-1"
//                     animate={{
//                       rotate: [0, 360],
//                     }}
//                     transition={{
//                       duration: 20,
//                       repeat: Infinity,
//                       ease: "linear"
//                     }}
//                   >
//                     <div className="w-full h-full rounded-full bg-background p-2">
//                       <div className="relative w-full h-full rounded-full overflow-hidden">
//                         <Image
//                           src="/profile-picture.jpg"
//                           alt="Oussama Shait - Data & Analytics Engineer"
//                           fill
//                           className="object-cover"
//                           priority
//                           sizes="(max-width: 768px) 300px, 400px"
//                           onError={(e) => {
//                             // Fallback to placeholder if image fails to load
//                             e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format";
//                           }}
//                         />
//                       </div>
//                     </div>
//                   </motion.div>
                  
//                   {/* Floating elements around the picture */}
//                   <motion.div
//                     className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm"
//                     animate={{
//                       y: [0, -10, 0],
//                     }}
//                     transition={{
//                       duration: 3,
//                       repeat: Infinity,
//                       ease: "easeInOut"
//                     }}
//                   >
//                     {/* <span className="text-2xl">☁️</span> */}
//                     <span className="text-2xl"></span>
//                   </motion.div>
                  
//                   <motion.div
//                     className="absolute -bottom-4 -left-4 w-14 h-14 bg-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm"
//                     animate={{
//                       y: [0, 10, 0],
//                     }}
//                     transition={{
//                       duration: 4,
//                       repeat: Infinity,
//                       ease: "easeInOut",
//                       delay: 1
//                     }}
//                   >
//                     {/* <span className="text-xl">📊</span> */}
//                     <span className="text-xl"></span>
//                   </motion.div>
                  
//                   <motion.div
//                     className="absolute top-1/2 -left-8 w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm"
//                     animate={{
//                       x: [0, -5, 0],
//                     }}
//                     transition={{
//                       duration: 5,
//                       repeat: Infinity,
//                       ease: "easeInOut",
//                       delay: 2
//                     }}
//                   >
//                     {/* <span className="text-lg">🤖</span> */}
//                     <span className="text-lg"></span>
//                   </motion.div>
//                 </motion.div>
//               </div>
              
//               {/* Background glow effect */}
//               <motion.div
//                 className="absolute -z-10 w-full h-full rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"
//                 animate={{
//                   scale: [1, 1.1, 1],
//                   opacity: [0.5, 0.8, 0.5]
//                 }}
//                 transition={{
//                   duration: 6,
//                   repeat: Infinity,
//                   repeatType: "reverse"
//                 }}
//               />
//             </motion.div>
//           </div>
//         </div>
//       </section>
//     </ParticlesBackground>
//   );
// }