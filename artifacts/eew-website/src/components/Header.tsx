import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import eewLogo from "@assets/Gemini_Generated_Image_1duauj1duauj1dua__1_-removebg-preview_1777791151139.png";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-white/5 py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 z-50">
            <img
              src={eewLogo}
              alt="EEW Logo"
              className="w-12 h-12 object-contain"
            />
            <div className="hidden md:flex flex-col">
              <span className="font-heading font-bold text-xl tracking-wider text-white">EEW</span>
              <span className="text-[0.65rem] text-primary tracking-widest uppercase font-semibold">Engineering Works</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-primary transition-colors hover:text-glow relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Contact Info & CTA (Desktop) */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex flex-col items-end text-sm">
              <a href="tel:+917767062794" className="flex items-center gap-2 text-white/90 hover:text-primary transition-colors">
                <Phone className="w-3.5 h-3.5" />
                <span className="font-medium">+91 7767062794</span>
              </a>
              <a href="mailto:electricalsengineeringworks@gmail.com" className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors text-xs">
                <Mail className="w-3 h-3" />
                <span>electricalsengineeringworks@gmail.com</span>
              </a>
            </div>
            <Button
              className="bg-primary text-background hover:bg-primary/90 font-semibold shadow-[0_0_15px_rgba(245,197,24,0.3)] hover:shadow-[0_0_25px_rgba(245,197,24,0.6)] transition-all duration-300 border border-primary/50"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Quote
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white hover:text-primary p-2 z-50 relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 pt-20"
          >
            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-heading font-bold text-white hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="flex flex-col items-center gap-4 mt-8">
              <a href="tel:+917767062794" className="flex items-center gap-2 text-white/90">
                <Phone className="w-5 h-5 text-primary" />
                <span className="font-medium text-lg">+91 7767062794</span>
              </a>
              <a href="mailto:electricalsengineeringworks@gmail.com" className="flex items-center gap-2 text-white/60">
                <Mail className="w-5 h-5 text-primary" />
                <span>electricalsengineeringworks@gmail.com</span>
              </a>
            </div>

            <Button
              size="lg"
              className="mt-4 bg-primary text-background font-bold text-lg px-8 py-6 rounded-full"
              onClick={() => {
                setMobileMenuOpen(false);
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get a Quote
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
