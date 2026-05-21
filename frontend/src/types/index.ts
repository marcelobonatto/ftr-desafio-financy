export interface UserDataType {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export type CategoryColor =
  | "blue"
  | "purple"
  | "pink"
  | "red"
  | "orange"
  | "yellow"
  | "green";

export interface CategoryDataType {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  transactionCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PageInfo {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface TransactionDataType {
  id: string;
  description: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  date: string;
  category: {
    id: string;
    name: string;
    color: string;
    icon: string;
  }
}

export interface TransactionsListData {
  listTransactions?: {
    items: TransactionDataType[];
    totalCount: number;
    pageInfo: PageInfo;
  };
}

export interface CategoryStatsData {
  getCategoryStatistics: {
    totalCategories: number;
    totalTransactions: number;
    mostUsedCategoryName: string;
    mostUsedCategoryIcon: string;
    mostUsedCategoryColor: string;
  };
}

export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  transactionCount: number;
}

export interface CategoriesListData {
  listCategories: CategoryItem[];
}