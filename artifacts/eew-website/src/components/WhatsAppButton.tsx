import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after scrolling down a bit to not clutter initial hero view
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center"
        >
          {/* Pulse Rings */}
          <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-30"></div>
          <div className="absolute inset-0 bg-[#25D366] rounded-full animate-pulse opacity-40 blur-sm scale-150"></div>
          
          <a
            href="https://wa.me/917767062794"
            target="_blank"
            rel="noopener noreferrer"
            className="relative bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_15px_rgba(37,211,102,0.5)] hover:shadow-[0_6px_25px_rgba(37,211,102,0.8)] hover:-translate-y-1 transition-all duration-300 group flex items-center justify-center"
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp className="w-8 h-8" />
            
            {/* Tooltip */}
            <span className="absolute right-full mr-4 bg-background border border-border text-foreground text-sm py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
              Chat with us
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
