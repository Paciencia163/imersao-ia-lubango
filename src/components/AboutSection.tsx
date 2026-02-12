import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="sobre" className="py-24 relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary text-glow mb-2">
            Sobre o Evento
          </h2>
          <div className="w-20 h-0.5 bg-primary mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-6 text-muted-foreground text-lg leading-relaxed font-body"
        >
          <p>
            A cidade do Lubango acolhe a primeira <strong className="text-primary">Imersão de Inteligência Artificial em Angola</strong>, que contará com experts na área provenientes de diferentes pontos do país, reunindo conhecimento, inovação e visão estratégica para impulsionar o desenvolvimento nacional.
          </p>
          <p>
            Num mundo cada vez mais digital, a Inteligência Artificial deixou de ser o futuro — <strong className="text-foreground">é o presente</strong>.
          </p>
          <p>
            No dia <strong className="text-primary">27 de Fevereiro</strong>, o <strong className="text-foreground">Novo Hotel – Lubango</strong> será o centro das atenções ao receber um evento de alto nível que vai juntar líderes empresariais, instituições públicas, profissionais, estudantes e empreendedores para debater o impacto real da IA na economia, na produtividade e na sociedade angolana.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
