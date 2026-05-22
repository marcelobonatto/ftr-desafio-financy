import { PageHeader } from "@/components/PageHeader";
import { Page } from "@/components/Page";
import { useEffect, useState } from "react";
import { TransactionFilters } from "./components/TransactionFilters";
import { TransactionsTable } from "./components/TransactionsTable";
import { TransactionDialog } from "@/components/TransactionDialog";
import { useMutation, useQuery } from "@apollo/client/react";
import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/Transactions";
import type { TransactionsListData } from "@/types";
import { LoadingState } from "@/components/LoadingState";
import { EmptyState } from "@/components/EmptyState";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { DELETE_TRANSACTION } from "@/lib/graphql/mutations/Transactions";

export function TransactionsPage() {
  const LIMIT = 10;

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [type, setType] = useState("all");
  const [period, setPeriod] = useState(new Date().toISOString().slice(0, 7));
  const [page, setPage] = useState(1);

  const {
    data: listData,
    loading,
    refetch,
  } = useQuery<TransactionsListData>(LIST_TRANSACTIONS, {
    variables: {
      input: {
        page,
        search: debouncedSearch.trim() || null,
        type: type === "all" ? null : type,
        categoryId: categoryId === "all" ? null : categoryId,
        month: parseInt(period.split("-")[1]),
        year: parseInt(period.split("-")[0]),
      },
    },
    fetchPolicy: "network-only",
  });

  const [deleteTransaction, { loading: isDeleting }] = useMutation(
    DELETE_TRANSACTION,
    {
      refetchQueries: ["ListTransactions"],
      onCompleted: () => setShowDeleteDialog(false),
    },
  );

  const transactionsResponse = listData?.listTransactions;
  const transactions = transactionsResponse?.items || [];
  const totalCount = transactionsResponse?.totalCount || 0;

  const handleCreateTransaction = () => {
    setSelectedTransaction(null);
    setShowEditDialog(true);
  };

  const handleEditTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setShowEditDialog(true);
  };

  const handleDeleteTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedTransaction) return;
    await deleteTransaction({ variables: { id: selectedTransaction.id } });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

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

      <TransactionFilters
        className="mt-4"
        search={search}
        onSearchChange={setSearch}
        categoryId={categoryId}
        onCategoryChange={setCategoryId}
        type={type}
        onTypeChange={setType}
        period={period}
        onPeriodChange={setPeriod}
      />

      {transactions.length === 0 ? (
        <EmptyState
          message="Nenhuma transação encontrada para o período selecionado. Clique em 'Nova transação' para começar a registrar suas finanças!"
          className="mt-4"
        />
      ) : (
        <TransactionsTable
          transactions={transactions}
          totalCount={totalCount}
          currentPage={page}
          onPageChange={setPage}
          limit={LIMIT}
          onEdit={handleEditTransaction}
          onDelete={handleDeleteTransaction}
          className="mt-4"
        />
      )}

      <TransactionDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        transactionToEdit={selectedTransaction}
        onSuccess={refetch}
      />

      <ConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Remover Transação"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        description={
          <>
            Tem certeza que deseja remover a transação{" "}
            <span className="font-medium">
              {" "}
              {selectedTransaction?.description}
            </span>
            ? Esta ação não pode ser desfeita.
          </>
        }
      />
    </Page>
  );
}
