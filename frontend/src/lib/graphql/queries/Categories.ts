import { gql } from "@apollo/client";

export const GET_CATEGORY_STATISTICS = gql`
query GetCategoryStatistics {
  getCategoryStatistics {
    totalCategories
    totalTransactions
    mostUsedCategoryName
    mostUsedCategoryIcon
  }
}`;

export const GET_CATEGORIES = gql`
query ListCategories {
  listCategories {
    id
    color
    icon
    name
    description
    transactionCount
  }
}`;