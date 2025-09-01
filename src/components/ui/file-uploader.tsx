"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, FileIcon, Check, Image as ImageIcon } from "lucide-react";
import { Button } from "./button";
import { useLanguage } from "@/lib/i18n-context";

interface FileUploaderProps {
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // in MB
  onFilesChange?: (files: File[]) => void;
  className?: string;
  showPreview?: boolean;
}

export function FileUploader({
  accept = "*",
  multiple = false,
  maxFiles = 5,
  maxSize = 5, // 5MB default
  onFilesChange,
  className = "",
  showPreview = true,
}: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const isImage = (file: File) => {
    return file.type.startsWith("image/");
  };

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;

      const newErrors: string[] = [];
      const newFiles: File[] = [];

      // Convert FileList to array and filter
      Array.from(fileList).forEach((file) => {
        // Check file size
        if (file.size > maxSize * 1024 * 1024) {
          newErrors.push(`${file.name}: ${t('fileUploader.fileTooLarge', `File exceeds ${maxSize}MB limit`)}`);
          return;
        }

        // Check for duplicate files
        if (files.some((f) => f.name === file.name && f.size === file.size)) {
          newErrors.push(`${file.name}: ${t('fileUploader.fileDuplicate', 'File already added')}`);
          return;
        }

        newFiles.push(file);
      });

      // Check if we're exceeding max files count
      if (files.length + newFiles.length > maxFiles) {
        newErrors.push(t('fileUploader.tooManyFiles', `Maximum ${maxFiles} files allowed`));
        return;
      }

      // Update file list
      if (newFiles.length > 0) {
        const updatedFiles = multiple ? [...files, ...newFiles] : newFiles;
        setFiles(updatedFiles);

        // Generate previews for images
        if (showPreview) {
          const newPreviews = [...previews];
          newFiles.forEach((file) => {
            if (isImage(file)) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setPreviews((prev) => [...prev, reader.result as string]);
              };
              reader.readAsDataURL(file);
            } else {
              newPreviews.push("");
            }
          });
        }

        // Call onChange callback
        if (onFilesChange) {
          onFilesChange(updatedFiles);
        }
      }

      // Set errors if any
      if (newErrors.length > 0) {
        setErrors(newErrors);
        setTimeout(() => {
          setErrors([]);
        }, 3000);
      }
    },
    [files, maxFiles, maxSize, multiple, onFilesChange, previews, showPreview, t]
  );

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  // Handle drop
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  // Drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  // Trigger file browser
  const openFileBrowser = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Remove a file
  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);

    if (showPreview) {
      const newPreviews = [...previews];
      newPreviews.splice(index, 1);
      setPreviews(newPreviews);
    }

    if (onFilesChange) {
      onFilesChange(newFiles);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Drag and drop zone */}
      <motion.div
        className={`w-full border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          dragging
            ? "border-primary bg-primary/10"
            : "border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileBrowser}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <Upload className="h-10 w-10 text-muted-foreground/70" />
          <p className="font-medium text-muted-foreground">
            {t('fileUploader.dragDrop', 'Drag and drop files here or click to browse')}
          </p>
          <p className="text-xs text-muted-foreground/70">
            {t('fileUploader.maxSize', 'Maximum file size')}: {maxSize}MB
            {multiple && ` | ${t('fileUploader.maxFiles', 'Maximum files')}: ${maxFiles}`}
          </p>
        </div>
      </motion.div>

      {/* Error messages */}
      <AnimatePresence>
        {errors.length > 0 && (
          <motion.div
            className="mt-2 text-red-500 text-sm"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ul className="list-disc list-inside">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* File preview */}
      {showPreview && files.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="font-medium text-sm">{t('fileUploader.selectedFiles', 'Selected Files')}:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {files.map((file, index) => (
              <motion.div
                key={index}
                className="relative flex items-start p-3 rounded-md border border-muted-foreground/30 bg-background"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex-1 min-w-0 mr-3">
                  {isImage(file) && previews[index] ? (
                    <div className="mb-2 rounded-md overflow-hidden h-20 bg-muted">
                      <img
                        src={previews[index]}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center mb-2">
                      <FileIcon className="h-6 w-6 text-muted-foreground mr-2" />
                    </div>
                  )}
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full absolute top-2 right-2 bg-background/80 hover:bg-background"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      {files.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {/* Add more files button */}
          {multiple && files.length < maxFiles && (
            <Button
              variant="outline"
              size="sm"
              onClick={openFileBrowser}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              {t('fileUploader.addMore', 'Add More')}
            </Button>
          )}

          {/* Clear all button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setFiles([]);
              setPreviews([]);
              if (onFilesChange) {
                onFilesChange([]);
              }
            }}
            className="flex items-center gap-2 text-muted-foreground"
          >
            <X className="h-4 w-4" />
            {t('fileUploader.clearAll', 'Clear All')}
          </Button>
        </div>
      )}
    </div>
  );
}
