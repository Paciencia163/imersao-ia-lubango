import { motion } from "framer-motion";
import { AlertCircle, Users, Presentation, Briefcase } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";

const PricingCallToAction = () => {
  const pricingPlans = [
    {
      title: "Estudantes",
      price: "10.000,00",
      currency: "Kwanzas",
      icon: Users,
      description: "Acesso completo à imersão",
    },
    {
      title: "Público Geral",
      price: "15.000,00",
      currency: "Kwanzas",
      icon: Presentation,
      description: "Acesso completo à imersão",
    },
    {
      title: "Pitch Startup e Exposição",
      price: "25.000,00",
      currency: "Kwanzas",
      icon: Briefcase,
      description: "Pitch, exposição e networking",
    },
    {
      title: "Pitch - Empresa",
      price: "50.000,00",
      currency: "Kwanzas",
      icon: Briefcase,
      description: "Exposição, pitch e apresentação premium",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto">
        {/* Alert de Vagas Limitadas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Alert className="border-primary/50 bg-primary/10 mb-8">
            <AlertCircle className="h-5 w-5 text-primary" />
            <AlertDescription className="text-lg font-semibold text-primary ml-4">
              ⚠️ Vagas Limitadas! Inscreva-se agora e garanta seu lugar na Imersão em Inteligência Artificial
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Planos de Preço */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-primary/20 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/20">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="flex justify-center mb-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {plan.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {plan.description}
                      </p>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-primary">
                          {plan.price}
                        </span>
                        <p className="text-sm text-muted-foreground mt-1">
                          {plan.currency}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Chamada para Ação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Escolha o plano que melhor se adequa ao seu perfil e comece sua jornada em IA
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingCallToAction;
