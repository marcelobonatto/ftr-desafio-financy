import { LoginInput, RegisterInput } from "../dtos/input/auth.input";
import { prismaClient } from "../lib/prisma";
import type { UserModel } from "../models/user.model";
import { comparePassword, hashPassword } from "../utils/hash";
import { signJwt } from "../utils/jwt";

// Serviço de funções de autenticação.
export class AuthService {

    // Recebe a requisição de login e retorna JWT.
    async login(data: LoginInput) {
        // Busca usuário no banco.
        const existingUser = await prismaClient.user.findUnique({
            where: {
                email: data.email
            }
        });

        // Se não encontrar usuário ou senha, retorna um erro.
        if (!existingUser || !existingUser.password) {
            throw new Error("E-mail ou senha inválidos");
        }

        // Compara a senha.
        const compare = await comparePassword(data.password, existingUser.password);

        // Se não forem iguais, retorna um erro.
        if (!compare) {
            throw new Error("E-mail ou senha inválidos");
        }

        // Retorna JWT.
        return this.generateTokens(existingUser);
    }

    // Recebe os dados do usuário e cria um novo usuário no banco.
    async register(data: RegisterInput) {
        // Recebe os dados do usuário.
        const { name, email, password } = data;

        // Verifica se o usuário já existe no banco de dados.
        const existingUser = await prismaClient.user.findUnique({
            where: {
                email: data.email
            }
        });

        // Se já existir, retorna erro.
        if (existingUser) {
            throw new Error("E-mail já cadastrado");
        }

        // Gera hash da senha.
        const hash = await hashPassword(password);

        // Cria o usuário no banco de dados.
        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                password: hash
            }
        });

        // Retorna JWT.
        return this.generateTokens(user);
    }

    // Gera o código JWT.
    generateTokens(user: UserModel) {
        // Gera o JWT.
        const token = signJwt({ id: user.id, email: user.email }, '1d');
        // Gera o token de atualização.
        const refreshToken = signJwt({ id: user.id, email: user.email }, '7d');

        // Retorna JWT.
        return { token, refreshToken, user };
    }
}