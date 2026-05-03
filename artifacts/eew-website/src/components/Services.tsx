import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Cpu, Activity, Server, FileText, Layers, PenTool, CheckSquare, ChevronDown } from "lucide-react";
import controlPanelImg from "@/assets/control-panel.png";
import techDrawingImg from "@/assets/technical-drawing.png";

type DrawingItem = {
  name: string;
  icon: React.ReactNode;
  description: string;
  image: string;
};

type PanelItem = {
  name: string;
  description: string;
  image: string;
};

const drawings: DrawingItem[] = [
  {
    name: "GA Drawing",
    icon: <PenTool className="w-5 h-5" />,
    description: "General Arrangement drawing showing the physical layout, dimensions, and placement of all components within the electrical panel.",
    image: techDrawingImg,
  },
  {
    name: "IGA Drawing",
    icon: <Layers className="w-5 h-5" />,
    description: "Instrumentation General Arrangement drawing detailing instrument positions, tag numbers, and interconnection routes.",
    image: techDrawingImg,
  },
  {
    name: "Power Wiring Drawing",
    icon: <Zap className="w-5 h-5" />,
    description: "Detailed schematic of all high-current power circuit connections between busbars, breakers, contactors, and load terminals.",
    image: techDrawingImg,
  },
  {
    name: "Control Wiring Drawing",
    icon: <Activity className="w-5 h-5" />,
    description: "Step-by-step control circuit diagram showing PLC, relay logic, push buttons, indicators, and inter-wiring for automation.",
    image: techDrawingImg,
  },
  {
    name: "Terminal Drawing",
    icon: <Server className="w-5 h-5" />,
    description: "Complete terminal block schedule with numbering, cable references, wire colours, and ferrule identification for easy installation.",
    image: techDrawingImg,
  },
  {
    name: "Layout Drawing",
    icon: <Cpu className="w-5 h-5" />,
    description: "Facility floor plan illustrating equipment positioning, cable tray routes, and panel placement for optimal workflow.",
    image: techDrawingImg,
  },
  {
    name: "Panel Costing",
    icon: <FileText className="w-5 h-5" />,
    description: "Itemised Bill of Materials with brand, model, quantity, and unit pricing for complete transparency in procurement.",
    image: techDrawingImg,
  },
  {
    name: "Quotation with BOQ",
    icon: <CheckSquare className="w-5 h-5" />,
    description: "Comprehensive Bill of Quantities with scope of supply, labour charges, and final quotation ready for client approval.",
    image: techDrawingImg,
  },
];

const panels: PanelItem[] = [
  {
    name: "LT Panel",
    description: "Low Tension distribution panel operating at 415V for industrial power distribution with MCCB/MCB protection and metering.",
    image: controlPanelImg,
  },
  {
    name: "MCC Panel",
    description: "Motor Control Centre with DOL/Star-Delta starters, VFD provisions, and centralised motor management for manufacturing plants.",
    image: controlPanelImg,
  },
  {
    name: "PCC Panel",
    description: "Power Control Centre serving as the main switchboard receiving supply from transformers and distributing to downstream MCCs.",
    image: controlPanelImg,
  },
  {
    name: "Heater Panel",
    description: "Industrial heater control panel with thyristor/contactor switching, temperature controllers, and overload protection.",
    image: controlPanelImg,
  },
  {
    name: "AHU Panel",
    description: "Air Handling Unit control panel managing fans, dampers, and heating/cooling coils with DDC/BMS integration capability.",
    image: controlPanelImg,
  },
  {
    name: "Relay Control Panel",
    description: "Relay-logic based control panel for sequential operations, interlocking, and protection in process and utility applications.",
    image: controlPanelImg,
  },
  {
    name: "APFC Panel",
    description: "Automatic Power Factor Correction panel with capacitor banks and microcontroller relay to maintain unity power factor and cut energy costs.",
    image: controlPanelImg,
  },
];

