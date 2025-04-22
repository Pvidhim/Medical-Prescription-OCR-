
import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  // Create gradient patterns based on the current page
  const getGradient = () => {
    switch (location.pathname) {
      case "/":
        return "bg-gradient-to-b from-medical-blue-light/30 to-transparent";
      case "/how-it-works":
        return "bg-gradient-to-br from-medical-blue-light/30 via-medical-green-light/20 to-transparent";
      case "/about":
        return "bg-gradient-to-tl from-medical-blue-light/20 via-white to-medical-green-light/20";
      case "/contact":
        return "bg-gradient-to-br from-medical-blue-light/20 via-white to-white";
      case "/auth":
        return "bg-gradient-to-t from-medical-blue-light/10 via-white to-medical-blue-light/20";
      case "/history":
        return "bg-gradient-to-br from-medical-blue-light/20 via-white to-medical-green-light/10";
      default:
        return "bg-white";
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className={`flex-1 ${getGradient()}`}
        >
          <main className="flex-1">{children}</main>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default PageLayout;
