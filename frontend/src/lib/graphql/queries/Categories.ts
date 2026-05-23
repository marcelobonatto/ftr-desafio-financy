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
  }
`;

export const LIST_CATEGORIES = gql`
  query ListCategories {
    listCategories {
      id
      name
      description
      icon
      color
      transactionCount
    }
  }
`;

export const GET_TOP_CATEGORIES = gql`
  query GetTopCategories($limit: Float!) {
    getTopCategories(limit: $limit) {
      id
      name
      color
      transactionCount
      totalAmount
    }
  }
`;
