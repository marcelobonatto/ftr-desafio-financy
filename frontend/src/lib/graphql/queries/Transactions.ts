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