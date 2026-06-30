import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock, Save, ExternalLink } from "lucide-react";

const ADMIN_PASSWORDS = ["2007", "gemeos123"];
const STORAGE_KEY = "btn_link";
const DEFAULT_LINK = "https://t.me/+p2AquDlV-VJlNGYx";

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [link, setLink] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    setLink(saved ?? DEFAULT_LINK);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (ADMIN_PASSWORDS.includes(password)) {
      setAuthenticated(true);
    } else {
      toast({ title: "Senha incorreta", variant: "destructive" });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!link.trim()) {
      toast({ title: "O link não pode estar vazio", variant: "destructive" });
      return;
    }
    localStorage.setItem(STORAGE_KEY, link.trim());
    toast({ title: "Link salvo com sucesso!" });
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-card border border-border rounded-2xl p-8 shadow-strong">
          <div className="flex flex-col items-center gap-2 mb-6">
            <Lock className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-bold">Área Administrativa</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a senha"
                autoFocus
              />
            </div>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-card border border-border rounded-2xl p-8 shadow-strong">
        <h1 className="text-xl font-bold mb-6">Gerenciar Link do Botão</h1>
        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <Label htmlFor="link">Link do botão "Entrar no grupo"</Label>
            <Input
              id="link"
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://t.me/..."
              className="mt-1"
            />
          </div>

          <div className="flex gap-3">
            <Button type="submit" className="flex-1 gap-2">
              <Save className="w-4 h-4" />
              Salvar
            </Button>
            <Button
              type="button"
              variant="outline"
              asChild
            >
              <a href={link} target="_blank" rel="noopener noreferrer" className="gap-2 flex items-center">
                <ExternalLink className="w-4 h-4" />
                Testar
              </a>
            </Button>
          </div>
        </form>

        <p className="text-xs text-muted-foreground mt-4">
          O link é salvo localmente neste navegador.
        </p>
      </div>
    </div>
  );
};

export default Admin;
