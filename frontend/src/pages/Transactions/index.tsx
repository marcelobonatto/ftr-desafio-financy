import { PageHeader } from "@/components/PageHeader";
import { Page } from "@/components/Page";
import { useState } from "react";
import { TransactionFilters } from "./components/TransactionFilters";
import { TransactionsTable } from "./components/TransactionsTable";
import { TransactionDialog } from "@/components/TransactionDialog";
import { useQuery } from "@apollo/client/react";
import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/Transactions";
import type { TransactionsListData } from "@/types";
import { LoadingState } from "@/components/LoadingState";
import { EmptyState } from "@/components/EmptyState";

export function TransactionsPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [type, setType] = useState("all");
  const [period, setPeriod] = useState("2026-05");
  const [page, setPage] = useState(1);

  const { data: listData, loading, error, refetch } = useQuery<TransactionsListData>(LIST_TRANSACTIONS, {
    variables: {
      input: {
        page,
        limit: 10,
        search: search.trim() || null,
        type: type === "all" ? null : type,
        categoryId: categoryId === "all" ? null : categoryId,
        period
      },
    },
    fetchPolicy: "network-only"
  });

  const transactionsResponse = listData?.listTransactions;
  const transactions = transactionsResponse?.items || [];
  const totalCount = transactionsResponse?.totalCount || 0;

  const handleCreateTransaction = () => {
    setShowCreateDialog(true);
    setSelectedTransaction(null);
  }

  const handleEditTransaction = (transaction) => {
    setShowCreateDialog(true);
    setSelectedTransaction(transaction);
  }

  if (loading) {
    return (
      <Page>
        <LoadingState heightClass="h-[400px]" />
      </Page>
    );
  }

  return (
    <Page>
      <PageHeader
        title="Transações"
        description="Gerencie todas as suas transações financeiras"
        buttonLabel="Nova transação"
        onButtonClick={handleCreateTransaction}
      />

      <TransactionFilters className="mt-4"
        search={search} onSearchChange={setSearch}
        categoryId={categoryId} onCategoryChange={setCategoryId}
        type={type} onTypeChange={setType}
        period={period} onPeriodChange={setPeriod} />

      {
        transactions.length === 0 ? (
          <EmptyState
            message="Nenhuma transação encontrada para o período selecionado. Clique em 'Nova transação' para começar a registrar suas finanças!"
            className="mt-4"
          />
        ) : (
          <TransactionsTable transactions={transactions} totalCount={totalCount}
            currentPage={page} onPageChange={setPage} limit={10}
            className="mt-4" />
        )
      }

      <TransactionDialog open={showCreateDialog} onOpenChange={setShowCreateDialog}
        onSaveSuccess={refetch} />
    </Page>
  );
}