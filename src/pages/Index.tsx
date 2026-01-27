import { useState, useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Star, 
  Users, 
  DollarSign,
  ArrowRight,
  CheckCircle
} from "lucide-react";

interface Notification {
  id: number;
  name: string;
  timestamp: number;
}

const RANDOM_NAMES = [
  "Carlos Silva", "Ana Santos", "Pedro Oliveira", "Mariana Costa", "João Souza",
  "Juliana Lima", "Ricardo Ferreira", "Fernanda Alves", "Bruno Rodrigues", "Patricia Gomes",
  "Lucas Martins", "Camila Ribeiro", "Rafael Barbosa", "Larissa Carvalho", "Thiago Araújo",
  "Amanda Pereira", "Gabriel Rocha", "Bianca Dias", "Matheus Nunes", "Isabela Castro",
  "Felipe Mendes", "Bruna Monteiro", "Gustavo Cardoso", "Vanessa Lopes", "Renato Teixeira",
  "Priscila Moreira", "Diego Cunha", "Tatiana Ramos", "André Moura", "Luiza Azevedo"
];

const Index = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const addNotification = () => {
      const randomName = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)];
      const newNotification: Notification = {
        id: Date.now(),
        name: randomName,
        timestamp: Date.now(),
      };

      setNotifications((prev) => [...prev, newNotification]);

      // Remove a notificação após 4 segundos
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== newNotification.id));
      }, 4000);
    };

    const scheduleNext = () => {
      const delay = Math.random() * 4000 + 8000; // Entre 8 e 12 segundos (8000-12000ms)
      timeoutRef.current = setTimeout(() => {
        addNotification();
        scheduleNext();
      }, delay);
    };

    // Adiciona primeira notificação após um delay inicial
    const initialTimeout = setTimeout(() => {
      addNotification();
      scheduleNext();
    }, 3000);

    return () => {
      clearTimeout(initialTimeout);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Fundo cinza com detalhes tecnológicos dourados e motion */}
        <div className="absolute inset-0 tech-motion"></div>

        {/* Partículas de "$" discretas em movimento */}
        <div className="absolute inset-0 money-particles">
          {Array.from({ length: 18 }).map((_, i) => {
            const left = (i * 5.5 + 8) % 100;
            const size = i % 3 === 0 ? "20px" : i % 3 === 1 ? "16px" : "12px";
            const delay = `${(i % 6) * 0.8}s`;
            const dur = `${18 + (i % 5) * 6}s`;
            const style = { left: `${left}%`, "--size": size, "--delay": delay, "--dur": dur } as CSSProperties;
            return (
              <span key={i} className="particle" style={style}>$</span>
            );
          })}
        </div>

        {/* Conteúdo principal */}
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            
            {/* Badge de urgência melhorado */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 bg-warning/20 border-2 border-warning/40 rounded-full px-6 py-3 animate-bounce-in">
                <Clock className="w-5 h-5 text-warning animate-pulse" />
                <span className="text-warning font-bold text-sm sm:text-base">
                  🔥 VAGAS LIMITADAS - ÚLTIMAS HORAS!
                </span>
              </div>
            </div>

            {/* Título principal otimizado */}
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-slide-up">
                Ganhe no mínimo{" "}
                <span className="gradient-secondary bg-clip-text text-transparent">R$50,00 por dia</span>
                {" "}no meu grupo GRATUITO de{" "}
                <span className="gradient-primary bg-clip-text text-transparent">Futebol Virtual</span>
              </h1>
              
              <div className="text-xl sm:text-2xl md:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-slide-up space-y-3">
                <p>Tenha uma nova renda mesmo que você não saiba nada a partir de agora</p>
                <p className="font-semibold"><span className="text-warning">⚡</span> As vagas são limitadas — entre antes que feche!</p>
              </div>
            </div>

            {/* Prova social melhorada */}
            <div className="flex flex-wrap items-center justify-center gap-8 mb-12 animate-slide-up">
              <div className="flex items-center gap-3 bg-card/50 backdrop-blur-sm rounded-full px-6 py-3 border border-success/30">
                <Users className="w-6 h-6 text-success" />
                <span className="font-bold text-lg">+3.247 membros ativos</span>
              </div>
              <div className="flex items-center gap-3 bg-card/50 backdrop-blur-sm rounded-full px-6 py-3 border border-warning/30">
                <Star className="w-6 h-6 text-warning" />
                <span className="font-bold text-lg">4.9/5 ⭐⭐⭐⭐⭐</span>
              </div>
              <div className="flex items-center gap-3 bg-card/50 backdrop-blur-sm rounded-full px-6 py-3 border border-primary/30">
                <DollarSign className="w-6 h-6 text-primary" />
                <span className="font-bold text-lg">Faça R$50+ hoje</span>
              </div>
            </div>


            {/* CTA principal melhorado */}
            <div className="text-center animate-bounce-in">
              <div className="max-w-md mx-auto space-y-6">
                <Button
                  size="lg"
                  asChild
                  className="w-full gradient-secondary pulse-glow text-secondary-foreground font-bold py-6 px-8 rounded-xl shadow-strong hover:shadow-glow transition-all duration-300 text-xl flex items-center justify-center gap-2"
                >
                  <a href="https://t.me/+p2AquDlV-VJlNGYx" target="_blank" rel="noopener noreferrer">
                    <ArrowRight className="w-5 h-5" />
                    Entrar no grupo
                  </a>
                </Button>
                
                <p className="text-sm text-muted-foreground">
                  ✅ Acesso imediato • ✅ 100% Gratuito • ✅ Sem compromisso
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Elementos decorativos otimizados */}
        <div className="absolute top-20 left-10 w-24 h-24 gradient-primary rounded-full opacity-20 animate-pulse blur-sm"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 gradient-secondary rounded-full opacity-20 animate-pulse delay-1000 blur-sm"></div>
        <div className="absolute top-1/2 left-20 w-20 h-20 gradient-accent rounded-full opacity-20 animate-pulse delay-500 blur-sm"></div>
        <div className="absolute top-1/3 right-20 w-16 h-16 gradient-primary rounded-full opacity-20 animate-pulse delay-700 blur-sm"></div>

        {/* Notificações de entrada no grupo */}
        <div className="fixed top-4 right-4 z-50 space-y-3 pointer-events-none">
          {notifications.map((notification, index) => (
            <div
              key={notification.id}
              className="flex items-center gap-3 bg-green-600/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg border border-green-500/50 animate-slide-in-right min-w-[280px]"
              style={{
                animation: "slideInRight 0.3s ease-out",
                animationFillMode: "both",
              }}
            >
              <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
              <div className="flex flex-col">
                <span className="text-white font-semibold text-sm">{notification.name}</span>
                <span className="text-green-100 text-xs">acabou de entrar no grupo</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Index;