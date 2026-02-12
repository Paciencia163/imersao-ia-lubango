import { motion } from "framer-motion";
import { MapPin, CalendarDays } from "lucide-react";

const EventInfoSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary text-glow mb-2">
            Informações do Evento
          </h2>
          <div className="w-20 h-0.5 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex-1 w-full p-8 rounded-xl border border-border bg-card text-center border-glow"
          >
            <MapPin className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-display text-sm font-semibold text-foreground mb-1">Local</h3>
            <p className="text-muted-foreground font-body">Novo Hotel – Lubango</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1 w-full p-8 rounded-xl border border-border bg-card text-center border-glow"
          >
            <CalendarDays className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-display text-sm font-semibold text-foreground mb-1">Data</h3>
            <p className="text-muted-foreground font-body">27 de Fevereiro</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EventInfoSection;
