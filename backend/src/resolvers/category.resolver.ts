import { IsAuth } from "../middlewares/auth.middleware";
import { CategoryDashboardOutput } from "../dtos/output/category.output";
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { CategoryService } from "../services/category.service";
import { CategoryModel } from "../models/category.model";
import { UserModel } from "../models/user.model";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { CreateCategoryInput, UpdateCategoryInput } from "../dtos/input/category.input";

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {

    private categoryService = new CategoryService();

    @Mutation(() => CategoryModel)
    async createCategory(
        @Arg("data", () => CreateCategoryInput) data: CreateCategoryInput,
        @GqlUser() user: UserModel
    ) {
        return this.categoryService.createCategory(data, user.id);
    }

    @Query(() => CategoryDashboardOutput)
    async getCategoryStatistics(@GqlUser() user: UserModel): Promise<CategoryDashboardOutput> {
        return this.categoryService.getCategoryDashboard(user.id);
    }

    @Query(() => [CategoryModel])
    async listCategories(@GqlUser() user: UserModel): Promise<CategoryModel[]> {
        return this.categoryService.listCategoriesByUser(user.id);
    }

    @Mutation(() => CategoryModel)
    async updateCategory(
        @Arg("data", () => UpdateCategoryInput) data: UpdateCategoryInput,
        @Arg("id", () => String) id: String,
        @GqlUser() user: UserModel
    ) {
        return this.categoryService.updateCategory(id, data, user.id);
    }

    @Mutation(() => Boolean)
    async deleteCategory(
        @Arg("id", () => String) id: String,
        @GqlUser() user: UserModel
    ) {
        await this.categoryService.deleteCategory(id, user.id);
        return true;
    }
}