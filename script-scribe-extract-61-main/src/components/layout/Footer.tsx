
import React from "react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background py-8">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold mb-4">Prescription Text Extractor</h3>
            <p className="text-sm text-muted-foreground">
              Converting hard-to-read prescriptions into clear, digital text with our advanced OCR technology.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-3">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/how-it-works" className="text-sm text-muted-foreground hover:text-medical-blue transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm text-muted-foreground hover:text-medical-blue transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-muted-foreground hover:text-medical-blue transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-medical-blue transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-medical-blue transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-medical-blue transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-3">Subscribe to Updates</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Stay informed about our latest features and improvements.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <button className="h-10 px-4 py-2 bg-medical-blue text-white rounded-md hover:bg-medical-blue/90 transition-colors text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Prescription Text Extractor. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="#" className="text-muted-foreground hover:text-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              <span className="sr-only">Facebook</span>
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
              <span className="sr-only">Twitter</span>
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
