import { Field, Int, ObjectType } from "type-graphql";
import { TransactionModel } from "../../models/transaction.model";

@ObjectType()
class PageInfo {
    @Field(() => Int)
    currentPage!: number;

    @Field(() => Int)
    totalPages!: number;

    @Field(() => Boolean)
    hasNextPage!: boolean;

    @Field(() => Boolean)
    hasPreviousPage!: boolean;
}

@ObjectType()
export class PaginatedTransactionsOutput {
    @Field(() => [TransactionModel])
    items!: TransactionModel[];

    @Field(() => Int)
    totalCount!: number;

    @Field(() => PageInfo)
    pageInfo!: PageInfo;
}