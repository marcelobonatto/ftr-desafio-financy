import { Field, ID, ObjectType } from "type-graphql";

// Modelo de dados da tabela User
@ObjectType()
export class UserModel {
    @Field(() => ID)
    id!: string;

    @Field(() => String)
    name!: string;

    @Field(() => String)
    email!: string;

    password?: string | null;

    @Field(() => Date, { nullable: true })
    createdAt?: Date;

    @Field(() => Date, { nullable: true })
    updatedAt?: Date;
}