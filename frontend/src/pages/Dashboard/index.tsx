import { Page } from "@/components/Page";
import {
  ChevronRight,
  CircleArrowDown,
  CircleArrowUp,
  Plus,
  Wallet,
} from "lucide-react";
import { CardWithTotal } from "./components/CardWithTotal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NavLink } from "react-router-dom";
import { TransactionItem } from "./components/TransactionItem";
import { CategoryItem } from "./components/CategoryItem";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TransactionDialog } from "@/components/TransactionDialog";
import {
  GET_LATEST_TRANSACTIONS,
  GET_TRANSACTIONS_SUMMARY,
} from "@/lib/graphql/queries/Transactions";
import { useQuery } from "@apollo/client/react";
import type { CategoryColor, TransactionDataType } from "@/types";
import { GET_TOP_CATEGORIES } from "@/lib/graphql/queries/Categories";
import { LoadingState } from "@/components/LoadingState";
import { useAuthStore } from "@/stores/auth";

interface GetLatestTransactionsData {
  getLatestTransactionsOutput: TransactionDataType[];
}

interface GetTransactionSummaryData {
  getTransactionsSummary: {
    totalBalance: number;
    monthIncomes: number;
    monthExpenses: number;
  };
}

interface TopCategoryItem {
  id: string;
  name: string;
  color: string;
  transactionCount: number;
  totalAmount: number;
}

interface GetTopCategoriesData {
  getTopCategories: TopCategoryItem[];
}

export function DashboardPage() {
  const [openCreateTransactionDialog, setOpenCreateTransactionDialog] =
    useState(false);

  const createTransactionDialogHandler = () => {
    setOpenCreateTransactionDialog(true);
  };

  const [period] = useState(() => new Date().toISOString().slice(0, 7));

  const month = parseInt(period.split("-")[1]);
  const year = parseInt(period.split("-")[0]);

  const { data: summaryData, loading: loadingSummary } =
    useQuery<GetTransactionSummaryData>(GET_TRANSACTIONS_SUMMARY, {
      variables: {
        input: { month, year },
      },
      fetchPolicy: "network-only",
    });

  const summary = summaryData?.getTransactionsSummary || {
    totalBalance: 0,
    monthIncomes: 0,
    monthExpenses: 0,
  };

  const {
    data: transactionsData,
    loading: loadingLatest,
    refetch: refetchLatest,
  } = useQuery<GetLatestTransactionsData>(GET_LATEST_TRANSACTIONS, {
    variables: {
      limit: 5,
    },
    fetchPolicy: "network-only",
  });

  const latestTransactions =
    transactionsData?.getLatestTransactionsOutput ?? [];

  const {
    data: topCategoriesData,
    loading: loadingTop,
    refetch: refetchTop,
  } = useQuery<GetTopCategoriesData>(GET_TOP_CATEGORIES, {
    variables: {
      limit: 5,
    },
    fetchPolicy: "network-only",
  });

  const topCategories = topCategoriesData?.getTopCategories ?? [];

  const handleSaveSuccess = () => {
    refetchLatest();
    refetchTop();
  };

  const isLoadingGlobal = loadingSummary || loadingLatest || loadingTop;

  return (
    <Page>
      {isLoadingGlobal ? (
        <LoadingState heightClass="h-[400px]" />
      ) : (
        <>
          <div className="flex gap-6">
            <CardWithTotal
              title="Saldo Total"
              icon={Wallet}
              color="text-purple-base"
              total={summary.totalBalance}
              loading={loadingSummary}
              className="flex-1"
            />
            <CardWithTotal
              title="Receitas do Mês"
              icon={CircleArrowUp}
              color="text-brand-base"
              total={summary.monthIncomes}
              loading={loadingSummary}
              className="flex-1"
            />
            <CardWithTotal
              title="Despesas do Mês"
              icon={CircleArrowDown}
              color="text-red-base"
              total={summary.monthExpenses}
              loading={loadingSummary}
              className="flex-1"
            />
          </div>

          <div className="flex gap-6 mt-6">
            <Card className="px-2 py-8 flex-2">
              <CardHeader className="border-b border-gray-500">
                <CardTitle className="flex justify-between">
                  <span className="text-sm uppercase text-gray-500">
                    TRANSAÇÕES RECENTES
                  </span>
                  <NavLink
                    to="/transactions"
                    className="text-base text-brand-base hover:underline flex"
                  >
                    Ver todas <ChevronRight />
                  </NavLink>
                </CardTitle>
              </CardHeader>
              <CardContent className="-mt-4">
                {latestTransactions.length === 0 ? (
                  <p className="text-sm text-gray-400 italic text-center py-6">
                    Nenhuma movimentação neste período.
                  </p>
                ) : (
                  <>
                    {latestTransactions.map((transaction) => {
                      return (
                        <TransactionItem
                          key={transaction.id}
                          color={transaction.category.color as CategoryColor}
                          icon={transaction.category.icon}
                          title={transaction.description}
                          type={transaction.type}
                          date={new Date(transaction.date)}
                          category={transaction.category.name}
                          value={transaction.amount}
                        />
                      );
                    })}
                    <div className="text-center mt-6">
                      <Button
                        variant="link"
                        onClick={createTransactionDialogHandler}
                        className="font-medium text-brand-base transition-colors hover:underline cursor-pointer"
                      >
                        <Plus className="inline" /> Nova Transação
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="py-8 flex-1">
              <CardHeader className="border-b border-gray-500">
                <CardTitle className="flex justify-between">
                  <span className="text-sm uppercase text-gray-500">
                    CATEGORIAS
                  </span>
                  <NavLink
                    to="/categories"
                    className="text-base flex text-brand-base hover:underline"
                  >
                    Gerenciar <ChevronRight />
                  </NavLink>
                </CardTitle>
              </CardHeader>
              <CardContent className="-mt-4">
                {topCategories.length === 0 ? (
                  <p className="text-sm text-gray-400 italic text-center py-6">
                    Nenhuma categoria com movimentação neste período.
                  </p>
                ) : (
                  topCategories.map((category) => (
                    <CategoryItem
                      key={category.id}
                      color={category.color as CategoryColor}
                      name={category.name}
                      count={category.transactionCount}
                      amount={category.totalAmount}
                    />
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </>
      )}

      <TransactionDialog
        open={openCreateTransactionDialog}
        onOpenChange={setOpenCreateTransactionDialog}
        onSuccess={handleSaveSuccess}
      />
    </Page>
  );
}
