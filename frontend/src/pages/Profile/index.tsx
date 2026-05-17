import { Page } from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { UserAvatar } from "@/components/UserAvatar";
import { UPDATE_USER } from "@/lib/graphql/mutations/Users";
import { useAuthStore } from "@/stores/auth";
import { useMutation } from "@apollo/client/react";
import { Loader2, LogOut, Mail, Save, User } from "lucide-react";
import { useEffect, useState, type SubmitEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type UpdateUserMutationData = {
  updateUser: {
    id: string;
    name: string;
    email: string;
  }
}

type UpdateUserVariables = {
  id: string;
  data: {
    name: string;
  }
}

export function ProfilePage() {

  const { user, replaceName, logout } = useAuthStore();
  const navigate = useNavigate();
  const [name, setName] = useState('');

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  const [updateUser, { loading }] = useMutation<
    UpdateUserMutationData,
    UpdateUserVariables
  >(UPDATE_USER, {
    onCompleted: (res: UpdateUserMutationData) => {
      const updatedUser = res.updateUser;

      if (updatedUser && user) {
        replaceName(updatedUser.name);
        toast.success('Perfil atualizado com sucesso!');
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Não foi possível salvar as alterações.');
    }
  });

  const handleSubmit: SubmitEventHandler = async (e) => {
    e.preventDefault();

    if (!user?.id) return;
    if (!name.trim()) {
      toast.error("O nome não pode ficar em branco.");
      return;
    }

    await updateUser({
      variables: {
        id: user.id,
        data: { name }
      }
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Sessão encerrada com sucesso!');
  };

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
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>

                <InputGroup>
                  <InputGroupInput id="name" type="text"
                    placeholder="Seu nome completo" value={name} onChange={(e) => setName(e.target.value)}
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
                    value={user?.email || ''} readOnly />

                  <InputGroupAddon>
                    <Mail />
                  </InputGroupAddon>
                </InputGroup>
                <FieldDescription>O e-mail não pode ser alterado</FieldDescription>
              </div>

              <Button type="submit" variant="solid" size="md" className="w-full" disabled={loading}>
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

            <Button type="button" variant="outline" size="md" className="w-full" onClick={handleLogout} disabled={loading}>
              <LogOut className="mr-2 h-4 w-4 text-danger" /> Sair da conta
            </Button>
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}