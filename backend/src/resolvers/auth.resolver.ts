import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { AuthService } from "../services/auth.service";
import { LoginInput, RegisterInput } from "../dtos/input/auth.input";
import { LoginOutput, RegisterOutput } from "../dtos/output/auth.output";

// Resolução de requisições GraphQL relacionadas a autenticação.
@Resolver()
export class AuthResolver {
    // Serviço de autenticação.
    private authService = new AuthService();

    // Requisição de Login.
    @Mutation(() => LoginOutput)
    async login(@Arg("data", () => LoginInput) data: LoginInput): Promise<LoginOutput> {
        return this.authService.login(data);
    }

    // Requisição de Cadastro.
    @Mutation(() => RegisterOutput)
    async register(@Arg("data", () => RegisterInput) data: RegisterInput): Promise<RegisterOutput> {
        return this.authService.register(data);
    }
}