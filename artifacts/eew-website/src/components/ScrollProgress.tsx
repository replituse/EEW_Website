import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50 drop-shadow-[0_0_5px_rgba(245,197,24,0.8)]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
