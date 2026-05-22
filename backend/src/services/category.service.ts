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
            mostUsedCategoryName: mostUsedCategory?.name || "Nenhuma",
            mostUsedCategoryIcon: mostUsedCategory?.icon || "Circle",
            mostUsedCategoryColor: mostUsedCategory?.color || "gray",
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

    async getTopCategories(userId: string, limit: number) {
        const groupResult = await prismaClient.transaction.groupBy({
            by: ['categoryId'],
            where: {
                userId
            },
            _count: {
                id: true
            },
            _sum: {
                amount: true
            },
            orderBy: {
                _count: {
                    id: 'desc'
                }
            },
            take: limit
        });

        if (groupResult.length === 0) return [];

        const categoryIds = groupResult.map(item => item.categoryId);

        const categories = await prismaClient.category.findMany({
            where: {
                id: { in: categoryIds}
            }
        });

        const topCategories = groupResult.map(groupItem => {
            const categoryInfo = categories.find(c => c.id === groupItem.categoryId);

            return {
                id: groupItem.categoryId,
                name: categoryInfo?.name || "Desconhecido",
                color: categoryInfo?.color || "blue",
                icon: categoryInfo?.icon || "help-circle",
                transactionCount: groupItem._count.id,
                totalAmount: groupItem._sum.amount ?? 0
            }
        });

        return topCategories.sort((a, b) => b.transactionCount - a.transactionCount);
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