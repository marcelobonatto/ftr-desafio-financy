import { prismaClient } from "../lib/prisma";
import { CreateUserInput, UpdateUserInput } from "../dtos/input/user.input";

export class UserService {

    async createUser(data: CreateUserInput) {

        const findUser = await prismaClient.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (findUser) throw new Error("Usuário já cadastrado!");

        return prismaClient.user.create({
            data: {
                name: data.name,
                email: data.email
            }
        });
    }

    async findUser(id: String) {
        const user = await prismaClient.user.findUnique({
            where: {
                id: String(id)
            }
        });

        if (!user) throw new Error("Usuário não encontrado!");

        return user;
    }

    async listUsers() {
        return prismaClient.user.findMany();
    }

    async updateUser(id: String, data: UpdateUserInput) {
        const user = await prismaClient.user.findUnique({
            where: {
                id: String(id)
            }
        });

        if (!user) throw new Error("Usuário não encontrado!");

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