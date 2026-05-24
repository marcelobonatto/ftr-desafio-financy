import type { MiddlewareFn } from "type-graphql";
import type { GraphQLContext } from "../graphql/context";

// Middleware de autenticação.
export const IsAuth: MiddlewareFn<GraphQLContext> = async ({ context }, next) => {
    // Verifica se o usuário está autenticado.
    if (!context.user) throw new Error("Usuário não autenticado!");
    // Retorna para a próxima função do pipeline.
    return next();
};