import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { expressMiddleware } from '@as-integrations/express5';
import { buildContext } from './graphql/context/index';
import { AuthResolver } from './resolvers/auth.resolver';

async function bootstrap() {
    const app = express();

    app.use(cors({
        origin: '*',
        credentials: true
    }));

    const schema = await buildSchema({
        resolvers: [AuthResolver],
        validate: false,
        emitSchemaFile: './schema.graphql'
    })

    const apolloServer = new ApolloServer({
        schema
    });

    await apolloServer.start();

    app.use('/graphql',
        express.json(),
        expressMiddleware(apolloServer, {
            context: buildContext
        })
    );

    app.listen(4000, () => {
        console.log('🚀 Server running on http://localhost:4000');
    })
}

bootstrap();