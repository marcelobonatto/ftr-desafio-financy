import { LoginInput } from "../dtos/input/auth.input";
import { prismaClient } from "../lib/prisma";
import type { UserModel } from "../models/user.model";
import { comparePassword } from "../utils/hash";
import { signJwt } from "../utils/jwt";

export class AuthService {

    async login(data: LoginInput) {

        const existingUser = await prismaClient.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (!existingUser) {
            throw new Error("E-mail ou senha inválidos");
        }

        const compare = await comparePassword(data.password, existingUser.password);

        if (!compare) {
            throw new Error("E-mail ou senha inválidos");
        }

        return this.generateTokens(existingUser);
    }

    generateTokens(user: UserModel) {
        const token = signJwt({ id: user.id, email: user.email }, '1d');
        const refreshToken = signJwt({ id: user.id, email: user.email }, '7d');

        return { token, refreshToken, user };
    }
}