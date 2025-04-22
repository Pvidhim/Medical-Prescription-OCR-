
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { History, ArrowRight } from "lucide-react";

interface PrescriptionItem {
  id: string;
  date: Date;
  text: string;
  imageSrc?: string;
}

interface PrescriptionHistoryProps {
  newItem?: { text: string; image?: File };
}

const PrescriptionHistory: React.FC<PrescriptionHistoryProps> = ({ newItem }) => {
  const [history, setHistory] = useState<PrescriptionItem[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        
        // Load history from localStorage
        const storedHistory = localStorage.getItem(`prescription_history_${JSON.parse(storedUser).email}`);
        if (storedHistory) {
          try {
            // Parse dates correctly from JSON
            const parsedHistory = JSON.parse(storedHistory, (key, value) => {
              // Convert date strings back to Date objects
              if (key === 'date' && typeof value === 'string') {
                return new Date(value);
              }
              return value;
            });
            setHistory(parsedHistory);
          } catch (error) {
            console.error("Failed to parse history:", error);
          }
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Add new item to history if provided and user is logged in
    if (newItem?.text && user?.email) {
      const newHistoryItem: PrescriptionItem = {
        id: `prescription_${Date.now()}`,
        date: new Date(),
        text: newItem.text,
        imageSrc: newItem.image ? URL.createObjectURL(newItem.image) : undefined
      };
      
      const updatedHistory = [newHistoryItem, ...history].slice(0, 10); // Keep last 10 items
      setHistory(updatedHistory);
      
      // Save to localStorage
      localStorage.setItem(
        `prescription_history_${user.email}`, 
        JSON.stringify(updatedHistory)
      );
      
      toast.success("Prescription saved to history");
    }
  }, [newItem, user?.email]);

  if (!user?.isLoggedIn || history.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-10"
    >
      <Card className="border-medical-blue-light overflow-hidden">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <History className="h-5 w-5 text-medical-blue" />
              <h3 className="text-lg font-medium">Recent Prescriptions</h3>
            </div>
            <span className="text-sm text-muted-foreground">
              {history.length} {history.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          
          <div className="space-y-3">
            {history.slice(0, 3).map((item) => (
              <div 
                key={item.id} 
                className="p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-sm">{format(item.date, "PPP")}</span>
                  <span className="text-xs text-muted-foreground">{format(item.date, "p")}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">{item.text}</p>
              </div>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="bg-gray-50 p-4">
          <Button asChild variant="ghost" className="w-full text-medical-blue hover:text-medical-blue/90 hover:bg-medical-blue-light/30">
            <Link to="/history" className="flex items-center justify-center">
              View All Prescriptions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PrescriptionHistory;
