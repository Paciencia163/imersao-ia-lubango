import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      // Check if user is admin
      const { data: roles, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .limit(1);

      if (roleError || !roles?.length) {
        await supabase.auth.signOut();
        toast.error("Acesso negado. Apenas administradores.");
        return;
      }

      toast.success("Login efectuado com sucesso!");
      navigate("/admin/dashboard");
    } catch {
      toast.error("Credenciais inválidas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background bg-grid flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="font-display text-2xl font-bold text-primary text-glow">Painel Admin</h1>
          <p className="text-muted-foreground text-sm font-body mt-2">Acesso restrito</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5 p-8 rounded-xl border border-border bg-card border-glow">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-body"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Senha</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-body"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-primary-foreground font-display font-bold text-sm uppercase tracking-wider rounded-lg box-glow hover:opacity-90 disabled:opacity-50 transition-all"
          >
            {loading ? "A entrar..." : "Entrar"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
