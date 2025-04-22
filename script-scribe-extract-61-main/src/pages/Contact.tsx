
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import ContactForm from "@/components/contact/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  return (
    <PageLayout>
      <section className="bg-gradient-to-b from-medical-blue-light/30 to-transparent pt-16 pb-12">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground">
              Have questions about our Prescription Text Extractor? We're here to help!
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
              <p className="text-muted-foreground mb-6">
                Fill out the form and our team will get back to you as soon as possible. 
                We value your feedback and are happy to answer any questions about our tool.
              </p>
              
              <div className="space-y-6 mt-10">
                <div className="flex items-start">
                  <div className="bg-medical-blue-light/20 p-3 rounded-full mr-4">
                    <Mail className="h-5 w-5 text-medical-blue" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">support@prescriptionextractor.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-medical-blue-light/20 p-3 rounded-full mr-4">
                    <Phone className="h-5 w-5 text-medical-blue" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-muted-foreground">(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-medical-blue-light/20 p-3 rounded-full mr-4">
                    <MapPin className="h-5 w-5 text-medical-blue" />
                  </div>
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-muted-foreground">123 Medical Tech Blvd, Suite 456<br />Health City, CA 98765</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground mb-12">
              Find quick answers to common questions about our Prescription Text Extractor tool.
            </p>
            
            <div className="space-y-6 text-left">
              {[
                {
                  question: "Is my prescription data secure?",
                  answer: "Yes, your privacy is our priority. We do not store your prescription images or the extracted text. All processing happens on your device."
                },
                {
                  question: "What image formats are supported?",
                  answer: "Our tool supports common image formats including JPG, JPEG, and PNG."
                },
                {
                  question: "How accurate is the text extraction?",
                  answer: "Our OCR technology is highly accurate, especially for typed prescriptions. Handwritten prescriptions may vary depending on legibility."
                },
                {
                  question: "Is this tool free to use?",
                  answer: "Yes, our basic prescription text extraction service is completely free to use."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border">
                  <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
