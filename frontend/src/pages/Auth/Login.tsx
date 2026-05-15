import { useState, type SubmitEventHandler } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed, Lock, Mail, UserRoundPlus } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Checkbox } from "@/components/ui/checkbox";
import { NavLink } from "react-router-dom";

export function LoginPage() {

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleSubmit: SubmitEventHandler = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log(email, password);
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
                <InputGroupInput id="email" type="email" placeholder="mail@exemplo.com" />

                <InputGroupAddon>
                  <Mail />
                </InputGroupAddon>
              </InputGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>

              <InputGroup>
                <InputGroupInput id="password" type={showPassword ? "text" : "password"} placeholder="Digite sua senha" />

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
                <Checkbox checked={remember} onCheckedChange={setRemember} /> Lembrar-me
              </div>
              <NavLink to="/" className="text-brand-base text-sm hover:underline">Recuperar senha</NavLink>
            </div>

            <Button type="submit" className="w-full bg-brand-base">
              Entrar
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

          <Button type="button" className="w-full bg-white border border-gray-300 text-gray-700">
            <UserRoundPlus className="mr-2 h-4 w-4" /> Criar conta
          </Button>
        </CardContent>
      </Card>
    </div >
  );
}