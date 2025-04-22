
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import ImageUploader from "@/components/prescription/ImageUploader";
import TextExtractor from "@/components/prescription/TextExtractor";
import PrescriptionHistory from "@/components/prescription/PrescriptionHistory";
import { ArrowRight, Camera, FileText, Sparkles, Pill, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }
  }, []);

  const handleImageUpload = (file: File) => {
    setUploadedImage(file);
    setExtractedText(null); // Reset extracted text when new image is uploaded
  };

  const handleExtractedText = (text: string) => {
    setExtractedText(text);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setExtractedText(null);
  };

  // Features section data
  const features = [
    {
      icon: Camera,
      title: "Capture Prescriptions",
      description: "Upload a photo of your prescription directly from your device."
    },
    {
      icon: FileText,
      title: "Text Recognition",
      description: "Our advanced OCR technology extracts text from handwritten and printed prescriptions."
    },
    {
      icon: Sparkles,
      title: "Clear Results",
      description: "Get your prescription text in a readable, digital format that's easy to share and store."
    }
  ];

  return (
    <PageLayout>
      <section className="bg-gradient-to-b from-medical-blue-light/30 to-transparent pt-16 pb-8 md:pt-24 md:pb-12 relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            transition={{ duration: 1 }}
            className="absolute right-[5%] top-[20%] transform rotate-12"
          >
            <Pill className="w-48 h-48 text-medical-blue" strokeWidth={1} />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute left-[10%] bottom-[15%] transform -rotate-12"
          >
            <Pill className="w-32 h-32 text-medical-green" strokeWidth={1} />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.08 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="absolute left-[15%] top-[25%] transform -rotate-12"
          >
            <svg width="200" height="50" viewBox="0 0 200 50" className="text-medical-blue">
              <path 
                d="M0,25 Q20,5 40,25 T80,25 T120,25 T160,25 T200,25" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5"
              />
            </svg>
          </motion.div>
        </div>

        <div className="container relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto space-y-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-medical-blue via-medical-blue to-medical-green bg-clip-text text-transparent">
                Prescription Text Extractor
              </h1>
              
              <p className="mt-4 md:mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
                Upload your medical prescription image and get the clear, readable text instantly.
                {!user?.isLoggedIn && " Sign in to save your history."}
              </p>
              
              {!user?.isLoggedIn && (
                <div className="flex flex-wrap justify-center gap-4 pt-2">
                  <Button asChild className="bg-medical-blue hover:bg-medical-blue/90">
                    <Link to="/auth">Sign In to Access Your Past Prescriptions</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/how-it-works">Learn More</Link>
                  </Button>
                </div>
              )}
            </motion.div>
            
            <motion.div
              className="w-full mt-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white rounded-xl shadow-lg border border-medical-blue-light/50 overflow-hidden">
                <div className="p-6 md:p-8">
                  <ImageUploader onImageUpload={handleImageUpload} />
                  <TextExtractor 
                    image={uploadedImage} 
                    onReset={handleReset} 
                    onTextExtracted={handleExtractedText}
                  />
                </div>
              </div>
              
              {user?.isLoggedIn && (
                <PrescriptionHistory 
                  newItem={extractedText ? { text: extractedText, image: uploadedImage || undefined } : undefined} 
                />
              )}
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Why Use Our Tool?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our prescription text extractor helps you convert hard-to-read prescriptions into clear, digital text.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center p-6 rounded-xl border bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-medical-blue-light/50 flex items-center justify-center mb-4">
                  <feature.icon className="h-7 w-7 text-medical-blue" />
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-medical-blue-light/20">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">How It Works</h2>
              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    title: "Upload Prescription",
                    description: "Upload a photo of your handwritten or printed prescription."
                  },
                  {
                    step: 2,
                    title: "AI Extracts Text",
                    description: "Our advanced OCR technology processes and extracts the text."
                  },
                  {
                    step: 3,
                    title: "Get Clear Text",
                    description: "View and copy the clearly formatted prescription details."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-medical-blue flex items-center justify-center shrink-0">
                      <span className="text-white font-bold">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8">
                <Button asChild className="bg-medical-blue hover:bg-medical-blue/90">
                  <Link to="/how-it-works" className="flex items-center">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="md:w-1/2 bg-white p-6 rounded-xl shadow-md border border-medical-blue-light/30"
            >
              <img 
                src="https://placehold.co/600x400/e2f1ff/1EAEDB?text=Prescription+Demo" 
                alt="Prescription Demo" 
                className="w-full h-auto rounded-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Extract Your Prescription?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start using our tool today and never struggle with reading prescriptions again.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-medical-blue hover:bg-medical-blue/90"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Try Now
            </Button>
            {!user?.isLoggedIn && (
              <Button asChild size="lg" variant="outline">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
