import { prismaClient } from "../lib/prisma";
import { CreateUserInput, UpdateUserInput } from "../dtos/input/user.input";

// Classe de serviços relacionados ao usuário.
export class UserService {

    // Cadastra um novo usuário.
    async createUser(data: CreateUserInput) {
        // Busca se o usuário já está cadastrado.
        const findUser = await prismaClient.user.findUnique({
            where: {
                email: data.email
            }
        });

        // Se o usuário já estiver cadastrado, retorna um erro.
        if (findUser) throw new Error("Usuário já cadastrado!");
        // Cria um novo usuário.
        return prismaClient.user.create({
            data: {
                name: data.name,
                email: data.email
            }
        });
    }

    // Busca as informações de um usuário por ID.
    async findUser(id: String) {
        // Busca o usuário no banco de dados pelo seu ID.
        const user = await prismaClient.user.findUnique({
            where: {
                id: String(id)
            }
        });

        // Se não encontrar, retorna um erro.
        if (!user) throw new Error("Usuário não encontrado!");

        // Retorna o usuário.
        return user;
    }

    // Lista todos os usuários.
    async listUsers() {
        // Retorna a lista de todos os usuários cadastrados.
        return prismaClient.user.findMany();
    }

    // Atualiza as informações de um usuário.
    async updateUser(id: String, data: UpdateUserInput) {
        // Busca o usuário no banco de dados pelo seu ID.
        const user = await prismaClient.user.findUnique({
            where: {
                id: String(id)
            }
        });

        // Se não encontrar, retorna um erro.
        if (!user) throw new Error("Usuário não encontrado!");

        // Atualiza e retorna o usuário.
        return prismaClient.user.update({
            where: {
                id: String(id)
            },
            data: {
                name: String(data.name)
            }
        });
    }
}