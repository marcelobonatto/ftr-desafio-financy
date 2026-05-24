import { Page } from "@/components/Page";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { UserAvatar } from "@/components/UserAvatar";
import { UPDATE_USER } from "@/lib/graphql/mutations/Users";
import { useAuthStore } from "@/stores/auth";
import { useMutation } from "@apollo/client/react";
import { Loader2, LogOut, Mail, Save, User } from "lucide-react";
import { useState, type SubmitEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Tipagem do retorno da mutação UPDATE_USER
type UpdateUserMutationData = {
  updateUser: {
    id: string;
    name: string;
    email: string;
  };
};

// Tipagem das variáveis da mutação UPDATE_USER
type UpdateUserVariables = {
  id: string;
  data: {
    name: string;
  };
};

// Componente da página de perfil
export function ProfilePage() {
  // Armazena o usuário logado
  const { user, replaceName, logout } = useAuthStore();
  const navigate = useNavigate();
  const [name, setName] = useState(() => user?.name ?? "");

  // Mutação para atualizar o usuário
  const [updateUser, { loading }] = useMutation<UpdateUserMutationData, UpdateUserVariables>(
    UPDATE_USER, {
    onCompleted: (res: UpdateUserMutationData) => {
      // Obtém os dados atualizados do usuário
      const updatedUser = res.updateUser;

      // Se os dados foram atualizados com sucesso, atualiza o estado e mostra uma mensagem de sucesso
      if (updatedUser && user) {
        replaceName(updatedUser.name);
        toast.success("Perfil atualizado com sucesso!");
      }
    },
    // Callback de erro
    onError: (error) => {
      toast.error(error.message || "Não foi possível salvar as alterações.");
    },
  });

  // Função que trata o envio do formulário
  const handleSubmit: SubmitEventHandler = async (e) => {
    e.preventDefault();

    // Se não houver usuário logado, retorna
    if (!user?.id) return;

    // Se o nome estiver em branco, mostra uma mensagem de erro
    if (!name.trim()) {
      toast.error("O nome não pode ficar em branco.");
      return;
    }

    // Executa a mutação para atualizar o usuário
    await updateUser({
      variables: {
        id: user.id,
        data: { name },
      },
    });
  };

  // Função que trata o logout
  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Sessão encerrada com sucesso!");
  };

  // Renderiza o componente
  return (
    <Page>
      <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center gap-6">
        <Card className="w-full max-w-md rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <UserAvatar size="lg" />
            </CardTitle>
            <CardDescription className="text-center mt-2 flex flex-col gap-2">
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              <span className="text-sm text-gray-500">{user?.email}</span>
              <hr className="my-6" />
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campo do nome */}
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>

                <InputGroup>
                  <InputGroupInput
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    required
                  />

                  <InputGroupAddon>
                    <User />
                  </InputGroupAddon>
                </InputGroup>
              </div>

              {/* Campo do e-mail */}
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>

                <InputGroup>
                  <InputGroupInput
                    id="email"
                    type="email"
                    placeholder="mail@exemplo.com"
                    value={user?.email || ""}
                    readOnly
                  />

                  <InputGroupAddon>
                    <Mail />
                  </InputGroupAddon>
                </InputGroup>

                <FieldDescription>
                  O e-mail não pode ser alterado
                </FieldDescription>
              </div>

              {/* Botão para salvar alterações */}
              <Button
                type="submit"
                variant="solid"
                size="md"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" /> Salvando alterações...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Salvar alterações
                  </>
                )}
              </Button>
            </form>

            {/* Botão para o usuário desconectar */}
            <Button
              type="button"
              variant="outline"
              size="md"
              className="w-full"
              onClick={handleLogout}
              disabled={loading}
            >
              <LogOut className="mr-2 h-4 w-4 text-danger" /> Sair da conta
            </Button>
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}
