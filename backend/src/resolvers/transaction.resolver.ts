import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { TransactionModel } from "../models/transaction.model";
import { IsAuth } from "../middlewares/auth.middleware";
import { CreateTransactionInput, UpdateTransactionInput } from "../dtos/input/transaction.input";
import { UserModel } from "../models/user.model";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { TransactionService } from "../services/transaction.service";

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {

    private transactionService = new TransactionService();

    @Mutation(() => TransactionModel)
    async createTransaction(
        @Arg("data", () => CreateTransactionInput) data: CreateTransactionInput,
        @GqlUser() user: UserModel
    ) {
        return this.transactionService.createTransaction(data, user.id);
    }

    @Query(() => [TransactionModel])
    async listTransactions(@GqlUser() user: UserModel): Promise<TransactionModel[]> {
        return this.transactionService.listTransactions(user.id);
    }

    // @Mutation(() => TransactionModel)
    // async updateTransaction(
    //     @Arg("data", () => UpdateTransactionInput) data: UpdateTransactionInput,
    //     @Arg("id", () => String) id: String,
    //     @GqlUser() user: UserModel
    // ) {
    //     return this.transactionService.updateTransaction(id, data, user.id);
    // }

    // @Mutation(() => TransactionModel)
    // async deleteTransaction(
    //     @Arg("id", () => String) id: String,
    //     @GqlUser() user: UserModel
    // ) {
    //     return this.transactionService.deleteTransaction(id, user.id);
    // }
}