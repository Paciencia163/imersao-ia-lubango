import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const registrationSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  phone: z.string().trim().min(1, "Telefone é obrigatório").max(20),
  profession: z.string().trim().min(1, "Profissão é obrigatória").max(100),
  institution: z.string().trim().min(1, "Instituição é obrigatória").max(100),
  participant_type: z.enum(["estudante", "profissional", "empresa", "outro"]),
});

type RegistrationForm = z.infer<typeof registrationSchema>;

const RegistrationSection = () => {
  const [form, setForm] = useState<RegistrationForm>({
    name: "", email: "", phone: "", profession: "", institution: "", participant_type: "outro",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationForm, string>>>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = registrationSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.issues.forEach(issue => {
        const field = issue.path[0] as keyof RegistrationForm;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("registrations").insert([{
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone,
        profession: result.data.profession,
        institution: result.data.institution,
        participant_type: result.data.participant_type,
      }]);
      if (error) throw error;
      setForm({ name: "", email: "", phone: "", profession: "", institution: "", participant_type: "outro" });
      // Redireciona para página de confirmação com instruções de pagamento
      navigate("/inscricao/confirmada");
    } catch {
      toast.error("Erro ao submeter inscrição. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-body";
  const labelClass = "block text-sm font-medium text-foreground mb-1.5 font-body";

  return (
    <section id="inscricao" className="py-24 relative bg-grid">
      <div className="container mx-auto px-4 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary text-glow mb-2">
            Inscrição
          </h2>
          <div className="w-20 h-0.5 bg-primary mx-auto rounded-full" />
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-5 p-8 rounded-xl border border-border bg-card border-glow"
        >
          {([
            { name: "name" as const, label: "Nome Completo", type: "text", placeholder: "Seu nome completo" },
            { name: "email" as const, label: "Email", type: "email", placeholder: "seu@email.com" },
            { name: "phone" as const, label: "Telefone", type: "tel", placeholder: "+244 900 000 000" },
            { name: "profession" as const, label: "Profissão", type: "text", placeholder: "Sua profissão" },
            { name: "institution" as const, label: "Instituição/Empresa", type: "text", placeholder: "Sua instituição ou empresa" },
          ]).map(field => (
            <div key={field.name}>
              <label htmlFor={field.name} className={labelClass}>{field.label}</label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className={inputClass}
              />
              {errors[field.name] && <p className="text-destructive text-xs mt-1">{errors[field.name]}</p>}
            </div>
          ))}

          <div>
            <label htmlFor="participant_type" className={labelClass}>Tipo de Participante</label>
            <select
              id="participant_type"
              name="participant_type"
              value={form.participant_type}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="estudante">Estudante</option>
              <option value="profissional">Profissional</option>
              <option value="empresa">Empresa</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-primary text-primary-foreground font-display font-bold text-sm uppercase tracking-wider rounded-lg animate-pulse-glow disabled:opacity-50 disabled:animate-none transition-all"
          >
            {loading ? "A submeter..." : "Confirmar Inscrição"}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default RegistrationSection;
