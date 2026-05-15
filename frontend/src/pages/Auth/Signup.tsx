import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Eye, EyeClosed, Lock, LogIn, Mail, User } from "lucide-react";
import { useState, type SubmitEventHandler } from "react";
import { NavLink } from "react-router-dom";

export function SignupPage() {

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit: SubmitEventHandler = async (e) => {
    e.preventDefault();
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
                <InputGroupInput id="nome" type="text" placeholder="Seu nome completo" />

                <InputGroupAddon>
                  <User />
                </InputGroupAddon>
              </InputGroup>
            </div>

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
              <FieldDescription>A senha deve ter no mínimo 8 caracteres</FieldDescription>
            </div>

            <Button type="submit" className="w-full bg-brand-base">
              Cadastrar
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

          <Button type="button" className="w-full bg-white border border-gray-300 text-gray-700">
            <LogIn className="mr-2 h-4 w-4" /> Fazer login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}