import { Arg, Query, Resolver, UseMiddleware } from "type-graphql";
import { UserModel } from "../models/user.model";
import { IsAuth } from "../middlewares/auth.middleware";
import { UserService } from "../services/user.service";

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
}