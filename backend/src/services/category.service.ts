import { prismaClient } from "../lib/prisma";
import type { CreateCategoryInput, UpdateCategoryInput } from "../dtos/input/category.input";

export class CategoryService {

    async createCategory(data: CreateCategoryInput, userId: string) {

        return prismaClient.category.create({
            data: {
                ...data,
                userId
            }
        });
    }

    async getCategoryDashboard(userId: string) {

        const totalCategories = await prismaClient.category.count({
            where: {
                userId
            }
        });

        const totalTransactions = await prismaClient.transaction.count({
            where: {
                userId
            }
        });

        const mostUsed = await prismaClient.transaction.groupBy({
            by: ['categoryId'],
            where: {
                userId
            },
            _count: {
                id: true
            },
            orderBy: {
                _count: {
                    id: 'desc'
                }
            },
            take: 1
        });

        const mostUsedCategoryId = mostUsed[0]?.categoryId;

        const mostUsedCategory = mostUsedCategoryId ?
            await prismaClient.category.findUnique({ where: { id: mostUsedCategoryId } }) :
            null;

        return {
            totalCategories,
            totalTransactions,
            mostUsedCategoryName: mostUsedCategory?.name || "Nenhuma"
        }
    }

    async listCategoriesByUser(userId: string) {
        const categories = await prismaClient.category.findMany({
            where: {
                userId
            },
            include: {
                _count: {
                    select: {
                        transactions: true
                    }
                }
            }
        });

        return categories.map((category) => ({
            ...category,
            transactionCount: category._count.transactions
        }));
    }

    async updateCategory(id: String, data: UpdateCategoryInput, userId: String) {
        const category = await prismaClient.category.findFirst({
            where: {
                id: String(id),
                userId: String(userId)
            }
        });

        if (!category) throw new Error("Categoria não encontrada!");

        return prismaClient.category.update({
            where: {
                id: String(id)
            },
            data: { ...data }
        });
    }

    async deleteCategory(id: String, userId: String) {
        const category = await prismaClient.category.findFirst({
            where: {
                id: String(id),
                userId: String(userId)
            }
        });

        if (!category) throw new Error("Categoria não encontrada!");

        return prismaClient.category.delete({
            where: {
                id: String(id)
            }
        });
    }
}