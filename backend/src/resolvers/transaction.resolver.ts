import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { TransactionModel } from "../models/transaction.model";
import { IsAuth } from "../middlewares/auth.middleware";
import { CreateTransactionInput, GetTransactionsSummaryInput, ListTransactionsInput, UpdateTransactionInput } from "../dtos/input/transaction.input";
import { GetTransactionsSummaryOutput, PaginatedTransactionsOutput } from "../dtos/output/transaction.output";
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

    @Query(() => GetTransactionsSummaryOutput)
    async getTransactionsSummary(
        @Arg("input", () => GetTransactionsSummaryInput) input: GetTransactionsSummaryInput,
        @GqlUser() user: UserModel
    ): Promise<GetTransactionsSummaryOutput> {

        return this.transactionService.getTransactionsSummary(user.id, input);
    }

    @Query(() => PaginatedTransactionsOutput)
    async listTransactions(
        @Arg("input", () => ListTransactionsInput) input: ListTransactionsInput,
        @GqlUser() user: UserModel
    ): Promise<PaginatedTransactionsOutput> {

        return this.transactionService.listTransactions(user.id, input);
    }

    @Mutation(() => TransactionModel)
    async updateTransaction(
        @Arg("data", () => UpdateTransactionInput) data: UpdateTransactionInput,
        @Arg("id", () => String) id: String,
        @GqlUser() user: UserModel
    ) {
        return this.transactionService.updateTransaction(id, data, user.id);
    }

    @Mutation(() => Boolean)
    async deleteTransaction(
        @Arg("id", () => String) id: String,
        @GqlUser() user: UserModel
    ) {
        await this.transactionService.deleteTransaction(id, user.id);
        return true;
    }
}