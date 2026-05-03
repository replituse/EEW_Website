import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh K.",
    role: "Plant Manager, Industrial Corp",
    content: "EEW delivered our MCC panel ahead of schedule. The wiring was immaculate, and the documentation provided was incredibly thorough. Top-tier engineering.",
    rating: 5,
  },
  {
    name: "Sanjay D.",
    role: "Operations Director",
    content: "Their GA and Control Wiring drawings are the best we've seen. Absolute precision. It made the installation phase completely frictionless for our team.",
    rating: 5,
  },
  {
    name: "Amit M.",
    role: "Chief Engineer",
    content: "We needed a custom APFC panel with specific footprint constraints. EEW not only designed it perfectly but the build quality exceeded our expectations.",
    rating: 5,
  },
  {
    name: "Vikram S.",
    role: "Procurement Head",
    content: "Professional, transparent costing, and excellent post-installation support. EEW is now our primary vendor for all electrical panel requirements.",
    rating: 4,
  }
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="testimonials" className="py-24 bg-card relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-heading font-bold text-white mb-4"
          >
            Client <span className="text-primary text-glow">Feedback</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Trusted by industrial leaders across Maharashtra.
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden cursor-grab active:cursor-grabbing px-4 py-8" ref={emblaRef}>
            <div className="flex -ml-4">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 pl-4 md:flex-[0_0_80%] lg:flex-[0_0_60%]">
                  <div className="bg-background border border-border p-8 rounded-2xl relative h-full flex flex-col justify-between electric-glow transition-transform duration-300 hover:-translate-y-2">
                    <Quote className="absolute top-6 right-6 w-12 h-12 text-white/5" />
                    
                    <div>
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 ${i < testimonial.rating ? 'text-primary fill-primary drop-shadow-[0_0_5px_rgba(245,197,24,0.8)]' : 'text-muted'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-white/80 text-lg leading-relaxed mb-8 italic">
                        "{testimonial.content}"
                      </p>
                    </div>

                    <div className="flex items-center gap-4 border-t border-border pt-6 mt-auto">
                      <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center font-bold text-secondary text-lg border border-secondary/30">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-white">{testimonial.name}</h4>
                        <p className="text-sm text-primary">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button 
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-white hover:bg-primary hover:text-background hover:border-primary transition-colors electric-glow"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === selectedIndex ? 'bg-primary scale-125 shadow-[0_0_10px_rgba(245,197,24,0.8)]' : 'bg-white/20 hover:bg-white/40'
                  }`}
                  onClick={() => emblaApi?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={scrollNext}
              className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-white hover:bg-primary hover:text-background hover:border-primary transition-colors electric-glow"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
