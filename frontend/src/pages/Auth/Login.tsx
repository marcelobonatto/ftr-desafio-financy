import { useState, type SubmitEventHandler } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed, Loader2, Lock, LogIn, Mail, UserRoundPlus } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Checkbox } from "@/components/ui/checkbox";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";
import { toast } from "sonner";

export function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const login = useAuthStore((state) => state.login);

  const navigate = useNavigate();

  const handleSubmit: SubmitEventHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginMutate = await login({
        email,
        password
      });

      if (loginMutate) {
        toast.success("Login realizado com sucesso!");
      }

    } catch (error) {
      toast.error("Falha ao realizar o login!");

    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigate("/signup");
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center gap-6">
      <img src="/img/logo.svg" alt="Financy" className="h-10" />

      <Card className="w-full max-w-md rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">
            Fazer login
          </CardTitle>
          <CardDescription className="text-center">
            Entre na sua conta para continuar
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>

              <InputGroup>
                <InputGroupInput id="email" type="email" placeholder="mail@exemplo.com"
                  value={email} onChange={(e) => setEmail(e.target.value)} required
                  disabled={loading} />

                <InputGroupAddon>
                  <Mail />
                </InputGroupAddon>
              </InputGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>

              <InputGroup>
                <InputGroupInput id="password" type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha" value={password}
                  onChange={(e) => setPassword(e.target.value)} required
                  disabled={loading} />

                <InputGroupAddon>
                  <Lock />
                </InputGroupAddon>

                <InputGroupAddon align="inline-end">
                  <Button type="button" variant="ghost" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <Eye className="h-5 w-5" />
                    ) : (
                      <EyeClosed className="h-5 w-5" />
                    )}
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox checked={remember} onCheckedChange={setRemember} disabled={loading} /> Lembrar-me
              </div>
              {loading ? (
                <span className="text-brand-base text-sm">Recuperar senha</span>
              ) : (
                <NavLink to="/" className="text-brand-base text-sm hover:underline">
                  Recuperar senha
                </NavLink>
              )}
            </div>

            <Button type="submit" variant="solid" size="md" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" /> Entrando...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" /> Entrar
                </>
              )}
            </Button>
          </form>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-300"></div>
            <span className="text-sm text-gray-500 font-medium">ou</span>
            <div className="h-px flex-1 bg-gray-300"></div>
          </div>

          <div className="w-full text-center">
            Ainda não tem uma conta?
          </div>

          <Button type="button" variant="outline" size="md" className="w-full"
            disabled={loading} onClick={handleRegister}>

            <UserRoundPlus className="mr-2 h-4 w-4" /> Criar conta
          </Button>
        </CardContent>
      </Card>
    </div >
  );
}