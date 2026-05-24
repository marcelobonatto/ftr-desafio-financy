import { prismaClient } from "../lib/prisma";
import type { CreateCategoryInput, UpdateCategoryInput } from "../dtos/input/category.input";

// Classe de serviços relacionados à categoria.
export class CategoryService {

    // Cria uma nova categoria.
    async createCategory(data: CreateCategoryInput, userId: string) {

        // Cria a categoria e retorna.
        return prismaClient.category.create({
            data: {
                ...data,
                userId
            }
        });
    }

    // Obtém as estatísticas para o dashboard de uma categoria.
    async getCategoryDashboard(userId: string) {

        // Busca a quantidade total de categorias.
        const totalCategories = await prismaClient.category.count({
            where: {
                userId
            }
        });

        // Busca a quantidade total de transações.
        const totalTransactions = await prismaClient.transaction.count({
            where: {
                userId
            }
        });

        // Busca a categoria mais usada.
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

        // Obtém o ID da categoria mais usada.
        const mostUsedCategoryId = mostUsed[0]?.categoryId;

        // Obtém os dados da categoria mais usada.
        const mostUsedCategory = mostUsedCategoryId ?
            await prismaClient.category.findUnique({ where: { id: mostUsedCategoryId } }) :
            null;

        // Retorna as estatísticas para o dashboard.
        return {
            totalCategories,
            totalTransactions,
            mostUsedCategoryName: mostUsedCategory?.name || "Nenhuma",
            mostUsedCategoryIcon: mostUsedCategory?.icon || "Circle",
            mostUsedCategoryColor: mostUsedCategory?.color || "gray",
        }
    }

    // Lista as categorias de um usuário.
    async listCategoriesByUser(userId: string) {
        // Busca as categorias do usuário.
        const categories = await prismaClient.category.findMany({
            where: {
                userId
            },
            // Inclui a quantidade de transações de cada categoria.
            include: {
                _count: {
                    select: {
                        transactions: true
                    }
                }
            }
        });

        // Retorna as categorias com a quantidade de transações.
        return categories.map((category) => ({
            ...category,
            transactionCount: category._count.transactions
        }));
    }

    // Busca as categorias mais usadas.
    async getTopCategories(userId: string, limit: number) {
        // Agrupa as transações utilizadas pelas categorias.
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

        // Se não houver transações, retorna um array vazio.
        if (groupResult.length === 0) return [];

        // Obtém os IDs das categorias.
        const categoryIds = groupResult.map(item => item.categoryId);

        // Busca as informações das categorias.
        const categories = await prismaClient.category.findMany({
            where: {
                id: { in: categoryIds }
            }
        });

        // Mapeia os resultados do agrupamento para o formato de resposta.
        const topCategories = groupResult.map(groupItem => {
            // Busca as informações da categoria.
            const categoryInfo = categories.find(c => c.id === groupItem.categoryId);

            // Retorna as informações da categoria.
            return {
                id: groupItem.categoryId,
                name: categoryInfo?.name || "Desconhecido",
                color: categoryInfo?.color || "blue",
                icon: categoryInfo?.icon || "help-circle",
                // Quantidade de transações.
                transactionCount: groupItem._count.id,
                // Total de transações.
                totalAmount: groupItem._sum.amount ?? 0
            }
        });

        // Ordena por quantidade de transações.
        return topCategories.sort((a, b) => b.transactionCount - a.transactionCount);
    }

    // Atualiza uma categoria.
    async updateCategory(id: String, data: UpdateCategoryInput, userId: String) {
        // Busca a categoria no banco de dados.
        const category = await prismaClient.category.findFirst({
            where: {
                id: String(id),
                userId: String(userId)
            }
        });

        // Se não encontrar, retorna um erro.
        if (!category) throw new Error("Categoria não encontrada!");

        // Atualiza e retorna a categoria.
        return prismaClient.category.update({
            where: {
                id: String(id)
            },
            data: { ...data }
        });
    }

    // Deleta uma categoria.
    async deleteCategory(id: String, userId: String) {
        // Busca a categoria no banco de dados.
        const category = await prismaClient.category.findFirst({
            where: {
                id: String(id),
                userId: String(userId)
            }
        });

        // Se não encontrar, retorna um erro.
        if (!category) throw new Error("Categoria não encontrada!");

        // Deleta e retorna a categoria.
        return prismaClient.category.delete({
            where: {
                id: String(id)
            }
        });
    }
}