function DrawingCard({ item, isOpen, onToggle }: { item: DrawingItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-lg border border-white/5 overflow-hidden transition-all duration-300 hover:border-secondary/40">
      <button
        className="w-full flex items-center justify-between gap-3 bg-card/50 px-4 py-4 text-left group hover:bg-secondary/10 transition-colors duration-200"
        onClick={onToggle}
        data-testid={`button-drawing-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
      >
        <div className="flex items-center gap-3">
          <span className="text-secondary group-hover:scale-110 transition-transform flex-shrink-0">
            {item.icon}
          </span>
          <span className="text-white/90 font-medium text-sm">{item.name}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-secondary flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="bg-[#080c22] border-t border-secondary/10 p-4 flex gap-4">
              <div className="flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden border border-secondary/20">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-white/60 text-xs leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PanelCard({ item, isOpen, onToggle }: { item: PanelItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-lg border border-card-border overflow-hidden transition-all duration-300 hover:border-primary/40">
      <button
        className="w-full flex items-center justify-between gap-3 bg-card px-5 py-5 text-left group hover:bg-primary/5 transition-colors duration-200 relative overflow-hidden"
        onClick={onToggle}
        data-testid={`button-panel-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
      >
        <div className="absolute top-0 left-[-100%] w-full h-[1px] bg-primary group-hover:left-[100%] transition-all duration-700 ease-in-out" />
        <span className="text-white font-bold text-base">{item.name}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 flex-shrink-0 ${
          isOpen ? "bg-primary border-primary" : "bg-background border-primary/30 group-hover:border-primary"
        }`}>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180 text-background" : "text-primary"}`} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="bg-[#080c22] border-t border-primary/10 p-4 flex gap-4">
              <div className="flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden border border-primary/20">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-white/60 text-xs leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Services() {
  const [openDrawing, setOpenDrawing] = useState<number | null>(null);
  const [openPanel, setOpenPanel] = useState<number | null>(null);

  const toggleDrawing = (idx: number) => setOpenDrawing(openDrawing === idx ? null : idx);
  const togglePanel = (idx: number) => setOpenPanel(openPanel === idx ? null : idx);

  return (
    <section id="services" className="py-24 bg-[#0a0e27] relative">
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
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
            Precision{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-blue-400">
              Services
            </span>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Engineering Drawings Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Section Image */}
            <div className="relative h-[260px] mb-8 rounded-xl overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-secondary/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500" />
              <img
                src={techDrawingImg}
                alt="Engineering Drawings"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#0a0e27] via-[#0a0e27]/60 to-transparent z-20">
                <h3 className="text-3xl font-heading font-bold text-white" style={{ textShadow: "0 0 20px rgba(30,144,255,0.6)" }}>
                  Engineering Drawings
                </h3>
              </div>
              <div className="absolute inset-0 border-2 border-secondary/30 rounded-xl z-20 pointer-events-none group-hover:border-secondary/70 transition-colors duration-500" />
            </div>

            {/* Accordion Items */}
            <div className="flex flex-col gap-2">
              {drawings.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <DrawingCard
                    item={item}
                    isOpen={openDrawing === idx}
                    onToggle={() => toggleDrawing(idx)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Panel Manufacturing Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Section Image */}
            <div className="relative h-[260px] mb-8 rounded-xl overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500" />
              <img
                src={controlPanelImg}
                alt="Panel Manufacturing"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#0a0e27] via-[#0a0e27]/60 to-transparent z-20">
                <h3 className="text-3xl font-heading font-bold text-white" style={{ textShadow: "0 0 20px rgba(245,197,24,0.6)" }}>
                  Panel Manufacturing
                </h3>
              </div>
              <div className="absolute inset-0 border-2 border-primary/30 rounded-xl z-20 pointer-events-none group-hover:border-primary/70 transition-colors duration-500" />
            </div>

            {/* Accordion Items */}
            <div className="flex flex-col gap-2">
              {panels.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <PanelCard
                    item={item}
                    isOpen={openPanel === idx}
                    onToggle={() => togglePanel(idx)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
