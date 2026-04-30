import { Field, ObjectType } from "type-graphql";
import { UserModel } from "./user.model";

@ObjectType()
export class CategoryModel {

    @Field(() => String)
    id!: string;

    @Field(() => String)
    name!: string;

    @Field(() => String, { nullable: true })
    description?: string | null;

    @Field(() => String)
    icon!: string;

    @Field(() => String)
    color!: string;

    @Field(() => Date, { nullable: true })
    createdAt?: Date;

    @Field(() => Date, { nullable: true })
    updatedAt?: Date;

    userId!: string;

    @Field(() => UserModel, { nullable: true })
    user?: UserModel;

    @Field(() => Number, { nullable: true })
    transactionCount?: number;
}