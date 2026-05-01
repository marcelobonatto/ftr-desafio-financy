import { IsIn, IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { TransactionType } from "../../../generated/prisma/enums";

@InputType()
export class CreateTransactionInput {
    @Field(() => String)
    @IsNotEmpty({ message: "A descrição é obrigatória" })
    @MaxLength(100)
    description!: string;

    @Field(() => Number)
    @IsNotEmpty({ message: "O valor é obrigatório" })
    amount!: number;

    @Field(() => TransactionType)
    @IsNotEmpty({ message: "O tipo é obrigatório" })
    type!: TransactionType;

    @Field(() => String)
    @IsNotEmpty({ message: "A categoria é obrigatória" })
    categoryId!: string;

    @Field(() => Date)
    date!: Date;
}

@InputType()
export class UpdateTransactionInput {
    @Field(() => String, { nullable: true })
    @IsOptional()
    @MaxLength(100)
    description?: string;

    @Field(() => Number, { nullable: true })
    @IsOptional()
    amount?: number;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsIn(["INCOME", "EXPENSE"])
    type?: TransactionType;

    @Field(() => String, { nullable: true })
    @IsOptional()
    categoryId?: string;

    @Field(() => Date, { nullable: true })
    @IsOptional()
    date?: Date;
}