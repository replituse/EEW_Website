import { Zap, MapPin, Phone, Mail, ChevronRight } from "lucide-react";
import eewLogo from "@assets/Gemini_Generated_Image_1duauj1duauj1dua__1_-removebg-preview_1777793854349.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#05081c] border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-primary/10 blur-[120px] pointer-events-none rounded-t-full" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <a href="#home" className="flex items-center gap-3 mb-6 inline-flex">
              <img src={eewLogo} alt="EEW Logo" className="w-32 h-32 object-contain" />
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg tracking-wider text-white leading-tight">EEW</span>
                <span className="text-[0.55rem] text-primary tracking-widest uppercase font-semibold leading-tight">Electrical Engineering Works</span>
              </div>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Precision electrical panel manufacturing and professional engineering drawings based in Thane, Maharashtra.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-card border border-white/10 flex items-center justify-center text-white hover:border-primary hover:text-primary hover:bg-primary/10 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-card border border-white/10 flex items-center justify-center text-white hover:border-secondary hover:text-secondary hover:bg-secondary/10 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-card border border-white/10 flex items-center justify-center text-white hover:border-primary hover:text-primary hover:bg-primary/10 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-heading font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "#home" },
                { label: "About Us", href: "#about" },
                { label: "Our Services", href: "#services" },
                { label: "Testimonials", href: "#testimonials" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm group">
                    <ChevronRight className="w-3 h-3 text-primary/0 group-hover:text-primary transition-colors" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-heading font-bold mb-6">Expertise</h4>
            <ul className="space-y-3">
              {['Panel Manufacturing', 'Control Wiring', 'Power Wiring', 'GA & IGA Drawings', 'Terminal Layouts'].map((service) => (
                <li key={service}>
                  <a href="#services" className="text-muted-foreground hover:text-secondary transition-colors flex items-center gap-2 text-sm group">
                    <Zap className="w-3 h-3 text-secondary/0 group-hover:text-secondary transition-colors" />
                    <span className="group-hover:translate-x-1 transition-transform">{service}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-heading font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-1" />
                <span>Thane, Maharashtra<br />India</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:+917767062794" className="hover:text-white transition-colors">+91 7767062794</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:electricalsengineeringworks@gmail.com" className="hover:text-white transition-colors break-all">electricalsengineeringworks@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">&copy; {currentYear} Electrical Engineering Works. All rights reserved.</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>Engineered with precision in</span>
            <span className="text-primary font-semibold ml-1">Maharashtra, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
