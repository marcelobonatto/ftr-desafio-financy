import { prismaClient } from "../lib/prisma";
import type { CreateTransactionInput, ListTransactionsInput } from "../dtos/input/transaction.input";
import type { UpdateTransactionInput } from "../dtos/input/transaction.input";
import { TransactionType } from "../../generated/prisma/enums";

export class TransactionService {

    async createTransaction(data: CreateTransactionInput, userId: string) {

        const finalAmount = data.type === TransactionType.EXPENSE && data.amount > 0
            ? -Math.abs(data.amount)
            : Math.abs(data.amount);

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

    async listTransactions(userId: string, input: ListTransactionsInput) {
        const { page, perPage, month, year, search, type, categoryId } = input;

        const skip = (page - 1) * perPage;
        const take = perPage;

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59, 999);

        const where: any = {
            userId,
            date: {
                gte: startDate,
                lte: endDate
            }
        };

        if (search) {
            where.description = {
                contains: search
            }
        }

        if (type) {
            where.type = type
        }

        if (categoryId) {
            where.categoryId = categoryId
        }

        const [items, totalCount] = await Promise.all([
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
            prismaClient.transaction.count({
                where,
            })
        ]);

        const totalPages = Math.ceil(totalCount / perPage) || 1;

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

    async updateTransaction(id: String, data: UpdateTransactionInput, userId: String) {
        const transaction = await prismaClient.transaction.findFirst({
            where: {
                id: String(id),
                userId: String(userId)
            }
        });

        if (!transaction) throw new Error("Transação não encontrada!");

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

    async deleteTransaction(id: String, userId: String) {
        const transaction = await prismaClient.transaction.findFirst({
            where: {
                id: String(id),
                userId: String(userId)
            }
        });

        if (!transaction) throw new Error("Transação não encontrada!");

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