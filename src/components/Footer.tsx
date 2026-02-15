import { Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 border-t border-border">
      <div className="container mx-auto px-4 text-center space-y-6">
        <div className="flex items-center justify-center gap-6 flex-wrap text-muted-foreground text-sm font-body">
          <a href="mailto:paciencia163@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Mail className="w-4 h-4" /> paciencia163@gmail.com
          </a>
          <a href="tel:+244947408021" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Phone className="w-4 h-4" /> 947 408 021
          </a>
        </div>
        <p className="text-muted-foreground/60 text-sm italic font-body max-w-lg mx-auto">
          "Juntos, vamos transformar conhecimento em impacto e inovação em desenvolvimento."
        </p>
        <p className="text-muted-foreground/40 text-xs font-body">
          © 2025 Imersão em Inteligência Artificial – Angola
        </p>
        <p className="text-muted-foreground/40 text-xs font-body">
          Ícone do site: <a href="https://www.flaticon.com/free-icons/robot" className="underline hover:text-primary">Robot icons created by Freepik - Flaticon</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
