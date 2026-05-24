import { prismaClient } from "../lib/prisma";
import type { CreateTransactionInput, GetTransactionsSummaryInput, ListTransactionsInput } from "../dtos/input/transaction.input";
import type { UpdateTransactionInput } from "../dtos/input/transaction.input";
import { TransactionType } from "../../generated/prisma/enums";

// Classe de serviços relacionados a transações.
export class TransactionService {

    // Cria uma nova transação.
    async createTransaction(data: CreateTransactionInput, userId: string) {

        // Verifica o tipo da transação e ajusta o valor, se necessário.
        const finalAmount = data.type === TransactionType.EXPENSE && data.amount > 0
            ? -Math.abs(data.amount)
            : Math.abs(data.amount);

        // Cria a transação e retorna.
        return prismaClient.transaction.create({
            data: {
                ...data,
                amount: finalAmount,
                userId
            },
            include: {
                category: true
            }
        });
    }

    // Obtém um resumo das transações.
    async getTransactionsSummary(userId: string, input: GetTransactionsSummaryInput) {

        // Obtém o mês e o ano do input.
        const { month, year } = input;

        // Cria a data inicial e final.
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59, 999);

        // Busca o saldo total e as transações do mês.
        const [balanceAggregate, monthAggregate] = await Promise.all([
            // Busca o saldo total.
            prismaClient.transaction.aggregate({
                where: { userId },
                _sum: { amount: true }
            }),

            // Busca as transações do mês.
            prismaClient.transaction.groupBy({
                by: ['type'],
                where: {
                    userId,
                    date: {
                        gte: startDate,
                        lte: endDate
                    }
                },
                _sum: { amount: true }
            })
        ]);

        // Saldo total.
        const totalBalance = balanceAggregate._sum.amount || 0;

        // Despesas e receitas do mês.
        const incomeRow = monthAggregate.find(row => row.type === TransactionType.INCOME);
        const expenseRow = monthAggregate.find(row => row.type === TransactionType.EXPENSE);

        // Receitas do mês.
        const monthIncomes = incomeRow?._sum.amount || 0;
        // Despesas do mês.
        const monthExpenses = expenseRow?._sum.amount ? Math.abs(expenseRow._sum.amount) : 0;

        // Retorna o resumo.
        return {
            totalBalance,
            monthIncomes,
            monthExpenses
        };
    }

    // Lista as transações de um usuário.
    async listTransactions(userId: string, input: ListTransactionsInput) {

        // Obtém o mês e o ano do input.
        const { page, perPage, month, year, search, type, categoryId } = input;

        // Calcula a quantidade de transações por página.
        const skip = (page - 1) * perPage;
        const take = perPage;

        // Cria a data inicial e final.
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59, 999);

        // Cria o filtro de transações.
        const where: any = {
            userId,
            date: {
                gte: startDate,
                lte: endDate
            }
        };

        // Adiciona o filtro de busca, se houver.
        if (search) {
            where.description = {
                contains: search
            }
        }

        // Adiciona o filtro de tipo, se houver.
        if (type) {
            where.type = type
        }

        // Adiciona o filtro de categoria, se houver.
        if (categoryId) {
            where.categoryId = categoryId
        }

        // Busca as transações e a quantidade total de transações.
        const [items, totalCount] = await Promise.all([
            // Busca as transações.
            prismaClient.transaction.findMany({
                where,
                take,
                skip,
                orderBy: {
                    date: "desc"
                },
                include: {
                    category: true
                }
            }),
            // Busca a quantidade total de transações.
            prismaClient.transaction.count({
                where,
            })
        ]);

        // Calcula o número total de páginas.
        const totalPages = Math.ceil(totalCount / perPage) || 1;

        // Retorna as transações e informações de paginação.
        return {
            items,
            totalCount,
            pageInfo: {
                currentPage: page,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            }
        };
    }

    // Busca as últimas transações.
    async getLastestTransactions(userId: string, limit: number) {
        return await prismaClient.transaction.findMany({
            take: limit,
            orderBy: {
                date: "desc"
            },
            include: {
                category: true
            }
        })
    }

    // Atualiza uma transação.
    async updateTransaction(id: String, data: UpdateTransactionInput, userId: String) {

        // Busca a transação no banco de dados.
        const transaction = await prismaClient.transaction.findFirst({
            where: {
                id: String(id),
                userId: String(userId)
            }
        });

        // Se não encontrar, retorna um erro.
        if (!transaction) throw new Error("Transação não encontrada!");

        // Atualiza e retorna a transação.
        return prismaClient.transaction.update({
            where: {
                id: String(id)
            },
            data: { ...data },
            include: {
                category: true
            }
        });
    }

    // Deleta uma transação.
    async deleteTransaction(id: String, userId: String) {

        // Busca a transação no banco de dados.
        const transaction = await prismaClient.transaction.findFirst({
            where: {
                id: String(id),
                userId: String(userId)
            }
        });

        // Se não encontrar, retorna um erro.
        if (!transaction) throw new Error("Transação não encontrada!");

        // Deleta e retorna a transação.
        return prismaClient.transaction.delete({
            where: {
                id: String(id)
            },
            include: {
                category: true
            }
        });
    }
}