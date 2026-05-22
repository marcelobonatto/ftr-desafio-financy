import { gql } from "@apollo/client";

export const LIST_TRANSACTIONS = gql`
    query ListTransactions($input: ListTransactionsInput!) {
        listTransactions(input: $input) {
            items {
                id
                description
                amount
                type
                date
                category {
                    id
                    name
                    color
                    icon
                }
            }
            totalCount
            pageInfo {
                currentPage
                totalPages
                hasNextPage
                hasPreviousPage
            }
        }
    }
`;

export const GET_TRANSACTIONS_SUMMARY = gql`
    query GetTransactionsSummary($input: GetTransactionsSummaryInput!) {
        getTransactionsSummary(input: $input) {
            totalBalance
            monthIncomes
            monthExpenses
        }
    }
`;

export const GET_LATEST_TRANSACTIONS = gql`
    query GetLatestTransactionsOutput($limit: Float!) {
        getLatestTransactionsOutput(limit: $limit) {
            id
            description
            type  
            date
            amount
            category {
                id
                name
                icon
                color
            }
        }
    }
`;