import { Field, InputType } from "type-graphql";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

@InputType()
export class LoginInput {
    @Field(() => String)
    @IsEmail()
    email!: string;

    @Field(() => String)
    @MinLength(6)
    password!: string;
}

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
