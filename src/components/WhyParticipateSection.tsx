import { motion } from "framer-motion";
import { Cpu, BarChart3, Users, Briefcase, Rocket } from "lucide-react";

const reasons = [
  { icon: Rocket, title: "Transformação digital real", description: "Descubra como a IA está a transformar indústrias e negócios em todo o mundo." },
  { icon: Cpu, title: "Aplicações práticas de IA", description: "Aprenda casos de uso reais e aplicáveis ao contexto angolano." },
  { icon: BarChart3, title: "Produtividade empresarial", description: "Ferramentas e estratégias para aumentar a eficiência do seu negócio." },
  { icon: Users, title: "Networking estratégico", description: "Conecte-se com líderes, empreendedores e profissionais da área." },
  { icon: Briefcase, title: "Futuro do trabalho em Angola", description: "Prepare-se para as mudanças que a IA traz ao mercado de trabalho." },
];

const WhyParticipateSection = () => {
  return (
    <section className="py-24 relative bg-grid">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary text-glow mb-2">
            Por que participar?
          </h2>
          <div className="w-20 h-0.5 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:box-glow"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <reason.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-sm font-semibold text-foreground mb-2">
                {reason.title}
              </h3>
              <p className="text-muted-foreground text-sm font-body">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyParticipateSection;
