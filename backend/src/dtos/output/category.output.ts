import { Field, ObjectType } from "type-graphql";

// Classe de saída para dashboard de categoria.
@ObjectType()
export class CategoryDashboardOutput {
    @Field(() => Number)
    totalCategories!: number;

    @Field(() => Number)
    totalTransactions!: number;

    @Field(() => String)
    mostUsedCategoryName!: string;

    @Field(() => String)
    mostUsedCategoryIcon!: string;

    @Field(() => String)
    mostUsedCategoryColor!: string;
}

// Classe de saída para categorias mais usadas.
@ObjectType()
export class GetTopCategoriesOutput {
    @Field(() => String)
    id!: string;

    @Field(() => String)
    name!: string;

    @Field(() => String)
    icon!: string;

    @Field(() => String)
    color!: string;

    @Field(() => Number)
    transactionCount!: number;

    @Field(() => Number)
    totalAmount!: number;
}