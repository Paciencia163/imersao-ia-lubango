import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

import or1 from "@/assets/orador (1).jpeg";
import or2 from "@/assets/orador (2).jpeg";
import or3 from "@/assets/orador (3).jpeg";
import or4 from "@/assets/orador (4).jpeg";
import or5 from "@/assets/orador (5).jpeg";
import or6 from "@/assets/orador (6).jpeg";
import or7 from "@/assets/orador (7).jpeg";
import or8 from "@/assets/orador (8).jpeg";
import or9 from "@/assets/orador (9).jpeg";
import or10 from "@/assets/orador (10).jpeg";
import or11 from "@/assets/orador (11).jpeg";
import or12 from "@/assets/orador (12).jpeg";
import or13 from "@/assets/orador (13).jpeg";
import or14 from "@/assets/orador (14).jpeg";
import or15 from "@/assets/orador (15).jpeg";
import or16 from "@/assets/orador (16).jpeg";
import or17 from "@/assets/orador (17).jpeg";
import or18 from "@/assets/orador (18).jpeg";
import or19 from "@/assets/orador (19).jpeg";
import or20 from "@/assets/orador (20).jpeg";

const speakers: { name: string; image: string; description?: string; registration?: string; contact?: string; pdf?: string; socials?: { label: string; url: string }[]; tags?: string[] }[] = [
  { name: "Gospel Fita", image: or1, description: `Gospel Fita — Cientista de Dados.
• Licenciado em Engenharia de Telecomunicações.
• Mestre em Engenharia Eléctrica (Processamento de Sinais e Machine Learning) pela Universidade de Stellenbosch.

Diretor-Geral da Tecno Society e docente na Universidade Luanda. Especialista em aplicação de modelos de aprendizagem automática e processamento de sinais para otimização, análise e monitorização de infraestruturas de telecomunicações.

Tema: Machine Learning Aplicado ao Monitoramento de Redes Móveis Celulares.`, registration: "https://imersao-ia-lubango.vercel.app/", contact: "+244947408021" },
  { name: "Save The Date", image: or2, description: "Sessão magna de abertura — Save The Date.", registration: "https://imersao-ia-lubango.vercel.app/", contact: "+244947408021" },
  { name: "Vasconcelos Oliveira", image: or3, description: `Vasconcelos Oliveira — Especialista em Business Intelligence.
Com mais de 7 anos no universo dos dados e experiência em academia e liderança.

Chefe da Área de Business Intelligence no SETIC-FP – Ministério das Finanças. Especialista em Machine Learning aplicado a negócios, automação de processos, governação de dados, MLOps e extração de insights estratégicos. Atua na transformação de dados em decisões organizacionais orientadas por inteligência analítica.`, registration: "https://imersao-ia-lubango.vercel.app/", contact: "+244947408021" },
  { name: "Henriques Zacarias", image: or4, description: `Henriques Mateus Joaquim Zacarias
Doutorando em Biomedicina pela Universidade da Beira Interior (Portugal) e investigador no Assisted Living Computing and Telecommunications Laboratory (ALLAB-IT), integrado no Instituto de Telecomunicações.

Formação:
• Mestrado em Engenharia de Teleinformática — Universidade Federal do Ceará (Brasil)
• Licenciatura em Informática — Universidade Lusíada de Angola

Áreas de investigação: Inteligência Artificial aplicada à saúde; processamento de sinais biomédicos (ECG e EEG); aprendizagem profunda; sistemas preditivos; apoio à decisão clínica; monitorização cardiovascular.

Docente no Instituto Politécnico da Huíla (IPH), onde leciona Inteligência Artificial, Informática Médica e Reconhecimento de Padrões. Cofundador da Conferência de Ciências da Computação: Tendências e Paradigmas (3CTP). Defensor de uma adoção ética, responsável e cientificamente rigorosa da IA na saúde.`, registration: "https://imersao-ia-lubango.vercel.app/", contact: "+244947408021" },
  { name: "Domingos Bié", image: or5, description: `Formado em Ciências da Computação e pós-graduando em Desenvolvimento de Software. Entusiasta de Inteligência Artificial com experiência em modelos de Machine Learning e sistemas multimodais aplicados à saúde e segurança.

Fundador da startup FOCA IA, reconhecida como solução de saúde inovadora na região. Vencedor do LISPA Hack IA 2023. Dedica-se ao desenvolvimento de tecnologias que unem inovação, ciência e impacto social.`, registration: "https://imersao-ia-lubango.vercel.app/", contact: "+244947408021" },
  { name: "Adalberto Francisco", image: or6, description: `Adalberto Manuel Yambi Francisco — Engenheiro de Informação Geoespacial.
Especializado em deteção remota, Sistemas de Informação Geográfica (SIG), modelação 2D/3D com UAV e integração/ processamento avançado de dados geoespaciais.

Director de Estudos Geoespaciais na TecnAgro e docente na Universidade José Eduardo dos Santos. Focado na aplicação de tecnologia e IA para exploração territorial, planeamento estratégico e análise espacial orientada por dados.`, registration: "https://imersao-ia-lubango.vercel.app/", contact: "+244947408021" },
  { name: "Abel Zacarias", image: or7, description: `Abel Zacarias — Especialista em IA e Modelos Matemáticos.
Doutorando em Engenharia Informática pela Universidade da Beira Interior; Mestre em Ensino da Matemática pelo ISCED-Huíla; Licenciado em Informática Educativa pelo ISCED-Huíla.

Docente no Instituto Politécnico da Huíla – Universidade Mandume Ya Ndemufayo. Áreas de interesse: Inteligência Artificial, Machine Learning & Deep Learning, Data Science e Modelos Matemáticos.

Competências técnicas: TensorFlow, PyTorch, Keras, Theano. Integra fundamentos matemáticos e frameworks modernos de IA para desenvolvimento de soluções avançadas.`, registration: "https://imersao-ia-lubango.vercel.app/", contact: "+244947408021" },
  { name: "Paciência Muienga", image: or8, description: "Inteligência Artificial na Saúde.", registration: "https://imersao-ia-lubango.vercel.app/", contact: "+244947408021" },
  { name: "Liudmila Muhandulwa", image: or9, description: `Licenciada em Engenharia Informática, com especialização em Desenvolvimento de Software. Profissional focada na criação e implementação de soluções tecnológicas alinhadas às tendências de Inteligência Artificial.`, registration: "https://imersao-ia-lubango.vercel.app/", contact: "+244947408021" },
  { name: "Faby Sapeth", image: or10, description: `Graduada em Ciências da Computação e pós-graduada em Desenvolvimento de Software. Atua como mentora de projetos e vendas de alta performance, especialista em vendas e marketing digital, além de esteticista e maquilhadora profissional certificada.

Combina tecnologia, estratégia comercial e posicionamento digital para demonstrar como a IA pode potencializar negócios, marcas pessoais e performance em vendas.`, registration: "https://imersao-ia-lubango.vercel.app/", contact: "+244947408021" },
  { name: "Danilson West", image: or11, description: "Reflexões sobre singularidade.", registration: "https://imersao-ia-lubango.vercel.app/", contact: "+244947408021" },
  { name: "Painel de Oradores", image: or12, description: "Painel especial — debate com convidados e interação do público.", registration: "https://imersao-ia-lubango.vercel.app/", contact: "+244947408021" },
  { name: "Painel de Oradores", image: or13, description: "Painel especial — convidados internacionais.", registration: "https://imersao-ia-lubango.vercel.app/", contact: "+244947408021" },
  { name: "Painel de Oradores", image: or14, description: "Painel especial — discussão temática.", registration: "https://imersao-ia-lubango.vercel.app/", contact: "+244947408021" },
  { name: "Save The Date", image: or15, description: "Anúncio e chamada para ação — Save The Date.", registration: "https://imersao-ia-lubango.vercel.app/", contact: "+244947408021" },
  { name: "Achelton Pambo", image: or16, description: `Licenciado em Ciência da Computação, com mais de sete anos de experiência em desenvolvimento de software e soluções baseadas em IA. Atua na interseção entre dados, engenharia e estratégia de negócio, transformando modelos de IA em sistemas funcionais e escaláveis.

Fundador do Kamba Code, canal dedicado ao ensino de programação e capacitação tecnológica.`, registration: "https://imersao-ia-lubango.vercel.app/", contact: "+244947408021" },
  { name: "Faby Sapeth", image: or17, description: `Graduada em Ciências da Computação e pós-graduada em Desenvolvimento de Software. Atua como mentora de projetos e vendas de alta performance, especialista em vendas e marketing digital, além de esteticista e maquilhadora profissional certificada.

Combina tecnologia, estratégia comercial e posicionamento digital para demonstrar como a IA pode potencializar negócios, marcas pessoais e performance em vendas.`, registration: "https://imersao-ia-lubango.vercel.app/", contact: "+244947408021" },
  { name: "Painel de Oradores", image: or18, description: "Painel especial — encerramento de sessão.", registration: "https://imersao-ia-lubango.vercel.app/", contact: "+244947408021" },
  { name: "Painel de Oradores", image: or19, description: "Painel especial — perguntas e respostas.", registration: "https://imersao-ia-lubango.vercel.app/", contact: "+244947408021" },
  { name: "Erasmo Samba", image: or20, description: `Auditor da Agência de Proteção de Dados. Licenciado em Ciências da Computação com pós-graduação em Engenharia de Software e formação como Data Protection Officer (DPO).

Especialista em proteção de dados, governança digital, conformidade e segurança da informação. Traz visão estratégica sobre ética, privacidade e regulamentação na era da IA.`, registration: "https://imersao-ia-lubango.vercel.app/", contact: "+244947408021" },
];


