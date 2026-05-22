import { Field, ObjectType } from "type-graphql";

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