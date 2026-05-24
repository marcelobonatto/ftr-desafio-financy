import { IsEmail, IsNotEmpty } from "class-validator";
import { Field, InputType } from "type-graphql";

// Classe de entrada para criação de usuário.
@InputType()
export class CreateUserInput {
    @Field(() => String)
    @IsNotEmpty()
    name!: string;

    @Field(() => String)
    @IsEmail()
    email!: string;
}

// Classe de entrada para atualização de usuário.
@InputType()
export class UpdateUserInput {
    @Field(() => String, { nullable: true })
    name?: string;
}