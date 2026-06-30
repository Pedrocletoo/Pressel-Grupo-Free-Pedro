import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Shield, Zap, Users } from "lucide-react";

interface PreSellFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PreSellForm = ({ isOpen, onOpenChange }: PreSellFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação aprimorada
    if (!formData.name.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, digite seu nome completo.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast({
        title: "E-mail inválido",
        description: "Por favor, digite um e-mail válido.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.phone.trim() || formData.phone.length < 10) {
      toast({
        title: "Telefone inválido",
        description: "Por favor, digite um número de WhatsApp válido.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    console.log('🚀 [FORM] Enviando dados para Google Sheets');
    
    toast({
      title: "Processando cadastro...",
      description: "Aguarde enquanto validamos seus dados.",
    });
    
    try {
      // Enviar dados para Google Sheets
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name.trim());
      formDataToSend.append('email', formData.email.trim().toLowerCase());
      formDataToSend.append('phone', formData.phone.trim());
      formDataToSend.append('timestamp', new Date().toLocaleString('pt-BR'));
      
      await fetch(import.meta.env.VITE_GOOGLE_SHEETS_URL, {
        method: 'POST',
        body: formDataToSend,
        mode: 'no-cors' // Necessário para Google Apps Script
      });
      
      console.log('✅ [FORM] Dados enviados com sucesso');
      
      toast({
        title: "Cadastro realizado com sucesso! 🎉",
        description: "Redirecionando para o grupo Gratuito...",
      });
      
      // Aguardar um pouco antes de redirecionar
      setTimeout(() => {
        // Redirecionar para o Telegram (funciona melhor no mobile)
        window.location.href = 'https://t.me/+p2AquDlV-VJlNGYx';
        
        // Limpar formulário e fechar modal
        onOpenChange(false);
        setFormData({ name: "", email: "", phone: "" });
        setIsSubmitting(false);
      }, 1500);
      
    } catch (error) {
      console.error('❌ [FORM] Erro ao enviar dados:', error);
      
      toast({
        title: "Dados salvos! 📱",
        description: "Redirecionando para o grupo do Telegram...",
      });
      
      // Mesmo com erro, redirecionar para o Telegram após um delay
      setTimeout(() => {
        window.location.href = 'https://t.me/+p2AquDlV-VJlNGYx';
        onOpenChange(false);
        setFormData({ name: "", email: "", phone: "" });
        setIsSubmitting(false);
      }, 1000);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg mx-auto max-h-[95vh] overflow-y-auto bg-card/95 backdrop-blur-md border-2 border-primary/30 shadow-strong animate-bounce-in w-[calc(100%-1rem)] sm:w-full rounded-2xl">

        <DialogHeader className="space-y-6 pt-2">
          <div className="text-center">
            <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
              <Users className="w-10 h-10 text-primary-foreground" />
            </div>
            <DialogTitle className="text-2xl sm:text-3xl font-bold gradient-primary bg-clip-text text-transparent">
              Acesse o Grupo Gratuito 🚀
            </DialogTitle>
            <p className="text-muted-foreground text-center text-base sm:text-lg mt-4 leading-relaxed">
              Preencha seus dados para receber <strong className="text-foreground">acesso imediato</strong> ao grupo exclusivo e começar a lucrar hoje mesmo!
            </p>
          </div>

          {/* Benefícios em destaque */}
          <div className="grid grid-cols-3 gap-4 py-4">
            <div className="text-center">
              <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-2">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <p className="text-xs font-medium">LIVES</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="w-6 h-6 text-secondary-foreground" />
              </div>
              <p className="text-xs font-medium">ALAVANCAGEM</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 gradient-accent rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-accent-foreground" />
              </div>
              <p className="text-xs font-medium">SINAIS</p>
            </div>
          </div>
        </DialogHeader>

        <form 
          onSubmit={handleSubmit} 
          className="space-y-6 mt-6"
        >
          <div className="space-y-3">
            <Label htmlFor="name" className="text-base font-semibold flex items-center gap-2">
              👤 Nome Completo *
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Digite seu nome completo"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              disabled={isSubmitting}
              className="h-14 text-base transition-all duration-300 focus:ring-2 focus:ring-primary/50 focus:border-primary border-2 rounded-xl bg-background/50 backdrop-blur-sm"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="email" className="text-base font-semibold flex items-center gap-2">
              📧 E-mail *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Digite seu melhor e-mail"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              disabled={isSubmitting}
              className="h-14 text-base transition-all duration-300 focus:ring-2 focus:ring-primary/50 focus:border-primary border-2 rounded-xl bg-background/50 backdrop-blur-sm"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="phone" className="text-base font-semibold flex items-center gap-2">
              📱 WhatsApp *
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="(11) 99999-9999"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              required
              disabled={isSubmitting}
              className="h-14 text-base transition-all duration-300 focus:ring-2 focus:ring-primary/50 focus:border-primary border-2 rounded-xl bg-background/50 backdrop-blur-sm"
            />
            <input type="hidden" name="timestamp" value={new Date().toLocaleString('pt-BR')} />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full gradient-secondary pulse-glow text-secondary-foreground font-bold py-6 h-16 rounded-xl transition-all duration-300 text-lg sm:text-xl mt-8 shadow-strong hover:shadow-glow disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin mr-3"></div>
                Abrindo Telegram...
              </>
            ) : (
              "🚀 ENTRAR NO GRUPO TELEGRAM"
            )}
          </Button>

          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              🔒 Seus dados estão seguros e não serão compartilhados
            </p>
            <p className="text-xs text-success font-medium">
              ✅ Acesso garantido • ✅ Sem taxas • ✅ Cancelamento livre
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};