const AgendaSection = () => {
  const [showAgenda, setShowAgenda] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const eventStart = new Date("2026-02-27T15:00:00");
  const eventEnd = new Date("2026-02-27T20:00:00");

  

  const openGoogleCalendar = () => {
    const details = encodeURIComponent("Inovação, Produtividade e Desenvolvimento - Imersão IA Lubango");
    const dates = `${eventStart.toISOString().replace(/[-:]/g, "").split('.')[0]}Z/${eventEnd.toISOString().replace(/[-:]/g, "").split('.')[0]}Z`;
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Imersão em Inteligência Artificial - Lubango")}&dates=${dates}&details=${details}&location=${encodeURIComponent("Novo Hotel – Lubango")}`;
    window.open(url, "_blank");
  };

  // Mostrar apenas a primeira ocorrência de cada imagem (evita duplicados visuais)
  const displayedSpeakers = speakers.filter((s, idx, arr) => arr.findIndex((x) => x.image === s.image) === idx);

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">📅 AGENDA OFICIAL</h2>
          <p className="text-muted-foreground font-body">Imersão em Inteligência Artificial</p>
          <p className="text-muted-foreground/70 mt-3 font-body max-w-2xl mx-auto">
            Inovação, Produtividade e Desenvolvimento — 📍 Lubango • 🗓 27 de Fevereiro de 2026 • 🕒 15h00 – 20h00
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={() => setShowAgenda((s) => !s)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-white hover:brightness-95 transition"
            aria-pressed={showAgenda}
            aria-label={showAgenda ? "Ocultar a agenda oficial" : "Mostrar a agenda oficial"}
          >
            {showAgenda ? "Ocultar Agenda" : "Mostrar Agenda"}
          </button>
          <button
            onClick={openGoogleCalendar}
            className="px-3 py-2 rounded-md border border-border bg-card"
            aria-label="Adicionar evento ao Google Calendar"
          >
            Adicionar ao Google Calendar
          </button>
        </div>

        <AnimatePresence>
          {showAgenda && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45 }}
              className="max-w-4xl mx-auto space-y-6 mb-12"
            >
            {/* agenda items (same content as before) */}
            <div className="grid grid-cols-12 gap-4 items-start">
              <div className="col-span-3 text-sm font-body text-muted-foreground">🕒 15h00 – 15h15</div>
              <div className="col-span-9">
                <h4 className="font-semibold">🎤 Abertura Oficial</h4>
                <p className="text-sm text-muted-foreground mt-1">Adalberto Francisco – Mestre de Cerimónias<br />Boas-vindas, enquadramento estratégico e visão do evento.</p>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-start">
              <div className="col-span-3 text-sm font-body text-muted-foreground">🕒 15h15 – 15h40</div>
              <div className="col-span-9">
                <h4 className="font-semibold">👑 Top Speaker — 🎙 Save The Date</h4>
                <p className="text-sm text-muted-foreground mt-1">Sessão Magna de Abertura</p>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-start">
              <div className="col-span-3 text-sm font-body text-muted-foreground">🕒 15h40 – 16h05</div>
              <div className="col-span-9">
                <h4 className="font-semibold">🧠 Vasconcelos de Oliveira</h4>
                <p className="text-sm text-muted-foreground mt-1">Do Conhecimento à Aplicação: A IA como Motor de Produtividade, Inovação e Crescimento</p>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-start">
              <div className="col-span-3 text-sm font-body text-muted-foreground">🕒 16h05 – 16h25</div>
              <div className="col-span-9">
                <h4 className="font-semibold">🤖 Abel Zacarias</h4>
                <p className="text-sm text-muted-foreground mt-1">Introdução a MLOps</p>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-start">
              <div className="col-span-3 text-sm font-body text-muted-foreground">🕒 16h25 – 16h45</div>
              <div className="col-span-9">
                <h4 className="font-semibold">🚁 Domingos Bié</h4>
                <p className="text-sm text-muted-foreground mt-1">Drones, satélites e Machine Learning aplicados à Agricultura</p>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-start">
              <div className="col-span-3 text-sm font-body text-muted-foreground">🕒 16h45 – 17h05</div>
              <div className="col-span-9">
                <h4 className="font-semibold">☕ Coffee Break & Networking</h4>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-start">
              <div className="col-span-3 text-sm font-body text-muted-foreground">🕒 17h05 – 17h25</div>
              <div className="col-span-9">
                <h4 className="font-semibold">📡 Adalberto Francisco</h4>
                <p className="text-sm text-muted-foreground mt-1">Machine Learning Aplicado ao Monitoramento de Redes Móveis Celulares</p>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-start">
              <div className="col-span-3 text-sm font-body text-muted-foreground">🕒 17h25 – 17h45</div>
              <div className="col-span-9">
                <h4 className="font-semibold">🏥 Abel Zacarias</h4>
                <p className="text-sm text-muted-foreground mt-1">Inteligência Artificial na Saúde: Oportunidades, Riscos e Responsabilidades</p>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-start">
              <div className="col-span-3 text-sm font-body text-muted-foreground">🕒 17h45 – 18h05</div>
              <div className="col-span-9">
                <h4 className="font-semibold">🏥 Paciência Muienga</h4>
                <p className="text-sm text-muted-foreground mt-1">Inteligência Artificial na Saúde</p>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-start">
              <div className="col-span-3 text-sm font-body text-muted-foreground">🕒 18h05 – 18h25</div>
              <div className="col-span-9">
                <h4 className="font-semibold">🔐 Liudmila Muhandulwa</h4>
                <p className="text-sm text-muted-foreground mt-1">Dados pessoais: o petróleo da nova era e os desafios da proteção na era da IA</p>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-start">
              <div className="col-span-3 text-sm font-body text-muted-foreground">🕒 18h25 – 18h40</div>
              <div className="col-span-9">
                <h4 className="font-semibold">🎯 Faby Sapeth</h4>
                <p className="text-sm text-muted-foreground mt-1">Posicionamento na era da Inteligência Artificial</p>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-start">
              <div className="col-span-3 text-sm font-body text-muted-foreground">🕒 18h40 – 18h55</div>
              <div className="col-span-9">
                <h4 className="font-semibold">📶 Danilson West</h4>
                <p className="text-sm text-muted-foreground mt-1">Singularidade</p>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-start">
              <div className="col-span-3 text-sm font-body text-muted-foreground">🕒 18h55 – 19h15</div>
              <div className="col-span-9">
                <h4 className="font-semibold">📊 Vasconcelos Oliveira</h4>
                <p className="text-sm text-muted-foreground mt-1">Dos Dados à Inteligência Artificial: o que realmente gera valor nas organizações</p>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-start">
              <div className="col-span-3 text-sm font-body text-muted-foreground">🔥 19h15 – 19h45</div>
              <div className="col-span-9">
                <h4 className="font-semibold">🎙️ Painel Especial: “O Futuro da Inteligência Artificial em Angola”</h4>
                <p className="text-sm text-muted-foreground mt-1">Participantes: Vasconcelos de Oliveira, Liudmila Muhandulwa, Save The Date, Paciência Muienga<br />Moderação: Adalberto Francisco<br />Debate aberto com interação do público.</p>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-start">
              <div className="col-span-3 text-sm font-body text-muted-foreground">🕒 19h45 – 20h00</div>
              <div className="col-span-9">
                <h4 className="font-semibold">🎤 Encerramento Oficial & Networking Final</h4>
                <p className="text-sm text-muted-foreground mt-1">Considerações finais, agradecimentos institucionais e momento de conexão estratégica.</p>
              </div>
            </div>

              <p className="text-muted-foreground/60 text-sm italic font-body mt-6">⏱️ Duração Total: 5 horas de Imersão Estratégica (15h00 – 20h00)</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-6xl mx-auto">
          <h3 className="font-display text-2xl text-foreground font-bold mb-6 text-center">Oradores & Flyers</h3>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
            role="list"
            aria-label="Lista de oradores"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06 } },
            }}
          >
              {displayedSpeakers.map((s, i) => {
                const originalIndex = speakers.findIndex((x) => x.image === s.image);
                return (
                <motion.div
                  key={s.image}
                  role="listitem"
                className="bg-card rounded-lg p-3 flex flex-col items-center text-center border border-border"
                variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={() => {
                      setSelected(originalIndex);
                    setDialogOpen(true);
                  }}
                  aria-label={`Ver perfil de ${s.name}`}
                  aria-haspopup="dialog"
                  className="w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded-md"
                >
                  <img src={s.image} alt={s.name} className="w-full h-40 object-cover rounded-md mb-3" />
                </button>
                <strong className="text-sm">{s.name}</strong>
                </motion.div>
              );
              })}
          </motion.div>

          <Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
              <DialogContent>
                {selected !== null && (
                  <div>
                    <DialogTitle>{speakers[selected].name}</DialogTitle>
                    <DialogDescription>
                      <p className="mt-2 text-sm text-muted-foreground">{speakers[selected].description ?? "Descrição indisponível."}</p>
                    </DialogDescription>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                      <div>
                        <img src={speakers[selected].image} alt={speakers[selected].name} className="w-full h-56 object-cover rounded-md mb-3" />
                        {speakers[selected].pdf ? (
                          <a
                            href={speakers[selected].pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            aria-label={`Baixar folheto em PDF de ${speakers[selected].name}`}
                          >
                            Baixar folheto (PDF)
                          </a>
                        ) : (
                          <a
                            href={speakers[selected].image}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            aria-label={`Ver flyer de ${speakers[selected].name}`}
                          >
                            Ver flyer
                          </a>
                        )}
                      </div>

                      <div className="flex flex-col gap-3">
                        <div className="flex gap-2 flex-wrap">
                          {(speakers[selected].socials ?? []).map((soc, idx) => (
                            <a
                              key={idx}
                              href={soc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-foreground hover:text-primary underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                              aria-label={`Abrir ${soc.label} de ${speakers[selected].name}`}
                            >
                              {soc.label}
                            </a>
                          ))}
                        </div>

                        <button
                          onClick={() => {
                            setDialogOpen(false);
                            setTimeout(() => document.getElementById("inscricao")?.scrollIntoView({ behavior: "smooth" }), 220);
                          }}
                          className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-white hover:brightness-95 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          aria-label={`Inscrever-se / Mais informações sobre ${speakers[selected].name}`}
                        >
                          Inscrever-se / Mais informações
                        </button>

                        <a
                          href={speakers[selected].contact ? `tel:${speakers[selected].contact}` : "tel:+244947408021"}
                          className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-border text-foreground hover:bg-accent transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          aria-label={`Contactar ${speakers[selected].name} por telefone`}
                        >
                          Contactar (Telefone)
                        </a>

                        <div>
                          <p className="text-xs text-muted-foreground">Vagas limitadas — reserve já.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default AgendaSection;
