
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Users, Shield, Zap } from "lucide-react";

const About = () => {
  return (
    <PageLayout>
      <section className="bg-gradient-to-b from-medical-blue-light/30 to-transparent pt-16 pb-12">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight mb-4">About Our Tool</h1>
            <p className="text-lg text-muted-foreground">
              Prescription Text Extractor helps patients and healthcare providers by converting 
              hard-to-read prescriptions into clear, digital text.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                Our mission is to improve healthcare communication by making prescription information 
                more accessible and easier to understand. We believe that clear communication is essential 
                for proper medication adherence and patient safety.
              </p>
              <p className="text-muted-foreground mb-6">
                By converting handwritten and printed prescriptions into digital text, we help 
                reduce medication errors, improve patient understanding, and create better records for 
                personal healthcare management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button asChild className="bg-medical-blue hover:bg-medical-blue/90">
                  <Link to="/">Try It Now</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            <div className="bg-medical-blue-light/20 p-10 rounded-xl flex items-center justify-center">
              <FileText className="h-32 w-32 text-medical-blue/70" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-10 w-10 text-medical-blue" />,
                title: "Fast & Accurate",
                description: "Advanced OCR technology extracts text quickly with high accuracy."
              },
              {
                icon: <Shield className="h-10 w-10 text-medical-blue" />,
                title: "Secure & Private",
                description: "Your prescription information is processed securely and never stored."
              },
              {
                icon: <Users className="h-10 w-10 text-medical-blue" />,
                title: "User-Friendly",
                description: "Simple interface designed for users of all technical backgrounds."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="bg-medical-blue-light/30 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Try Our Tool?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Experience the ease of converting your prescription into clear, readable text with just a few clicks.
            </p>
            <Button asChild size="lg" className="bg-medical-blue hover:bg-medical-blue/90">
              <Link to="/">Try It Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
