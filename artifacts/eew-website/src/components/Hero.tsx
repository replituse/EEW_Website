import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

// ─── Circuit Board Background ──────────────────────────────────────────────
const CircuitBackground = ({ isDark }: { isDark: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDarkRef = useRef(isDark);

  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;

    const CELL = 80;
    const NODE_R = 3;
    const PULSE_SPEED = 2.5;

    type Node = { x: number; y: number; glow: number; glowDir: number };
    type Edge = { x1: number; y1: number; x2: number; y2: number };
    type Pulse = { edge: Edge; t: number; color: "gold" | "blue"; speed: number };
    type Flash = { x: number; y: number; r: number; alpha: number };

    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let pulses: Pulse[] = [];
    let flashes: Flash[] = [];
    let w = 0, h = 0;

    const resize = () => {
      w = canvas.width  = window.innerWidth;
      h = canvas.height = window.innerHeight;
      buildCircuit();
    };

    const buildCircuit = () => {
      nodes = []; edges = []; pulses = [];
      const cols = Math.ceil(w / CELL) + 1;
      const rows = Math.ceil(h / CELL) + 1;
      const grid: Node[][] = [];
      for (let r = 0; r < rows; r++) {
        grid[r] = [];
        for (let c = 0; c < cols; c++) {
          const jx = (Math.random() - 0.5) * 20;
          const jy = (Math.random() - 0.5) * 20;
          grid[r][c] = { x: c * CELL + jx, y: r * CELL + jy, glow: Math.random(), glowDir: Math.random() > 0.5 ? 1 : -1 };
          nodes.push(grid[r][c]);
        }
      }
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (c + 1 < cols && Math.random() < 0.6)
            edges.push({ x1: grid[r][c].x, y1: grid[r][c].y, x2: grid[r][c + 1].x, y2: grid[r][c + 1].y });
          if (r + 1 < rows && Math.random() < 0.6)
            edges.push({ x1: grid[r][c].x, y1: grid[r][c].y, x2: grid[r + 1][c].x, y2: grid[r + 1][c].y });
        }
      }
      for (let i = 0; i < 18; i++) spawnPulse();
    };

    const spawnPulse = () => {
      if (edges.length === 0) return;
      const edge = edges[Math.floor(Math.random() * edges.length)];
      const len = Math.hypot(edge.x2 - edge.x1, edge.y2 - edge.y1);
      pulses.push({ edge, t: Math.random(), color: Math.random() < 0.45 ? "gold" : "blue", speed: PULSE_SPEED / Math.max(len, 1) });
    };

    const draw = (_time: number) => {
      ctx.clearRect(0, 0, w, h);
      const dark = isDarkRef.current;

      // ── trace lines ──
      ctx.lineWidth = 0.8;
      for (const e of edges) {
        const grad = ctx.createLinearGradient(e.x1, e.y1, e.x2, e.y2);
        if (dark) {
          grad.addColorStop(0,   "rgba(30,144,255,0.04)");
          grad.addColorStop(0.5, "rgba(30,144,255,0.12)");
          grad.addColorStop(1,   "rgba(30,144,255,0.04)");
        } else {
          grad.addColorStop(0,   "rgba(10,60,160,0.06)");
          grad.addColorStop(0.5, "rgba(10,60,160,0.18)");
          grad.addColorStop(1,   "rgba(10,60,160,0.06)");
        }
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(e.x1, e.y1);
        ctx.lineTo(e.x2, e.y2);
        ctx.stroke();
      }

      // ── nodes ──
      for (const n of nodes) {
        n.glow += n.glowDir * 0.008;
        if (n.glow >= 1) { n.glow = 1; n.glowDir = -1; }
        if (n.glow <= 0) { n.glow = 0; n.glowDir =  1; }
        const alpha = dark ? 0.1 + n.glow * 0.25 : 0.15 + n.glow * 0.35;
        const baseColor = dark ? `rgba(30,144,255,${alpha})` : `rgba(10,60,160,${alpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, NODE_R, 0, Math.PI * 2);
        ctx.fillStyle = baseColor;
        ctx.fill();
        if (n.glow > 0.85) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, NODE_R + 1, 0, Math.PI * 2);
          ctx.fillStyle = dark
            ? `rgba(245,197,24,${(n.glow - 0.85) * 2})`
            : `rgba(180,120,0,${(n.glow - 0.85) * 2.5})`;
          ctx.fill();
        }
      }

      // ── pulses ──
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += p.speed;
        if (p.t >= 1) {
          pulses.splice(i, 1);
          spawnPulse();
          if (Math.random() < 0.25) flashes.push({ x: p.edge.x2, y: p.edge.y2, r: 0, alpha: 0.9 });
          continue;
        }
        const px = p.edge.x1 + (p.edge.x2 - p.edge.x1) * p.t;
        const py = p.edge.y1 + (p.edge.y2 - p.edge.y1) * p.t;
        const tailLen = 0.25;
        const t0 = Math.max(0, p.t - tailLen);
        const tx0 = p.edge.x1 + (p.edge.x2 - p.edge.x1) * t0;
        const ty0 = p.edge.y1 + (p.edge.y2 - p.edge.y1) * t0;

        const lg = ctx.createLinearGradient(tx0, ty0, px, py);
        if (p.color === "gold") {
          lg.addColorStop(0, "rgba(180,120,0,0)");
          lg.addColorStop(1, dark ? "rgba(245,197,24,0.85)" : "rgba(180,110,0,0.9)");
        } else {
          lg.addColorStop(0, "rgba(30,144,255,0)");
          lg.addColorStop(1, dark ? "rgba(100,180,255,0.85)" : "rgba(10,80,200,0.85)");
        }
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = lg;
        ctx.beginPath();
        ctx.moveTo(tx0, ty0);
        ctx.lineTo(px, py);
        ctx.stroke();

        const headColor = p.color === "gold"
          ? (dark ? "rgba(255,220,50,0.95)" : "rgba(180,110,0,0.95)")
          : (dark ? "rgba(140,200,255,0.95)" : "rgba(20,80,200,0.95)");
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = headColor;
        ctx.fill();

        const halo = ctx.createRadialGradient(px, py, 0, px, py, 8);
        halo.addColorStop(0, p.color === "gold"
          ? (dark ? "rgba(245,197,24,0.25)" : "rgba(180,110,0,0.2)")
          : (dark ? "rgba(30,144,255,0.20)" : "rgba(10,80,200,0.18)"));
        halo.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();
      }

      // ── flashes ──
      for (let i = flashes.length - 1; i >= 0; i--) {
        const f = flashes[i];
        f.r += 3; f.alpha -= 0.07;
        if (f.alpha <= 0) { flashes.splice(i, 1); continue; }
        const rg = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r);
        const fc = dark ? `rgba(245,197,24,${f.alpha})` : `rgba(180,110,0,${f.alpha})`;
        const fc2 = dark ? `rgba(245,197,24,${f.alpha * 0.4})` : `rgba(180,110,0,${f.alpha * 0.4})`;
        rg.addColorStop(0, fc);
        rg.addColorStop(0.4, fc2);
        rg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = rg;
        ctx.fill();
      }

      // ── random spark burst ──
      if (Math.random() < 0.008) {
        const rx = Math.random() * w;
        const ry = Math.random() * h;
        const lines = 5 + Math.floor(Math.random() * 6);
        for (let k = 0; k < lines; k++) {
          const angle = (k / lines) * Math.PI * 2;
          const len2  = 15 + Math.random() * 25;
          ctx.strokeStyle = dark
            ? `rgba(245,197,24,${0.3 + Math.random() * 0.5})`
            : `rgba(180,110,0,${0.25 + Math.random() * 0.45})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(rx, ry);
          ctx.lineTo(rx + Math.cos(angle) * len2, ry + Math.sin(angle) * len2);
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    raf = requestAnimationFrame(draw);
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

// ─── Hero ──────────────────────────────────────────────────────────────────
export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bgGradient = isDark
    ? "linear-gradient(135deg,#04071a 0%,#080e2e 50%,#04071a 100%)"
    : "linear-gradient(135deg,#dbeafe 0%,#eff6ff 50%,#dbeafe 100%)";

  const fadeTo = isDark ? "#04071a" : "#dbeafe";

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden transition-colors duration-500"
      style={{ background: bgGradient }}
    >
      <CircuitBackground isDark={isDark} />

      {/* Radial glow burst */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: isDark
            ? "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(245,197,24,0.06) 0%, rgba(30,144,255,0.04) 40%, transparent 70%)"
            : "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(180,120,0,0.05) 0%, rgba(10,80,200,0.04) 40%, transparent 70%)",
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ zIndex: 2, background: `linear-gradient(to bottom, transparent, ${fadeTo})` }}
      />

      {/* Content */}
      <div className="container relative px-4 md:px-6 max-w-5xl mx-auto flex flex-col items-center text-center" style={{ zIndex: 10 }}>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading mb-6 leading-[1.1]"
          style={{ color: isDark ? "#ffffff" : "#0a0e27" }}
        >
          Powering Your <br />
          <span
            className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-500 to-primary"
            style={{ filter: isDark ? "drop-shadow(0 0 24px rgba(245,197,24,0.45))" : "drop-shadow(0 0 16px rgba(180,110,0,0.3))" }}
          >
            Electrical Solutions
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="text-lg md:text-xl max-w-2xl mb-10 font-light"
          style={{ color: isDark ? "rgba(255,255,255,0.7)" : "rgba(10,14,39,0.65)" }}
        >
          Expert electrical panel manufacturing and engineering drawings.
          Built for industrial reliability, designed for maximum efficiency.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Button
            size="lg"
            className="h-14 px-10 text-base bg-primary text-background font-bold hover:bg-primary/90 rounded-none border border-primary relative overflow-hidden group transition-all"
            style={{ boxShadow: "0 0 20px rgba(245,197,24,0.3)" }}
            onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative flex items-center gap-2">
              Our Services <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="h-14 px-10 text-base font-bold rounded-none transition-all"
            style={isDark
              ? { background: "transparent", color: "white", borderColor: "rgba(255,255,255,0.3)" }
              : { background: "transparent", color: "#0a0e27", borderColor: "rgba(10,14,39,0.35)" }
            }
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Contact Us
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
