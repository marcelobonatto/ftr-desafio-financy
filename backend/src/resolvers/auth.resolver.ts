import { Arg, Mutation, Resolver } from "type-graphql";
import { AuthService } from "../services/auth.service";
import type { LoginInput } from "../dtos/input/auth.input";
import { LoginOutput } from "../dtos/output/auth.output";

@Resolver()
export class AuthResolver {
    private authService = new AuthService();

    @Mutation(() => LoginOutput)
    async login(@Arg("data") data: LoginInput) {
        return this.authService.login(data);
    }
}