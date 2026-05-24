import { IsAuth } from "../middlewares/auth.middleware";
import { CategoryDashboardOutput, GetTopCategoriesOutput } from "../dtos/output/category.output";
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { CategoryService } from "../services/category.service";
import { CategoryModel } from "../models/category.model";
import { UserModel } from "../models/user.model";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { CreateCategoryInput, UpdateCategoryInput } from "../dtos/input/category.input";

// Resolução de requisições GraphQL relacionadas à categoria.
@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {

    // Serviço da categoria.
    private categoryService = new CategoryService();

    // Cria uma nova categoria.
    @Mutation(() => CategoryModel)
    async createCategory(
        @Arg("data", () => CreateCategoryInput) data: CreateCategoryInput,
        @GqlUser() user: UserModel
    ) {
        // Cria a categoria e retorna.
        return this.categoryService.createCategory(data, user.id);
    }

    // Obtém as estatísticas dos totais de uma categoria.
    @Query(() => CategoryDashboardOutput)
    async getCategoryStatistics(@GqlUser() user: UserModel): Promise<CategoryDashboardOutput> {
        // Obtém as estatísticas da categoria e retorna.
        return this.categoryService.getCategoryDashboard(user.id);
    }

    // Lista as categorias.
    @Query(() => [CategoryModel])
    async listCategories(@GqlUser() user: UserModel): Promise<CategoryModel[]> {
        // Lista as categorias do usuário.
        return this.categoryService.listCategoriesByUser(user.id);
    }

    // Obtém as categorias mais usadas.
    @Query(() => [GetTopCategoriesOutput])
    async getTopCategories(
        @Arg("limit", () => Number) limit: number,
        @GqlUser() user: UserModel
    ): Promise<GetTopCategoriesOutput[]> {

        return this.categoryService.getTopCategories(user.id, limit);
    }

    // Atualiza uma categoria.
    @Mutation(() => CategoryModel)
    async updateCategory(
        @Arg("data", () => UpdateCategoryInput) data: UpdateCategoryInput,
        @Arg("id", () => String) id: String,
        @GqlUser() user: UserModel
    ) {
        return this.categoryService.updateCategory(id, data, user.id);
    }

    // Deleta uma categoria.
    @Mutation(() => Boolean)
    async deleteCategory(
        @Arg("id", () => String) id: String,
        @GqlUser() user: UserModel
    ) {
        await this.categoryService.deleteCategory(id, user.id);
        return true;
    }
}