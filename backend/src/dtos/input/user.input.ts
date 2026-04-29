import { IsEmail, IsNotEmpty } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateUserInput {
    @Field(() => String)
    @IsNotEmpty()
    name!: string;

    @Field(() => String)
    @IsEmail()
    email!: string;
}

@InputType()
export class UpdateUserInput {
    @Field(() => String, { nullable: true })
    name?: string;
}