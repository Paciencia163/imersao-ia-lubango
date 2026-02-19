import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-ai.jpg";

const HeroSection = () => {
  const scrollToRegistration = () => {
    document.getElementById("inscricao")?.scrollIntoView({ behavior: "smooth" });
  };

  const target = new Date("2026-02-27T15:00:00");
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const diff = Math.max(0, target.getTime() - now.getTime());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setCountdown({ days, hours, minutes, seconds });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Inteligência Artificial" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-display uppercase tracking-[0.3em] text-primary border border-primary/30 rounded-full box-glow">
            27 de Fevereiro · Lubango
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-glow"
        >
          Imersão em{" "}
          <span className="text-primary">Inteligência Artificial</span>
          <br />
          <span className="text-foreground/90">– Angola</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-body"
        >
          Inovação, Produtividade e Desenvolvimento
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="flex gap-3 items-center text-center text-sm font-body text-foreground/90">
            <div className="px-3 py-2 bg-card rounded-md">
              <div className="font-bold">{countdown.days}</div>
              <div className="text-muted-foreground text-xs">dias</div>
            </div>
            <div className="px-3 py-2 bg-card rounded-md">
              <div className="font-bold">{String(countdown.hours).padStart(2, "0")}</div>
              <div className="text-muted-foreground text-xs">horas</div>
            </div>
            <div className="px-3 py-2 bg-card rounded-md">
              <div className="font-bold">{String(countdown.minutes).padStart(2, "0")}</div>
              <div className="text-muted-foreground text-xs">min</div>
            </div>
            <div className="px-3 py-2 bg-card rounded-md">
              <div className="font-bold">{String(countdown.seconds).padStart(2, "0")}</div>
              <div className="text-muted-foreground text-xs">seg</div>
            </div>
          </div>
        </motion.div>



        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute right-10 top-24 w-48 h-48 md:w-64 md:h-64 pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="w-full h-full rounded-full bg-gradient-to-br from-primary/30 to-secondary/20 blur-2xl"
          />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
