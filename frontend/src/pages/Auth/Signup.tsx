import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/auth";
import { Eye, EyeClosed, Loader2, Lock, LogIn, Mail, User, UserRoundPlus } from "lucide-react";
import { useState, type SubmitEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function SignupPage() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const signup = useAuthStore((state) => state.signup);

  const navigate = useNavigate();

  const handleSubmit: SubmitEventHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const signupMutate = await signup({
        name,
        email,
        password
      });

      if (signupMutate) {
        toast.success("Cadastro realizado com sucesso!");
      }
    } catch (error) {
      toast.error("Falha ao realizar o cadastro!");

    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center gap-6">
      <img src="/img/logo.svg" alt="Financy" className="h-10" />

      <Card className="w-full max-w-md rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">
            Criar conta
          </CardTitle>
          <CardDescription className="text-center">
            Comece a controlar suas finanças ainda hoje
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome completo</Label>

              <InputGroup>
                <InputGroupInput id="nome" type="text" placeholder="Seu nome completo"
                  value={name} onChange={(e) => setName(e.target.value)}
                  disabled={loading} required />

                <InputGroupAddon>
                  <User />
                </InputGroupAddon>
              </InputGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>

              <InputGroup>
                <InputGroupInput id="email" type="email" placeholder="mail@exemplo.com"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  disabled={loading} required />

                <InputGroupAddon>
                  <Mail />
                </InputGroupAddon>
              </InputGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>

              <InputGroup>
                <InputGroupInput id="password" type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  disabled={loading} required />

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
              <FieldDescription>A senha deve ter no mínimo 8 caracteres</FieldDescription>
            </div>

            <Button type="submit" size="md" variant="solid" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" /> Cadastrando...
                </>
              ) : (
                <>
                  <UserRoundPlus className="mr-2 h-4 w-4" /> Cadastrar
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
            Já tem uma conta?
          </div>

          <Button type="button" variant="outline" size="md" className="w-full" disabled={loading}
            onClick={handleLogin}>

            <LogIn className="mr-2 h-4 w-4" /> Fazer login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}