import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { expressMiddleware } from '@as-integrations/express5';
import { buildContext } from './graphql/context/index';
import { AuthResolver } from './resolvers/auth.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { CategoryResolver } from "./resolvers/category.resolver";
import { TransactionResolver } from "./resolvers/transaction.resolver";

// Inicialização da aplicação (Backend GraphQL).
async function bootstrap() {
    // Cria instância do backend.
    const app = express();

    // Adiciona CORS.
    app.use(cors({
        origin: '*',
        credentials: true
    }));

    // Cria schema do GraphQL.
    const schema = await buildSchema({
        resolvers: [AuthResolver, UserResolver, CategoryResolver, TransactionResolver],
        validate: false,
        emitSchemaFile: './schema.graphql'
    })

    // Cria servidor Apollo GraphQL.
    const apolloServer = new ApolloServer({
        schema
    });

    // Inicia servidor Apollo GraphQL.
    await apolloServer.start();

    // Adiciona rota GraphQL.
    app.use('/graphql',
        express.json(),
        expressMiddleware(apolloServer, {
            context: buildContext
        })
    );

    // Inicia backend.
    app.listen(4000, () => {
        console.log('🚀 Server running on http://localhost:4000');
    })
}

bootstrap();