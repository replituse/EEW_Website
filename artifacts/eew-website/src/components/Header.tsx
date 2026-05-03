import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import eewLogo from "@assets/Gemini_Generated_Image_1duauj1duauj1dua__1_-removebg-preview_1777793854349.png";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["home", "about", "services", "testimonials", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const navLinks = [
    { name: "Home", href: "#home", id: "home" },
    { name: "About", href: "#about", id: "about" },
    { name: "Services", href: "#services", id: "services" },
    { name: "Testimonials", href: "#testimonials", id: "testimonials" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const navColor = (id: string) =>
    activeSection === id ? "#f5c518" : isDark ? "rgba(255,255,255,0.8)" : "rgba(10,14,39,0.75)";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          <a href="#home" className="flex items-center gap-3 z-50 flex-shrink-0">
            <img
              src={eewLogo}
              alt="EEW Logo"
              className="w-28 h-28 object-contain"
              style={{ marginTop: "-8px", marginBottom: "-8px" }}
            />
            <div className="hidden md:flex flex-col">
              <span className="font-heading font-bold text-xl tracking-wider leading-tight" style={{ color: isDark ? "#ffffff" : "#0a0e27" }}>
                EEW
              </span>
              <span className="text-[0.65rem] text-primary tracking-widest uppercase font-semibold leading-tight">
                Electrical Engineering Works
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a key={link.name} href={link.href} className="text-sm font-medium transition-colors relative group py-1" style={{ color: navColor(link.id) }}>
                  {link.name}
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300" style={{ width: isActive ? "100%" : "0%", opacity: isActive ? 1 : 0 }} />
                  {!isActive && <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary/50 transition-all duration-300 group-hover:w-full" />}
                </a>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            <div className="flex flex-col items-end text-sm">
              <a href="tel:+917767062794" className="flex items-center gap-2 hover:text-primary transition-colors" style={{ color: isDark ? "rgba(255,255,255,0.9)" : "rgba(10,14,39,0.85)" }}>
                <Phone className="w-3.5 h-3.5" />
                <span className="font-medium">+91 7767062794</span>
              </a>
              <a href="mailto:electricalsengineeringworks@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors text-xs" style={{ color: isDark ? "rgba(255,255,255,0.6)" : "rgba(10,14,39,0.55)" }}>
                <Mail className="w-3 h-3" />
                <span>electricalsengineeringworks@gmail.com</span>
              </a>
            </div>

            <Button
              className="bg-primary text-background hover:bg-primary/90 font-semibold shadow-[0_0_15px_rgba(245,197,24,0.3)] hover:shadow-[0_0_25px_rgba(245,197,24,0.6)] transition-all duration-300 border border-primary/50"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get Quote
            </Button>

            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.85 }}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="relative w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 overflow-hidden"
              style={{
                background: isDark ? "rgba(245,197,24,0.1)" : "rgba(10,14,39,0.08)",
                borderColor: isDark ? "rgba(245,197,24,0.35)" : "rgba(10,14,39,0.2)",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.span key="sun" initial={{ rotate: -90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.25 }} className="absolute">
                    <Sun className="w-4.5 h-4.5 text-primary" />
                  </motion.span>
                ) : (
                  <motion.span key="moon" initial={{ rotate: 90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: -90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.25 }} className="absolute">
                    <Moon className="w-4.5 h-4.5" style={{ color: "#0a0e27" }} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          <div className="lg:hidden flex items-center gap-2 z-50">
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.85 }}
              className="w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300"
              style={{
                background: isDark ? "rgba(245,197,24,0.1)" : "rgba(10,14,39,0.08)",
                borderColor: isDark ? "rgba(245,197,24,0.35)" : "rgba(10,14,39,0.2)",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.span key="sun-m" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="absolute">
                    <Sun className="w-4 h-4 text-primary" />
                  </motion.span>
                ) : (
                  <motion.span key="moon-m" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="absolute">
                    <Moon className="w-4 h-4" style={{ color: "#0a0e27" }} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <button className="hover:text-primary p-2 transition-colors" style={{ color: isDark ? "white" : "#0a0e27" }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/97 backdrop-blur-xl flex flex-col items-center justify-center gap-8 pt-20 transition-colors"
          >
            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-2xl font-heading font-bold transition-colors" style={{ color: activeSection === link.id ? "#f5c518" : isDark ? "white" : "#0a0e27" }} onClick={() => setMobileMenuOpen(false)}>
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="flex flex-col items-center gap-4 mt-8">
              <a href="tel:+917767062794" className="flex items-center gap-2" style={{ color: isDark ? "rgba(255,255,255,0.9)" : "rgba(10,14,39,0.85)" }}>
                <Phone className="w-5 h-5 text-primary" />
                <span className="font-medium text-lg">+91 7767062794</span>
              </a>
              <a href="mailto:electricalsengineeringworks@gmail.com" className="flex items-center gap-2" style={{ color: isDark ? "rgba(255,255,255,0.6)" : "rgba(10,14,39,0.55)" }}>
                <Mail className="w-5 h-5 text-primary" />
                <span>electricalsengineeringworks@gmail.com</span>
              </a>
            </div>

            <Button
              size="lg"
              className="mt-4 bg-primary text-background font-bold text-lg px-8 py-6 rounded-full"
              onClick={() => {
                setMobileMenuOpen(false);
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
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
