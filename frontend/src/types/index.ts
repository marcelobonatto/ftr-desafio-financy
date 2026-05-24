// Tipo de dados de usuário
export interface UserDataType {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

// Interface de entrada para registrar usuário
export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

// Interface de entrada para login
export interface LoginInput {
  email: string;
  password: string;
}

// Tipo de dados de categoria
export type CategoryColor =
  | "blue"
  | "purple"
  | "pink"
  | "red"
  | "orange"
  | "yellow"
  | "green";

// Tipo de dados de categoria
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

// Informações de paginação
export interface PageInfo {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Tipo de dados de transação
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

// Tipo de dados de lista de transações
export interface TransactionsListData {
  listTransactions?: {
    items: TransactionDataType[];
    totalCount: number;
    pageInfo: PageInfo;
  };
}

// Tipo de dados com estatísticas de categorias
export interface CategoryStatsData {
  getCategoryStatistics: {
    totalCategories: number;
    totalTransactions: number;
    mostUsedCategoryName: string;
    mostUsedCategoryIcon: string;
    mostUsedCategoryColor: string;
  };
}

// Tipo de dados de categoria para matriz
export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  transactionCount: number;
}

// Tipo de dados de lista de categorias
export interface CategoriesListData {
  listCategories: CategoryItem[];
}