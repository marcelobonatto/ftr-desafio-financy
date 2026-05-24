import { Field, ObjectType } from "type-graphql";
import { UserModel } from "../../models/user.model";

// Tipo de definição de saída de Login.
@ObjectType()
export class LoginOutput {
    @Field(() => String)
    token!: string;

    @Field(() => String)
    refreshToken!: string;

    @Field(() => UserModel)
    user!: UserModel;
}

// Tipo de definição de saída de Cadastro.
@ObjectType()
export class RegisterOutput {
    @Field(() => String)
    token!: string

    @Field(() => String)
    refreshToken!: string

    @Field(() => UserModel)
    user!: UserModel
}