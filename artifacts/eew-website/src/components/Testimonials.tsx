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
  },
  {
    name: "Priya N.",
    role: "Facility Manager",
    content: "Outstanding service from design to delivery. The LT panel EEW fabricated has been running flawlessly for over two years. Highly recommended.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    // Auto-advance every 4 seconds
    const interval = setInterval(() => emblaApi.scrollNext(), 4000);
    return () => clearInterval(interval);
  }, [emblaApi, onSelect]);

  return (
    <section id="testimonials" className="py-24 bg-card relative overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Background glow blobs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-16 px-4">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-secondary text-sm font-semibold tracking-[0.3em] uppercase mb-3"
          >
            What Our Clients Say
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-4"
          >
            Client <span className="text-primary drop-shadow-[0_0_20px_rgba(245,197,24,0.5)]">Feedback</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Trusted by industrial leaders across Maharashtra.
          </motion.p>
        </div>

        {/* Carousel — full width */}
        <div className="overflow-hidden w-full cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-[0_0_90%] sm:flex-[0_0_60%] lg:flex-[0_0_38%] xl:flex-[0_0_32%] min-w-0 px-4"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-background border rounded-2xl p-8 h-full flex flex-col justify-between transition-all duration-500 ${
                    index === selectedIndex
                      ? "border-primary/50 shadow-[0_0_30px_rgba(245,197,24,0.15)] scale-[1.02]"
                      : "border-border opacity-70 scale-[0.97]"
                  }`}
                >
                  <Quote className="absolute top-6 right-6 w-10 h-10 text-white/5" />

                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating
                            ? "text-primary fill-primary drop-shadow-[0_0_5px_rgba(245,197,24,0.8)]"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-white/80 text-base leading-relaxed mb-8 italic flex-grow">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center gap-4 border-t border-border pt-6">
                    <div className="w-11 h-11 rounded-full bg-secondary/20 flex items-center justify-center font-bold text-secondary text-base border border-secondary/40 flex-shrink-0">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-white text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-primary">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-10 px-4">
          <button
            onClick={scrollPrev}
            data-testid="button-testimonial-prev"
            className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-white hover:bg-primary hover:text-background hover:border-primary transition-all duration-300 shadow-md"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "w-8 h-3 bg-primary shadow-[0_0_10px_rgba(245,197,24,0.8)]"
                    : "w-3 h-3 bg-white/20 hover:bg-white/40"
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            data-testid="button-testimonial-next"
            className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-white hover:bg-primary hover:text-background hover:border-primary transition-all duration-300 shadow-md"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
