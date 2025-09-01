"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, XCircle, AlertCircle, Loader2, Mail, Phone, MapPin } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AnimatedTitle } from "@/components/ui/animated-section";
import { useLanguage } from "@/lib/i18n-context";

// Form validation schema
const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactSection() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { t } = useLanguage();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty, touchedFields },
    reset,
    watch
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange"
  });

  // Watch form fields for animations
  const watchedFields = watch();

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setFormState('submitting');

    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log("Form submitted:", data);
      setFormState('success');
      reset();

      // Reset form state after a delay
      setTimeout(() => {
        setFormState('idle');
      }, 3000);
    } catch (error) {
      console.error("Form error:", error);
      setFormState('error');

      // Reset error state after a delay
      setTimeout(() => {
        setFormState('idle');
      }, 3000);
    }
  };

  // Animation variants
  const inputVariants = {
    focus: { scale: 1.02, borderColor: "rgba(var(--primary), 0.5)", boxShadow: "0 0 0 3px rgba(var(--primary), 0.15)" },
    error: { x: [0, -5, 5, -5, 5, 0], transition: { duration: 0.4 } },
    success: {
      borderColor: "rgba(var(--success), 0.5)",
      boxShadow: "0 0 0 2px rgba(var(--success), 0.15)",
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.98 },
    submitting: { opacity: 0.8 }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 10, transition: { duration: 0.2 } }
  };

  // Contact information
  const contactInfo = {
    email: "oussama.seth22@gmail.com",
    phone: "(+212) 6 63 82 12 68",
    location: "Casablanca, Morocco"
  };

  return (
    <section id="contact" className="py-20 bg-[hsl(var(--section-bg))]">
      <div className="container mx-auto px-4">
        <AnimatedTitle className="text-center">
          <h2 className="section-title">{t('contact.title', "Let's Connect")}</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            {t('contact.subtitle', "Have a question or want to work together? Get in touch and let's create something amazing.")}
          </p>
        </AnimatedTitle>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Contact Info Cards */}
              <motion.div
                className="bg-background rounded-xl p-6 shadow-sm border flex items-start gap-4"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">{t('contact.email', "Email")}</h3>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-primary hover:underline"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="bg-background rounded-xl p-6 shadow-sm border flex items-start gap-4"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">{t('contact.phone', "Phone")}</h3>
                  <a
                    href={`tel:${contactInfo.phone.replace(/[()\s]/g, '')}`}
                    // href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                    className="text-primary hover:underline"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="bg-background rounded-xl p-6 shadow-sm border flex items-start gap-4"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">{t('contact.location', "Location")}</h3>
                  <p className="text-muted-foreground">{contactInfo.location}</p>
                </div>
              </motion.div>

              {/* Map */}
              <motion.div
                className="bg-background rounded-xl p-2 shadow-sm border h-[250px] overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <iframe
                  src= "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d157626.07368593992!2d-7.742877822670783!3d33.57218979480196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778aa113b%3A0xb06c1d84f310fd3!2sCasablanca%2C%20Morocco!5e1!3m2!1sen!2sus!4v1743013783566!5m2!1sen!2sus"
                  // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.64881847406!2d-122.45194559519766!3d37.773238887489005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1648144021686!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                ></iframe>
              </motion.div>
            </motion.div>
          </div>

          <motion.form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-foreground"
                >
                  {t('contact.form.firstName', "First Name")}
                </label>
                <motion.div
                  animate={
                    errors.firstName
                      ? "error"
                      : focusedField === "firstName"
                        ? "focus"
                        : touchedFields.firstName && !errors.firstName
                          ? "success"
                          : ""
                  }
                  variants={inputVariants}
                  className="relative"
                >
                  <input
                    id="firstName"
                    type="text"
                    className={`w-full px-4 py-2 rounded-md bg-background border transition-all duration-200 focus:outline-none ${
                      errors.firstName
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-border focus:border-primary focus:ring-primary/20"
                    }`}
                    {...register("firstName")}
                    onFocus={() => setFocusedField("firstName")}
                    onBlur={() => setFocusedField(null)}
                  />

                  {/* Input status icons */}
                  <AnimatePresence mode="wait">
                    {touchedFields.firstName && (
                      <motion.div
                        key={errors.firstName ? "error" : "success"}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {errors.firstName ? (
                          <XCircle className="h-5 w-5 text-red-500" />
                        ) : (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Error message */}
                <AnimatePresence>
                  {errors.firstName && (
                    <motion.p
                      className="text-red-500 text-xs mt-1 flex items-center gap-1"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={messageVariants}
                    >
                      <AlertCircle className="h-3 w-3" />
                      {errors.firstName.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Last Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-foreground"
                >
                  {t('contact.form.lastName', "Last Name")}
                </label>
                <motion.div
                  animate={
                    errors.lastName
                      ? "error"
                      : focusedField === "lastName"
                        ? "focus"
                        : touchedFields.lastName && !errors.lastName
                          ? "success"
                          : ""
                  }
                  variants={inputVariants}
                  className="relative"
                >
                  <input
                    id="lastName"
                    type="text"
                    className={`w-full px-4 py-2 rounded-md bg-background border transition-all duration-200 focus:outline-none ${
                      errors.lastName
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-border focus:border-primary focus:ring-primary/20"
                    }`}
                    {...register("lastName")}
                    onFocus={() => setFocusedField("lastName")}
                    onBlur={() => setFocusedField(null)}
                  />

                  {/* Input status icons */}
                  <AnimatePresence mode="wait">
                    {touchedFields.lastName && (
                      <motion.div
                        key={errors.lastName ? "error" : "success"}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {errors.lastName ? (
                          <XCircle className="h-5 w-5 text-red-500" />
                        ) : (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Error message */}
                <AnimatePresence>
                  {errors.lastName && (
                    <motion.p
                      className="text-red-500 text-xs mt-1 flex items-center gap-1"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={messageVariants}
                    >
                      <AlertCircle className="h-3 w-3" />
                      {errors.lastName.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground"
              >
                {t('contact.form.email', "Email")}
              </label>
              <motion.div
                animate={
                  errors.email
                    ? "error"
                    : focusedField === "email"
                      ? "focus"
                      : touchedFields.email && !errors.email
                        ? "success"
                        : ""
                }
                variants={inputVariants}
                className="relative"
              >
                <input
                  id="email"
                  type="email"
                  className={`w-full px-4 py-2 rounded-md bg-background border transition-all duration-200 focus:outline-none ${
                    errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-border focus:border-primary focus:ring-primary/20"
                  }`}
                  {...register("email")}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />

                {/* Input status icons */}
                <AnimatePresence mode="wait">
                  {touchedFields.email && (
                    <motion.div
                      key={errors.email ? "error" : "success"}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {errors.email ? (
                        <XCircle className="h-5 w-5 text-red-500" />
                      ) : (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Error message */}
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    className="text-red-500 text-xs mt-1 flex items-center gap-1"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={messageVariants}
                  >
                    <AlertCircle className="h-3 w-3" />
                    {errors.email.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-foreground"
              >
                {t('contact.form.message', "Message")}
              </label>
              <motion.div
                animate={
                  errors.message
                    ? "error"
                    : focusedField === "message"
                      ? "focus"
                      : touchedFields.message && !errors.message
                        ? "success"
                        : ""
                }
                variants={inputVariants}
                className="relative"
              >
                <textarea
                  id="message"
                  rows={5}
                  className={`w-full px-4 py-2 rounded-md bg-background border transition-all duration-200 focus:outline-none ${
                    errors.message
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-border focus:border-primary focus:ring-primary/20"
                  }`}
                  {...register("message")}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                ></textarea>

                {/* Input status icons */}
                <AnimatePresence mode="wait">
                  {touchedFields.message && (
                    <motion.div
                      key={errors.message ? "error" : "success"}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-3 top-6 transform -translate-y-1/2"
                    >
                      {errors.message ? (
                        <XCircle className="h-5 w-5 text-red-500" />
                      ) : (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Character count indicator */}
                {watchedFields.message && (
                  <motion.div
                    className="absolute right-3 bottom-3 text-xs text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {watchedFields.message.length} / 10+ chars
                  </motion.div>
                )}
              </motion.div>

              {/* Error message */}
              <AnimatePresence>
                {errors.message && (
                  <motion.p
                    className="text-red-500 text-xs mt-1 flex items-center gap-1"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={messageVariants}
                  >
                    <AlertCircle className="h-3 w-3" />
                    {errors.message.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Form submission feedback messages */}
            <div className="min-h-[50px]">
              <AnimatePresence mode="wait">
                {formState === 'success' && (
                  <motion.div
                    className="bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400 px-4 py-3 rounded-md flex items-center gap-2"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={messageVariants}
                  >
                    <CheckCircle2 className="h-5 w-5" />
                    {t('contact.form.successMessage', "Thank you for your message! I'll get back to you soon.")}
                  </motion.div>
                )}

                {formState === 'error' && (
                  <motion.div
                    className="bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400 px-4 py-3 rounded-md flex items-center gap-2"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={messageVariants}
                  >
                    <XCircle className="h-5 w-5" />
                    {t('contact.form.errorMessage', "Sorry, there was an error sending your message. Please try again.")}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <motion.button
                type="submit"
                className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2"
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
                animate={formState === 'submitting' ? "submitting" : "idle"}
                disabled={isSubmitting || formState === 'submitting'}
              >
                {formState === 'submitting' ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {t('contact.form.sending', "Sending...")}
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    {t('contact.form.send', "Send Message")}
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
