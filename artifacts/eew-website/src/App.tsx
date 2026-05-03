import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";

function App() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <Loader />
        <div className="relative min-h-screen bg-background text-foreground flex flex-col overflow-hidden transition-colors duration-300">
          <ScrollProgress />
          <Header />
          <main className="flex-1">
            <Hero />
            <About />
            <Services />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
          <WhatsAppButton />
          <BackToTop />
        </div>
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
