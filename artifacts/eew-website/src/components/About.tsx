import { motion } from "framer-motion";
import { ShieldCheck, Settings, Factory } from "lucide-react";

export default function About() {
  const highlights = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "Years of Experience",
      description: "Decades of collective expertise in electrical panel design and manufacturing for industrial applications.",
    },
    {
      icon: <Settings className="w-8 h-8 text-primary" />,
      title: "Custom Panel Solutions",
      description: "Tailored electrical control panels designed to meet the exact specifications of your facility.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute -left-40 top-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 mb-4 text-secondary font-semibold tracking-widest text-sm uppercase">
              <Factory className="w-4 h-4" /> About EEW
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              Engineering{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-500">
                Excellence
              </span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Electrical Engineering Works (EEW) is a Thane-based powerhouse in electrical panel
              manufacturing and engineering drawings. We build the central nervous systems for
              industrial facilities.
            </p>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Our approach combines rigorous technical standards with innovative design, ensuring
              that every control panel and wiring diagram we produce delivers uncompromising
              reliability and safety. When you hand over your critical infrastructure needs to EEW,
              you're partnering with craftsmen who understand that power is nothing without control.
            </p>

            <div className="flex gap-6">
              <div className="border-l-2 border-primary pl-4 py-1">
                <div className="text-3xl font-heading font-bold text-white">100%</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Quality Tested</div>
              </div>
              <div className="border-l-2 border-primary pl-4 py-1">
                <div className="text-3xl font-heading font-bold text-white">500+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Panels Built</div>
              </div>
              <div className="border-l-2 border-primary pl-4 py-1">
                <div className="text-3xl font-heading font-bold text-white">24/7</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Reliability</div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-card border border-card-border p-8 rounded-xl electric-glow group"
              >
                <div className="mb-4 p-3 bg-background inline-block rounded-lg border border-primary/20 group-hover:border-primary/50 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
