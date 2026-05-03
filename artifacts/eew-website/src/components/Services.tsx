import { motion } from "framer-motion";
import { Zap, Cpu, Activity, Server, FileText, Layers, PenTool, CheckSquare } from "lucide-react";
import controlPanelImg from "@/assets/control-panel.png";
import techDrawingImg from "@/assets/technical-drawing.png";

export default function Services() {
  const drawings = [
    { name: "GA Drawing", icon: <PenTool className="w-5 h-5" /> },
    { name: "IGA Drawing", icon: <Layers className="w-5 h-5" /> },
    { name: "Power Wiring Drawing", icon: <Zap className="w-5 h-5" /> },
    { name: "Control Wiring Drawing", icon: <Activity className="w-5 h-5" /> },
    { name: "Terminal Drawing", icon: <Server className="w-5 h-5" /> },
    { name: "Layout Drawing", icon: <Cpu className="w-5 h-5" /> },
    { name: "Panel Costing", icon: <FileText className="w-5 h-5" /> },
    { name: "Quotation with BOQ", icon: <CheckSquare className="w-5 h-5" /> },
  ];

  const panels = [
    "LT Panel", "MCC Panel", "PCC Panel", "Heater Panel", 
    "AHU Panel", "Relay Control Panel", "APFC Panel"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="services" className="py-24 bg-[#0a0e27] relative">
      {/* Decorative background grid */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4 text-primary font-semibold tracking-widest text-sm uppercase"
          >
            <Zap className="w-4 h-4" /> Core Capabilities
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-white mb-6"
          >
            Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-blue-400">Services</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            From meticulous schematics to robust physical panels, we deliver end-to-end electrical engineering solutions.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Engineering Drawings Column */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-24"
            >
              <div className="relative h-[300px] mb-8 rounded-xl overflow-hidden group">
                <div className="absolute inset-0 bg-secondary/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                <img src={techDrawingImg} alt="Technical Drawing" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#0a0e27] to-transparent z-20">
                  <h3 className="text-3xl font-heading font-bold text-white text-glow-blue">Engineering Drawings</h3>
                </div>
                {/* Glowing border */}
                <div className="absolute inset-0 border-2 border-secondary/30 rounded-xl z-20 pointer-events-none group-hover:border-secondary/70 transition-colors duration-500"></div>
              </div>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {drawings.map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={itemVariants}
                    className="flex items-center gap-4 bg-card/50 p-4 rounded-lg border border-white/5 hover:border-secondary/50 hover:bg-secondary/10 transition-all duration-300 group blue-glow"
                  >
                    <div className="text-secondary group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <span className="text-white/90 font-medium text-sm">{item.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Panel Manufacturing Column */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-24"
            >
              <div className="relative h-[300px] mb-8 rounded-xl overflow-hidden group">
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                <img src={controlPanelImg} alt="Control Panel" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#0a0e27] to-transparent z-20">
                  <h3 className="text-3xl font-heading font-bold text-white text-glow">Panel Manufacturing</h3>
                </div>
                {/* Glowing border */}
                <div className="absolute inset-0 border-2 border-primary/30 rounded-xl z-20 pointer-events-none group-hover:border-primary/70 transition-colors duration-500"></div>
              </div>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col gap-4"
              >
                {panels.map((panel, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={itemVariants}
                    className="flex items-center justify-between bg-card p-5 rounded-lg border border-card-border hover:border-primary/50 transition-all duration-300 group electric-glow overflow-hidden relative"
                  >
                    {/* Animated scanning line on hover */}
                    <div className="absolute top-0 left-[-100%] w-full h-[2px] bg-primary group-hover:left-[100%] transition-all duration-1000 ease-in-out"></div>
                    
                    <span className="text-white font-bold text-lg">{panel}</span>
                    <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center border border-primary/30 group-hover:border-primary">
                      <Zap className="w-4 h-4 text-primary" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
