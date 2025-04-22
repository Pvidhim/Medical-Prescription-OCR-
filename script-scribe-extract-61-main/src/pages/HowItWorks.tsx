
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Upload, 
  Cpu, 
  FileText, 
  Copy, 
  Share2, 
  ShieldCheck
} from "lucide-react";

const HowItWorks = () => {
  return (
    <PageLayout>
      <section className="bg-gradient-to-b from-medical-blue-light/30 to-transparent pt-16 pb-12">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight mb-4">How It Works</h1>
            <p className="text-lg text-muted-foreground">
              Our Prescription Text Extractor uses advanced Optical Character Recognition 
              technology to transform hard-to-read prescriptions into clear digital text.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid gap-12">
            {/* Step 1 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <span className="inline-block bg-medical-blue-light text-medical-blue rounded-full px-3 py-1 text-sm font-medium mb-3">
                  Step 1
                </span>
                <h2 className="text-3xl font-bold mb-4">Upload Prescription Image</h2>
                <p className="text-muted-foreground mb-4">
                  Take a photo of your prescription or upload an existing image. 
                  Our system accepts common image formats like JPG and PNG.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-5 w-5 text-medical-blue flex-shrink-0">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <span>Secure and private image handling</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-5 w-5 text-medical-blue flex-shrink-0">
                      <Upload className="h-5 w-5" />
                    </div>
                    <span>Simple drag-and-drop interface</span>
                  </li>
                </ul>
              </div>
              <div className="bg-medical-blue-light/20 p-8 rounded-xl order-1 md:order-2 flex items-center justify-center">
                <Upload className="h-20 w-20 text-medical-blue" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-medical-green-light/20 p-8 rounded-xl flex items-center justify-center">
                <Cpu className="h-20 w-20 text-medical-green" />
              </div>
              <div>
                <span className="inline-block bg-medical-green-light text-medical-green rounded-full px-3 py-1 text-sm font-medium mb-3">
                  Step 2
                </span>
                <h2 className="text-3xl font-bold mb-4">AI Extracts Text</h2>
                <p className="text-muted-foreground mb-4">
                  Our advanced OCR technology processes the image, recognizing both typed and handwritten medical text, 
                  even identifying medical terminology and prescription formatting.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-5 w-5 text-medical-green flex-shrink-0">
                      <Cpu className="h-5 w-5" />
                    </div>
                    <span>Advanced machine learning algorithms</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-5 w-5 text-medical-green flex-shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                    <span>Specialized for medical terminology</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <span className="inline-block bg-medical-blue-light text-medical-blue rounded-full px-3 py-1 text-sm font-medium mb-3">
                  Step 3
                </span>
                <h2 className="text-3xl font-bold mb-4">Get Clear Text Output</h2>
                <p className="text-muted-foreground mb-4">
                  View the extracted prescription text in a clean, readable format. 
                  Easily copy the text to your clipboard or save it for future reference.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-5 w-5 text-medical-blue flex-shrink-0">
                      <Copy className="h-5 w-5" />
                    </div>
                    <span>One-click copy to clipboard</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-5 w-5 text-medical-blue flex-shrink-0">
                      <Share2 className="h-5 w-5" />
                    </div>
                    <span>Easy to share with healthcare providers</span>
                  </li>
                </ul>
              </div>
              <div className="bg-medical-blue-light/20 p-8 rounded-xl order-1 md:order-2 flex items-center justify-center">
                <FileText className="h-20 w-20 text-medical-blue" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-10">Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Improved Accuracy",
                description: "Clear digital text eliminates misinterpretation of handwritten prescriptions."
              },
              {
                title: "Time Saving",
                description: "Instantly convert prescription text rather than manual transcription."
              },
              {
                title: "Better Healthcare Management",
                description: "Keep digital records of your prescriptions for easy reference."
              }
            ].map((benefit, index) => (
              <Card key={index} className="border-none shadow-sm">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default HowItWorks;
