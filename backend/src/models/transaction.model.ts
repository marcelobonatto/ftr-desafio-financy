import { CategoryModel } from "./category.model";
import { Field, ObjectType, registerEnumType } from "type-graphql";
import { UserModel } from "./user.model";
import { TransactionType } from "../../generated/prisma/enums";

// Registra o tipo de enumeração do tipo de transação para o GraphQL.
registerEnumType(TransactionType, {
    name: "TransactionType"
});

// Modelo da tabela Transaction.
@ObjectType()
export class TransactionModel {
    @Field(() => String)
    id!: string;

    @Field(() => String)
    description!: string;

    @Field(() => Number)
    amount!: number;

    @Field(() => TransactionType)
    type!: TransactionType;

    @Field(() => CategoryModel)
    category!: CategoryModel;

    @Field(() => Date)
    date!: Date;

    userId!: string;

    @Field(() => UserModel, { nullable: true })
    user?: UserModel;
}