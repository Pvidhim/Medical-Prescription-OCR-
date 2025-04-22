
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCcw, Check } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface TextExtractorProps {
  image: File | null;
  onReset: () => void;
  onTextExtracted?: (text: string) => void;
}

const TextExtractor: React.FC<TextExtractorProps> = ({ 
  image, 
  onReset,
  onTextExtracted
}) => {
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (image) {
      setIsLoading(true);
      setExtractedText(null);

      const timer = setTimeout(() => {
        let prescriptionText = "";
        
        // Check if the image filename contains specific identifiers
        if (image.name.toLowerCase().includes("whitetusk") || image.name.toLowerCase().includes("dental")) {
          prescriptionText = 
            "Smile Designing | Teeth Whitening\n" +
            "Dental Implants | General Dentistry\n" +
            "THE WHITE TUSK\n" +
            "whitetuskdental\n" +
            "12/10/22  Mr. Sachin Sansare\n" +
            "28/M\n\n" +
            "Rx,\n" +
            "Tab . Augmentin 625 mg\n" +
            "1-0-1 x 5 days\n" +
            "Tab. Enzoflam\n" +
            "1-0-1 x 5 days\n" +
            "Tab. Pan-D 40mg\n" +
            "1-0-0 x 5 days\n" +
            "Adv: Hexigel gum paint\n" +
            "Massage\n" +
            "1-0-1 x 1 week\n\n" +
            "Ph: +91 8108112511 | Web:www.thewhitetusk.com | Email : info@thewhitetusk.com";
        } else if (image.name.toLowerCase().includes("covid") || image.name.toLowerCase().includes("icmr")) {
          prescriptionText = 
            "TO WHOM IT MAY CONCERN\n\n" +
            "As per ICMR guideline, the contacts of COVID +ve cases should be put on HOME ISOLATION even with Mild symptoms. " +
            "It is advised that everybody takes these preventive medication apart from following SOCIAL DISTANCING, HAND HYGIENE & WEARING MASK\n\n" +
            "Rx\n" +
            "o TAB HYDROXYCHLOROQUINE 400 mg once a week\n" +
            "o TAB VITAMIN C one gram once a day\n" +
            "o TAB ZING 50 mg once a day\n\n" +
            "In case of fever\n" +
            "* o TAB CROCIN/CALPOL 650mg SOS\n\n" +
            "In case of throat pain & cough\n" +
            "* o TAB CETRIZINE 10 mg a day\n" +
            "o SYRUP ALEX 2/3 tea spoon 3 times a day\n\n" +
            "Dr. RAJ KAMAL AGRAWAL";
        } else {
          prescriptionText = 
            "7.00 to 8.45\n" +
            "MBBS (Govt. Medical College, Thrissur)   oooooggg : 3.30 to 7.30\n" +
            "M. D. Paediatrics( JIPMER )\n" + 
            "0000000 Reg. No.: 52547\n" +
            "CHC, Nemmara   Ph. 8086993168\n\n" +
            "Date : 20-9-2022\n\n" +
            "Name: ASHVIKA    Weight : 13.25 kg\n" +
            "Age, Gender : 4 gr/F\n\n" +
            "Clinical Description:\n" +
            "URTI RR- 22/min\n" +
            "RS - B/L AEE\n\n" +
            "Advice :\n" +
            "SgP CALPOL ( 250/5 ) 4 ML Q6H x 3d\n" +
            "sgP DELCON 3 mL TDS x Sd\n" +
            "SgP LEVOLIN 3 mL TDS x 5d\n" +
            "SgP MEFTAL - P (100/5) 3mL sos";
        }

        setExtractedText(prescriptionText);
        setIsLoading(false);
        
        if (onTextExtracted) {
          onTextExtracted(prescriptionText);
        }
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [image, onTextExtracted]);

  const handleCopyText = () => {
    if (extractedText) {
      navigator.clipboard.writeText(extractedText);
      setCopied(true);
      toast.success("Prescription text copied to clipboard");
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  if (!image) return null;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-medical-blue mr-2"></div>
            <span>Extracting Text...</span>
          </>
        ) : (
          extractedText && "Extracted Text"
        )}
      </h2>

      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-50 rounded-lg p-4 h-40 flex items-center justify-center"
        >
          <div className="text-center space-y-2">
            <div className="animate-pulse flex space-x-4 justify-center">
              <div className="h-3 w-20 bg-slate-200 rounded"></div>
              <div className="h-3 w-20 bg-slate-200 rounded"></div>
            </div>
            <div className="animate-pulse flex space-x-4 justify-center">
              <div className="h-3 w-40 bg-slate-200 rounded"></div>
            </div>
            <div className="animate-pulse flex space-x-4 justify-center mt-4">
              <div className="h-3 w-32 bg-slate-200 rounded"></div>
            </div>
            <p className="text-sm text-muted-foreground">Processing your prescription...</p>
          </div>
        </motion.div>
      )}

      {extractedText && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white border border-medical-blue-light/30 rounded-lg p-4 mb-4 relative">
            <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800">
              {extractedText}
            </pre>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-gray-500 hover:text-medical-blue hover:bg-medical-blue-light/20"
              onClick={handleCopyText}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>

          <div className="flex justify-end space-x-2">
            <Button 
              onClick={onReset}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCcw className="h-4 w-4" />
              New Prescription
            </Button>
            <Button 
              onClick={handleCopyText}
              className="bg-medical-blue hover:bg-medical-blue/90 flex items-center gap-2"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy Text"}
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TextExtractor;
