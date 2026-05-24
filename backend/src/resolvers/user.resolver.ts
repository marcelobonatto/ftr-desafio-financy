import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { UserModel } from "../models/user.model";
import { IsAuth } from "../middlewares/auth.middleware";
import { UserService } from "../services/user.service";
import { UpdateUserInput } from "../dtos/input/user.input";

// Resolução de requisições GraphQL relacionadas ao usuário.
@Resolver(() => UserModel)
@UseMiddleware(IsAuth)
export class UserResolver {

    // Serviço do usuário.
    private userService = new UserService();

    // Obtém as informações de um usuário pelo seu ID.
    @Query(() => UserModel)
    async getUser(@Arg("id", () => String) id: String): Promise<UserModel> {
        // Busca e retorna as informações de um usuário pelo seu ID.
        return this.userService.findUser(id);
    }

    // Lista e obtém as informações de todos os usuários cadastrados.
    @Query(() => [UserModel])
    async listUsers() {
        // Busca e retorna as informações de todos os usuários cadastrados.
        return this.userService.listUsers();
    }

    // Atualiza as informações de um usuário pelo seu ID.
    @Mutation(() => UserModel)
    async updateUser(
        @Arg("id", () => String) id: String,
        @Arg("data", () => UpdateUserInput) data: UpdateUserInput): Promise<UserModel> {

        // Atualiza e retorna as informações de um usuário pelo seu ID.
        return this.userService.updateUser(id, data);
    }
}