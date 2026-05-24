import { Field, InputType } from "type-graphql";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

// Tipo de definição de entrada de Login.
@InputType()
export class LoginInput {
    @Field(() => String)
    @IsEmail()
    email!: string;

    @Field(() => String)
    @MinLength(6)
    password!: string;
}

// Tipo de definição de entrada de Cadastro.
@InputType()
export class RegisterInput {
    @Field(() => String)
    @IsNotEmpty()
    name!: string

    @Field(() => String)
    @IsEmail()
    email!: string

    @Field(() => String)
    @MinLength(6)
    password!: string
}
