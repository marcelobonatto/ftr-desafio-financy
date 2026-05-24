import "dotenv/config";
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from "../../generated/prisma/client";

// Armazena a instância do Prisma em nível de módulo para persistência entre hot-reloads.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Constrói a string de conexão com o banco de dados.
const connectionString = process.env.DATABASE_URL || "file:./financy.db";

// Cria o adaptador para o banco de dados.
const adapter = new PrismaBetterSqlite3({ url: connectionString });

// Cria a instância do cliente Prisma.
export const prismaClient = globalForPrisma.prisma || new PrismaClient({ adapter });

// Se não for produção, armazena a instância do cliente Prisma.
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaClient;