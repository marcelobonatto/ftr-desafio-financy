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