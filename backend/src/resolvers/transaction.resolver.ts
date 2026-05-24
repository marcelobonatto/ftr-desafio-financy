import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { TransactionModel } from "../models/transaction.model";
import { IsAuth } from "../middlewares/auth.middleware";
import { CreateTransactionInput, GetTransactionsSummaryInput, ListTransactionsInput, UpdateTransactionInput } from "../dtos/input/transaction.input";
import { GetTransactionsSummaryOutput, PaginatedTransactionsOutput } from "../dtos/output/transaction.output";
import { UserModel } from "../models/user.model";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { TransactionService } from "../services/transaction.service";

// Resolução das requisições GraphQL relacionadas a transações.
@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {

    // Serviço de transações.
    private transactionService = new TransactionService();

    // Cria uma nova transação.
    @Mutation(() => TransactionModel)
    async createTransaction(
        @Arg("data", () => CreateTransactionInput) data: CreateTransactionInput,
        @GqlUser() user: UserModel
    ) {
        return this.transactionService.createTransaction(data, user.id);
    }

    // Retorna um resumo das transações.
    @Query(() => GetTransactionsSummaryOutput)
    async getTransactionsSummary(
        @Arg("input", () => GetTransactionsSummaryInput) input: GetTransactionsSummaryInput,
        @GqlUser() user: UserModel
    ): Promise<GetTransactionsSummaryOutput> {

        return this.transactionService.getTransactionsSummary(user.id, input);
    }

    // Lista as transações.
    @Query(() => PaginatedTransactionsOutput)
    async listTransactions(
        @Arg("input", () => ListTransactionsInput) input: ListTransactionsInput,
        @GqlUser() user: UserModel
    ): Promise<PaginatedTransactionsOutput> {

        return this.transactionService.listTransactions(user.id, input);
    }

    // Lista as últimas transações.
    @Query(() => [TransactionModel])
    async getLatestTransactionsOutput(
        @Arg("limit", () => Number) limit: number,
        @GqlUser() user: UserModel
    ): Promise<TransactionModel[]> {

        return this.transactionService.getLastestTransactions(user.id, limit);
    }

    // Atualiza uma transação.
    @Mutation(() => TransactionModel)
    async updateTransaction(
        @Arg("data", () => UpdateTransactionInput) data: UpdateTransactionInput,
        @Arg("id", () => String) id: String,
        @GqlUser() user: UserModel
    ) {
        return this.transactionService.updateTransaction(id, data, user.id);
    }

    // Deleta uma transação.
    @Mutation(() => Boolean)
    async deleteTransaction(
        @Arg("id", () => String) id: String,
        @GqlUser() user: UserModel
    ) {
        // Deleta uma transação.
        await this.transactionService.deleteTransaction(id, user.id);
        return true;
    }
}