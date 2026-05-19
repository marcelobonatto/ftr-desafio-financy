import { gql } from "@apollo/client";

export const GET_CATEGORY_STATISTICS = gql`
query GetCategoryStatistics {
  getCategoryStatistics {
    totalCategories
    totalTransactions
    mostUsedCategoryName
    mostUsedCategoryIcon
    mostUsedCategoryColor
  }
}`;

export const GET_CATEGORIES = gql`
query ListCategories {
  listCategories {
    id
    name
    description
    icon
    color
    transactionCount
  }
}`;