import { IsIn, IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCategoryInput {
    @Field(() => String)
    @IsNotEmpty({ message: "O título é obrigatório" })
    @MaxLength(30)
    name!: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    description!: string;

    @Field(() => String)
    @IsIn(["briefcase-business", "car-front", "heart-pulse", "piggy-bank",
        "shopping-cart", "ticket", "tool-case", "utensils", "paw-print",
        "house", "gift", "dumbbell", "book-open", "baggage-claim",
        "mailbox", "receipt-text"
    ], { message: "Ícone inválido" })
    icon!: string;

    @Field(() => String)
    @IsIn(["green", "blue", "purple", "pink", "red", "orange", "yellow"])
    color!: string;
}

@InputType()
export class UpdateCategoryInput {
    @Field(() => String, { nullable: true })
    @IsOptional()
    @MaxLength(30)
    name?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    description?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsIn(["briefcase-business", "car-front", "heart-pulse", "piggy-bank",
        "shopping-cart", "ticket", "tool-case", "utensils", "paw-print",
        "house", "gift", "dumbbell", "book-open", "baggage-claim",
        "mailbox", "receipt-text"
    ], { message: "Ícone inválido" })
    icon?: string;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsIn(["green", "blue", "purple", "pink", "red", "orange", "yellow"])
    color?: string;
}
