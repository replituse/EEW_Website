import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Array<{ x: number; y: number; size: number; speedX: number; speedY: number; life: number; maxLife: number }> = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const createParticle = (x?: number, y?: number) => ({
      x: x || Math.random() * canvas.width,
      y: y || Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: (Math.random() - 0.5) * 1.5,
      life: 0,
      maxLife: Math.random() * 100 + 50,
    });

    for (let i = 0; i < 100; i++) particles.push(createParticle());

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life++;
        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height || p.life > p.maxLife) {
          particles[i] = createParticle();
        }
        const opacity = Math.sin((p.life / p.maxLife) * Math.PI);
        const isGold = i % 3 === 0;
        ctx.fillStyle = isGold ? `rgba(245, 197, 24, ${opacity})` : `rgba(30, 144, 255, ${opacity * 0.7})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.strokeStyle = isGold
              ? `rgba(245, 197, 24, ${opacity * 0.2 * (1 - dist / 100)})`
              : `rgba(30, 144, 255, ${opacity * 0.15 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[1] opacity-60 pointer-events-none" />;
};

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          onError={(e) => {
            (e.target as HTMLVideoElement).style.display = "none";
          }}
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-electrical-switchboard-circuit-breaker-27765-large.mp4" type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/preview/mixkit-working-on-an-electrical-panel-27764-large.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dark gradient overlays */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#0a0e27]/85 via-[#0a0e27]/70 to-[#0a0e27] pointer-events-none" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-primary/8 to-secondary/5 pointer-events-none" />

      {/* Canvas Particles */}
      <ParticleBackground />

      <div className="container relative z-10 px-4 md:px-6 max-w-5xl mx-auto flex flex-col items-center text-center">

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8 w-24 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent"
        />

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading text-white mb-6 leading-[1.1]"
        >
          Powering Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-200 to-primary drop-shadow-[0_0_30px_rgba(245,197,24,0.5)]">
            Electrical Solutions
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="text-lg md:text-xl text-white/70 max-w-2xl mb-10 font-light"
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
            className="h-14 px-10 text-base bg-primary text-background font-bold hover:bg-primary/90 rounded-none border border-primary relative overflow-hidden group shadow-[0_0_20px_rgba(245,197,24,0.3)] hover:shadow-[0_0_35px_rgba(245,197,24,0.7)] transition-all"
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            data-testid="button-our-services"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative flex items-center gap-2">
              Our Services <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="h-14 px-10 text-base font-bold bg-transparent text-white border-white/30 hover:bg-white/5 hover:border-primary/60 hover:text-primary rounded-none transition-all"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            data-testid="button-contact-us"
          >
            Contact Us
          </Button>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="mt-20 grid grid-cols-3 gap-8 border-t border-white/10 pt-10 w-full max-w-xl"
        >
          {[
            { value: "500+", label: "Panels Built" },
            { value: "100%", label: "Quality Tested" },
            { value: "24/7", label: "Support" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-heading font-bold text-primary drop-shadow-[0_0_10px_rgba(245,197,24,0.6)]">{stat.value}</span>
              <span className="text-xs text-white/50 uppercase tracking-widest mt-1">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-white/40">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-primary to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
