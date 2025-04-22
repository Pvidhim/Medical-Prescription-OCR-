
import React, { useState, useRef } from "react";
import { UploadCloud, X, FileX, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const validateFile = (file: File): boolean => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a JPG, JPEG or PNG image file");
      return false;
    }
    
    // 10MB max size
    if (file.size > 10 * 1024 * 1024) {
      setError("File size should be less than 10MB");
      return false;
    }
    
    return true;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    setError(null);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    if (validateFile(file)) {
      setSelectedFile(file);
      onImageUpload(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!selectedFile ? (
        <div
          className={cn(
            "drop-zone",
            dragging && "active",
            error && "error"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <div className="flex flex-col items-center text-center">
            <UploadCloud className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Upload Prescription</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop your prescription image here, or click to browse
            </p>
            <Button
              type="button"
              className="bg-medical-blue hover:bg-medical-blue/90"
              onClick={(e) => {
                e.stopPropagation();
                triggerFileInput();
              }}
            >
              Select File
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/jpeg,image/png,image/jpg"
            onChange={handleFileChange}
          />
          {error && (
            <div className="mt-4 text-destructive text-sm flex items-center justify-center">
              <FileX className="h-4 w-4 mr-1" />
              {error}
            </div>
          )}
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-medical-blue mr-2" />
              <span className="font-medium text-sm truncate max-w-[240px]">
                {selectedFile.name}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemoveFile}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
          {preview && (
            <div className="relative aspect-video overflow-hidden rounded-md mt-2">
              <img
                src={preview}
                alt="Prescription preview"
                className="object-contain w-full h-full"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
