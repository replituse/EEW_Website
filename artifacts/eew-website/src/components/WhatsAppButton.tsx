import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.4, type: "spring" }}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center"
    >
      {/* Outer pulse ring */}
      <span className="absolute inline-flex w-full h-full rounded-full bg-[#25D366] opacity-30 animate-ping" />
      {/* Inner glow ring */}
      <span className="absolute inline-flex w-[calc(100%+16px)] h-[calc(100%+16px)] rounded-full bg-[#25D366]/20 blur-md" />

      <a
        href="https://wa.me/917767062794"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        data-testid="button-whatsapp"
        className="relative w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center
          shadow-[0_4px_20px_rgba(37,211,102,0.55),0_0_0_4px_rgba(37,211,102,0.2)]
          hover:shadow-[0_6px_30px_rgba(37,211,102,0.75),0_0_0_6px_rgba(37,211,102,0.3)]
          hover:scale-110 active:scale-95 transition-all duration-300 group"
      >
        <FaWhatsapp className="w-9 h-9 text-white drop-shadow-md" />

        {/* Tooltip */}
        <span className="absolute right-full mr-4 bg-[#111827] border border-white/10 text-white text-sm py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none">
          Chat on WhatsApp
        </span>
      </a>
    </motion.div>
  );
}
