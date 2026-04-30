import { createParameterDecorator, type ResolverData } from "type-graphql"
import type { GraphQLContext } from "../context";
import type { UserModel } from "../../models/user.model";
import { prismaClient } from "../../lib/prisma";

export const GqlUser = () => {

    return createParameterDecorator(
        async ({ context }: ResolverData<GraphQLContext>): Promise<UserModel | null> => {
            if (!context || !context.user) return null;

            try {
                const user = await prismaClient.user.findUnique({
                    where: {
                        id: context.user
                    }
                });

                if (!user) throw new Error("Usuário não encontrado!");

                return user;

            } catch (error) {
                console.log(error)
                return null;
            }
        }
    );
}