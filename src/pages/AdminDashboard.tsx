import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BarChart3, Users, LogOut, Download, Trash2, Search } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import * as XLSX from "xlsx";

interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string;
  profession: string;
  institution: string;
  participant_type: string;
  created_at: string;
}

const COLORS = ["hsl(147,100%,50%)", "hsl(160,100%,40%)", "hsl(130,80%,40%)", "hsl(180,60%,30%)"];

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchRegistrations();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin");
      return;
    }
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin");
    
    if (!roles?.length) {
      await supabase.auth.signOut();
      navigate("/admin");
    }
  };

  const fetchRegistrations = async () => {
    const { data, error } = await supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setRegistrations(data);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja eliminar esta inscrição?")) return;
    const { error } = await supabase.from("registrations").delete().eq("id", id);
    if (error) {
      toast.error("Erro ao eliminar");
    } else {
      toast.success("Inscrição eliminada");
      setRegistrations(prev => prev.filter(r => r.id !== id));
    }
  };

  const exportXLSX = () => {
    const ws = XLSX.utils.json_to_sheet(registrations.map(r => ({
      Nome: r.name, Email: r.email, Telefone: r.phone,
      Profissão: r.profession, Instituição: r.institution,
      Tipo: r.participant_type, Data: new Date(r.created_at).toLocaleDateString("pt-AO"),
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Inscrições");
    XLSX.writeFile(wb, "inscricoes.xlsx");
  };

  const exportCSV = () => {
    const ws = XLSX.utils.json_to_sheet(registrations.map(r => ({
      Nome: r.name, Email: r.email, Telefone: r.phone,
      Profissão: r.profession, Instituição: r.institution,
      Tipo: r.participant_type, Data: new Date(r.created_at).toLocaleDateString("pt-AO"),
    })));
    const csv = XLSX.utils.sheet_to_csv(ws);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "inscricoes.csv";
    a.click();
  };

  const filtered = registrations.filter(r => {
    const matchSearch = !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.email.toLowerCase().includes(search.toLowerCase());
    const matchType = !filterType || r.participant_type === filterType;
    return matchSearch && matchType;
  });

  const typeCounts = registrations.reduce((acc, r) => {
    acc[r.participant_type] = (acc[r.participant_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(typeCounts).map(([name, value]) => ({ name, value }));

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-primary font-display">A carregar...</div>;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <h1 className="font-display text-lg font-bold text-primary text-glow">Painel Admin</h1>
        <button onClick={handleLogout} className="flex items-center gap-2 text-muted-foreground hover:text-destructive transition-colors text-sm font-body">
          <LogOut className="w-4 h-4" /> Sair
        </button>
      </header>

      <main className="p-6 space-y-8 max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-xl border border-border bg-card border-glow">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground text-sm font-body">Total Inscritos</span>
            </div>
            <p className="font-display text-3xl font-bold text-foreground">{registrations.length}</p>
          </div>
          {Object.entries(typeCounts).slice(0, 2).map(([type, count]) => (
            <div key={type} className="p-6 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground text-sm font-body capitalize">{type}</span>
              </div>
              <p className="font-display text-3xl font-bold text-foreground">{count}</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        {pieData.length > 0 && (
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-display text-sm font-semibold text-foreground mb-4">Distribuição por Tipo</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Filters & Export */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex gap-3 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                placeholder="Pesquisar..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg bg-input border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 font-body"
              />
            </div>
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="px-4 py-2 rounded-lg bg-input border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 font-body"
            >
              <option value="">Todos os tipos</option>
              <option value="estudante">Estudante</option>
              <option value="profissional">Profissional</option>
              <option value="empresa">Empresa</option>
              <option value="outro">Outro</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={exportXLSX} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-display font-semibold hover:opacity-90 transition-all">
              <Download className="w-4 h-4" /> Excel
            </button>
            <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary text-primary text-sm font-display font-semibold hover:bg-primary/10 transition-all">
              <Download className="w-4 h-4" /> CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-border overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b border-border bg-card">
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Nome</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Email</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium hidden md:table-cell">Telefone</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium hidden lg:table-cell">Profissão</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium hidden lg:table-cell">Tipo</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Data</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-foreground">{r.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.email}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{r.phone}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{r.profession}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary capitalize">{r.participant_type}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(r.created_at).toLocaleDateString("pt-AO")}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(r.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">Nenhuma inscrição encontrada</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
