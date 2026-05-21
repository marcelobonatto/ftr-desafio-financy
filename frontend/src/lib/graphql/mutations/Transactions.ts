import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
    mutation CreateTransaction($data: CreateTransactionInput!) {
        createTransaction(data: $data) {
            id
            description  
        }
    }
`;

export const UPDATE_TRANSACTION = gql`
    mutation UpdateTransaction($input: UpdateTransactionInput!) {
        updateTransaction(input: $input) {
            id
            description
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