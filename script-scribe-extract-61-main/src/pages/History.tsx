
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Download, Copy, Trash2, Calendar, Clock, File } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

// Sample history item type
interface HistoryItem {
  id: string;
  date: Date;
  text: string;
  imageSrc: string;
}

const History = () => {
  const navigate = useNavigate();
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "week" | "month">("all");

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/auth");
      return;
    }

    // Generate some sample history data
    const sampleData: HistoryItem[] = [
      {
        id: "item1",
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        text: "Amoxicillin 500mg, Take 1 tablet by mouth three times a day for 10 days. #30 tablets. No refills.",
        imageSrc: "https://placehold.co/400x300/e2f1ff/1EAEDB?text=Prescription+1"
      },
      {
        id: "item2",
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
        text: "Lisinopril 10mg, Take 1 tablet by mouth once daily. #30 tablets. Refill: 3 times.",
        imageSrc: "https://placehold.co/400x300/e2f1ff/1EAEDB?text=Prescription+2"
      },
      {
        id: "item3",
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12), // 12 days ago
        text: "Metformin 500mg, Take 1 tablet by mouth twice a day with meals. #60 tablets. Refill: 5 times.",
        imageSrc: "https://placehold.co/400x300/e2f1ff/1EAEDB?text=Prescription+3"
      },
      {
        id: "item4",
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 32), // 32 days ago
        text: "Atorvastatin 20mg, Take 1 tablet by mouth at bedtime. #30 tablets. Refill: 2 times.",
        imageSrc: "https://placehold.co/400x300/e2f1ff/1EAEDB?text=Prescription+4"
      },
    ];

    // Simulate API call
    setTimeout(() => {
      setHistoryItems(sampleData);
      setIsLoading(false);
    }, 1000);
  }, [navigate]);

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Text copied to clipboard");
  };

  const handleDelete = (id: string) => {
    setHistoryItems(items => items.filter(item => item.id !== id));
    toast.success("Item deleted from history");
  };

  const handleDownload = (item: HistoryItem) => {
    const element = document.createElement("a");
    const file = new Blob([item.text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `prescription-${format(item.date, "yyyy-MM-dd")}.txt`;
    document.body.appendChild(element);
    element.click();
    toast.success("Prescription downloaded as text file");
  };

  const filteredItems = () => {
    const now = new Date();
    switch (filter) {
      case "week":
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return historyItems.filter(item => item.date >= weekAgo);
      case "month":
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return historyItems.filter(item => item.date >= monthAgo);
      default:
        return historyItems;
    }
  };

  return (
    <PageLayout>
      <div className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight text-medical-blue">Your Prescription History</h1>
            <Button onClick={() => navigate("/")} className="bg-medical-blue hover:bg-medical-blue/90">
              Extract New Prescription
            </Button>
          </div>

          <Tabs defaultValue="all" onValueChange={(value) => setFilter(value as any)} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
              <TabsTrigger value="all">All Time</TabsTrigger>
              <TabsTrigger value="week">Past Week</TabsTrigger>
              <TabsTrigger value="month">Past Month</TabsTrigger>
            </TabsList>
          </Tabs>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="border-medical-blue-light/50 animate-pulse">
                  <CardHeader className="bg-medical-blue-light/20 h-[100px]"></CardHeader>
                  <CardContent className="p-6">
                    <div className="h-4 bg-slate-200 rounded w-1/2 mb-3"></div>
                    <div className="h-4 bg-slate-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-slate-200 rounded w-3/5"></div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 p-4"></CardFooter>
                </Card>
              ))}
            </div>
          ) : filteredItems().length === 0 ? (
            <div className="text-center p-12 border rounded-lg bg-gray-50">
              <File className="w-12 h-12 text-medical-blue mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No prescriptions found</h3>
              <p className="text-muted-foreground mb-4">
                You don't have any prescription records for this time period.
              </p>
              <Button onClick={() => navigate("/")} className="bg-medical-blue hover:bg-medical-blue/90">
                Extract Your First Prescription
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredItems().map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-medical-blue-light hover:shadow-md transition-all overflow-hidden">
                    <CardHeader className="bg-gradient-to-br from-medical-blue-light/30 to-medical-blue-light/10 pb-3">
                      <CardTitle className="flex justify-between items-center text-lg">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-medical-blue" />
                          <span>{format(item.date, "PPP")}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{format(item.date, "p")}</span>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="p-4">
                      <p className="font-medium text-gray-700 whitespace-pre-wrap">
                        {item.text}
                      </p>
                      <Separator className="my-4" />
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="aspect-[4/3] rounded border overflow-hidden">
                          <img 
                            src={item.imageSrc} 
                            alt="Prescription" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <h4 className="font-medium text-sm">Extracted Prescription</h4>
                          <p className="text-xs text-muted-foreground line-clamp-4">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="bg-gray-50 p-4 flex justify-between">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleCopyText(item.text)}>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDownload(item)}>
                          <Download className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default History;
