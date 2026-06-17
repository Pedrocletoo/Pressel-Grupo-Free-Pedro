import { useState, useEffect, useRef, useCallback } from "react";
import type { CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import {
  Star,
  Users,
  DollarSign,
  ArrowRight,
} from "lucide-react";

const VAGAS_INICIAL = 43;
const VAGAS_MINIMO = 19;

const FEEDBACK_IMAGES = [
  "./feedback/photo_2026-04-01_14-26-05 (2).jpg",
  "./feedback/photo_2026-04-01_14-26-05.jpg",
  "./feedback/photo_2026-04-01_14-26-09.jpg",
];

const Index = () => {
  const [vagas, setVagas] = useState<number>(VAGAS_INICIAL);
  const vagasRef = useRef<number>(VAGAS_INICIAL);
  const vagasTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Carrossel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % (FEEDBACK_IMAGES.length - 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Lógica de diminuição de vagas: 1-3 segundos por queda
  useEffect(() => {
    const scheduleNextDrop = () => {
      if (vagasRef.current <= VAGAS_MINIMO) return;
      const delay = Math.random() * 2000 + 1000; // 1s a 3s
      vagasTimeoutRef.current = setTimeout(() => {
        setVagas((prev) => {
          if (prev <= VAGAS_MINIMO) return prev;
          const next = prev - 1;
          vagasRef.current = next;
          return next;
        });
        scheduleNextDrop();
      }, delay);
    };

    scheduleNextDrop();
    return () => {
      if (vagasTimeoutRef.current) clearTimeout(vagasTimeoutRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Barra fixa de vagas */}
      <div className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center gap-2 bg-yellow-400 text-black py-2 px-4 shadow-lg">
        <span className="text-sm sm:text-base font-bold tracking-wide">
          Restam apenas <span className="text-3xl font-black">{vagas}</span> vagas restantes
        </span>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-start justify-center overflow-hidden pt-14">
        {/* Fundo preto com grid dourado animado */}
        <div className="absolute inset-0 tech-motion"></div>
        <div className="absolute inset-0 tech-motion-nodes"></div>

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
        <div className="relative z-10 container mx-auto px-4 py-6">
          <div className="max-w-6xl mx-auto">
            
            {/* Título principal otimizado */}
            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black leading-snug mb-6 animate-slide-up max-w-3xl mx-auto uppercase">
                RECEBA ENTRADAS PRONTAS{" "}
                <span className="text-yellow-400">E DESCUBRA OS PADRÕES</span>
                {" "}QUE MAIS LUCRAM HOJE
              </h1>
              
              <div className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-up space-y-2">
                <p>Tenha uma nova renda mesmo que você não saiba nada a partir de agora</p>
                <p className="font-semibold"><span className="text-warning">⚡</span> As vagas são limitadas — entre antes que feche!</p>
              </div>

              <div className="mt-6 flex justify-center">
                <Button
                  size="lg"
                  asChild
                  className="max-w-md gradient-secondary pulse-glow text-secondary-foreground font-bold py-6 px-8 rounded-xl shadow-strong hover:shadow-glow transition-all duration-300 text-xl flex items-center justify-center gap-2"
                >
                  <a href="https://t.me/pedro2tofc_bot" target="_blank" rel="noopener noreferrer">
                    <ArrowRight className="w-5 h-5" />
                    Entrar no grupo
                  </a>
                </Button>
              </div>
            </div>

            {/* Carrossel de feedbacks */}
            <div className="mb-10 animate-slide-up">
              <h2 className="text-center text-lg sm:text-xl font-bold mb-4 text-white">
                Veja quem está dentro o que diz:
              </h2>
              <div className="relative overflow-hidden max-w-2xl mx-auto">
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${carouselIndex * 50}%)` }}
                >
                  {FEEDBACK_IMAGES.map((src, i) => (
                    <div key={i} className="min-w-[50%] px-2 flex justify-center">
                      <img
                        src={src}
                        alt={`Feedback ${i + 1}`}
                        className="rounded-xl shadow-lg w-full object-contain"
                      />
                    </div>
                  ))}
                </div>
                {/* Indicadores */}
                <div className="flex justify-center gap-2 mt-3">
                  {FEEDBACK_IMAGES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCarouselIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${i === carouselIndex ? "bg-yellow-400 w-4" : "bg-white/30"}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* CTA principal melhorado */}
            <div className="text-center animate-bounce-in mb-8">
              <div className="max-w-md mx-auto space-y-6">
                <Button
                  size="lg"
                  asChild
                  className="w-full gradient-secondary pulse-glow text-secondary-foreground font-bold py-6 px-8 rounded-xl shadow-strong hover:shadow-glow transition-all duration-300 text-xl flex items-center justify-center gap-2"
                >
                  <a href="https://t.me/pedro2tofc_bot" target="_blank" rel="noopener noreferrer">
                    <ArrowRight className="w-5 h-5" />
                    Entrar no grupo
                  </a>
                </Button>
                
                <p className="text-sm text-muted-foreground">
                  ✅ Acesso imediato • ✅ 100% Gratuito • ✅ Sem compromisso
                </p>
              </div>
            </div>

            {/* Prova social */}
            <div className="flex flex-wrap items-center justify-center gap-8 animate-slide-up">
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

          </div>
        </div>

        {/* Elementos decorativos otimizados */}
        <div className="absolute top-20 left-10 w-24 h-24 gradient-primary rounded-full opacity-20 animate-pulse blur-sm"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 gradient-secondary rounded-full opacity-20 animate-pulse delay-1000 blur-sm"></div>
        <div className="absolute top-1/2 left-20 w-20 h-20 gradient-accent rounded-full opacity-20 animate-pulse delay-500 blur-sm"></div>
        <div className="absolute top-1/3 right-20 w-16 h-16 gradient-primary rounded-full opacity-20 animate-pulse delay-700 blur-sm"></div>

      </section>
    </div>
  );
};

export default Index;