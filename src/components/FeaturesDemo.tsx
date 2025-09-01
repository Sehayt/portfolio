"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileUploader } from "@/components/ui/file-uploader";
import { toast } from "@/components/ui/toast";
import { useLanguage } from "@/lib/i18n-context";
import { motion } from "framer-motion";
import { Globe, Check, X, AlertTriangle, Info } from "lucide-react";

export default function FeaturesDemo() {
  const [files, setFiles] = useState<File[]>([]);
  const { language, setLanguage, t } = useLanguage();

  // Handle language change
  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en");

    toast.success(
      language === "en"
        ? "Langue changée en français"
        : "Language changed to English",
      { title: language === "en" ? "Changement de langue" : "Language Change" }
    );
  };

  // Show different toast types
  const showToasts = () => {
    toast.info("This is an info message", {
      title: "Information",
      duration: 3000
    });

    setTimeout(() => {
      toast.success("Operation completed successfully!", {
        title: "Success",
        duration: 3000
      });
    }, 1000);

    setTimeout(() => {
      toast.warning("Please be careful with this action", {
        title: "Warning",
        duration: 3000
      });
    }, 2000);

    setTimeout(() => {
      toast.error("An error occurred during the operation", {
        title: "Error",
        duration: 3000
      });
    }, 3000);
  };

  // Handle file upload
  const handleFilesChange = (newFiles: File[]) => {
    setFiles(newFiles);

    if (newFiles.length > 0) {
      toast.success(`${newFiles.length} file(s) selected`, {
        title: "Files Selected"
      });
    } else {
      toast.info("No files selected", {
        title: "Files Cleared"
      });
    }
  };

  return (
    <section id="features-demo" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('demo.title', 'New Features Demo')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('demo.subtitle', 'Try out the new interactive features we\'ve added to enhance your experience')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Language Toggle Demo */}
          <motion.div
            className="bg-background rounded-xl p-6 shadow-sm border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              {t('demo.languageToggle', 'Language Toggle')}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t('demo.languageDescription', 'Switch between English and French to see the internationalization in action')}
            </p>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {t('demo.currentLanguage', 'Current Language')}:
                </span>
                <span className="text-primary font-medium">
                  {language === "en" ? "English" : "Français"}
                </span>
              </div>
              <Button onClick={toggleLanguage} className="w-full">
                {language === "en" ? "Changer en Français" : "Switch to English"}
              </Button>
            </div>
          </motion.div>

          {/* Toast Notifications Demo */}
          <motion.div
            className="bg-background rounded-xl p-6 shadow-sm border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              {t('demo.toastNotifications', 'Toast Notifications')}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t('demo.toastDescription', 'Try out our new toast notification system with different styles')}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm p-2 rounded bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                <Info className="h-4 w-4" />
                {t('demo.infoToast', 'Info')}
              </div>
              <div className="flex items-center gap-2 text-sm p-2 rounded bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                <Check className="h-4 w-4" />
                {t('demo.successToast', 'Success')}
              </div>
              <div className="flex items-center gap-2 text-sm p-2 rounded bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
                <AlertTriangle className="h-4 w-4" />
                {t('demo.warningToast', 'Warning')}
              </div>
              <div className="flex items-center gap-2 text-sm p-2 rounded bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
                <X className="h-4 w-4" />
                {t('demo.errorToast', 'Error')}
              </div>
            </div>
            <Button onClick={showToasts} variant="secondary" className="w-full">
              {t('demo.showToasts', 'Show All Notifications')}
            </Button>
          </motion.div>

          {/* File Uploader Demo */}
          <motion.div
            className="bg-background rounded-xl p-6 shadow-sm border md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-primary"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="M12 12v6" />
                <path d="M15 15l-3-3-3 3" />
              </svg>
              {t('demo.fileUploader', 'File Uploader')}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t('demo.fileUploaderDescription', 'Try our new drag-and-drop file uploader component')}
            </p>
            <FileUploader
              multiple={true}
              maxFiles={5}
              maxSize={2}
              accept="image/*,.pdf,.doc,.docx"
              onFilesChange={handleFilesChange}
            />
          </motion.div>
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-muted-foreground">
            {t('demo.cursorNote', 'Notice the custom cursor follower as you move around and hover over different elements!')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
