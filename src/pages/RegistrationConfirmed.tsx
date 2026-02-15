import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationConfirmed = () => {
  const navigate = useNavigate();
  const IBAN = "0040 0000 95442063101 75";
  const beneficiary = "Paciência Muienga";
  const phone = "947408021";

  const copyIBAN = async () => {
    try {
      await navigator.clipboard.writeText(IBAN);
      alert("IBAN copiado para a área de transferência");
    } catch {
      alert("Não foi possível copiar o IBAN. Copie manualmente.");
    }
  };

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-24">
      <div className="max-w-2xl bg-card border border-border rounded-xl p-8 text-center">
        <h1 className="text-2xl font-display font-bold text-primary mb-4">Confirmação realizada com sucesso</h1>
        <p className="text-muted-foreground mb-6">A sua inscrição foi registada com sucesso. Para concluir o processo, efetue o pagamento para os dados abaixo:</p>

        <div className="mb-6 p-4 rounded-lg bg-background/60 border border-primary/10">
          <p className="font-semibold">IBAN:</p>
          <p className="text-lg font-mono my-2">{IBAN}</p>
          <p className="font-semibold">Beneficiário:</p>
          <p className="my-2">{beneficiary}</p>
          <button onClick={copyIBAN} className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-md">Copiar IBAN</button>
        </div>

        <p className="mb-4">Após o pagamento, envie o comprovativo para o número:</p>
        <p className="text-lg font-bold mb-6">{phone}</p>

        <div className="flex justify-center gap-4">
          <button onClick={() => navigate("/")} className="px-4 py-2 bg-muted-foreground/10 rounded-md">Voltar ao Início</button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationConfirmed;
