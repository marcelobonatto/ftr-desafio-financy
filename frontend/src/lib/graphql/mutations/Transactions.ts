import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
    mutation CreateTransaction($input: CreateTransactionInput!) {
        createTransaction(input: $input) {
            id
            title
        }
    }
`;

export const UPDATE_TRANSACTION = gql`
    mutation UpdateTransaction($input: UpdateTransactionInput!) {
        updateTransaction(input: $input) {
            id
            title
        }
    }
`;

export const DELETE_TRANSACTION = gql`
    mutation DeleteTransaction($input: DeleteTransactionInput!) {
        deleteTransaction(input: $input) {
            id
        }
    }
`;