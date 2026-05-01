import { prismaClient } from "../lib/prisma";
import type { CreateTransactionInput } from "../dtos/input/transaction.input";
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

    async listTransactions(userId: string) {
        return prismaClient.transaction.findMany({
            where: {
                userId
            },
            include: {
                category: true
            }
        });
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