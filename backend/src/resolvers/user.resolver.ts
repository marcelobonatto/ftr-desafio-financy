import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { UserModel } from "../models/user.model";
import { IsAuth } from "../middlewares/auth.middleware";
import { UserService } from "../services/user.service";
import { UpdateUserInput } from "../dtos/input/user.input";

@Resolver(() => UserModel)
@UseMiddleware(IsAuth)
export class UserResolver {

    private userService = new UserService();

    @Query(() => UserModel)
    async getUser(@Arg("id", () => String) id: String): Promise<UserModel> {

        return this.userService.findUser(id);
    }

    @Query(() => [UserModel])
    async listUsers() {

        return this.userService.listUsers();
    }

    @Mutation(() => UserModel)
    async updateUser(
        @Arg("id", () => String) id: String,
        @Arg("data", () => UpdateUserInput) data: UpdateUserInput): Promise<UserModel> {

        return this.userService.updateUser(id, data);
    }
}