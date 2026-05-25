import { PageHeader } from "@/components/PageHeader";
import { Page } from "@/components/Page";
import { useEffect, useState } from "react";
import { TransactionFilters } from "./components/TransactionFilters";
import { TransactionsTable } from "./components/TransactionsTable";
import { TransactionDialog } from "@/components/TransactionDialog";
import { useMutation, useQuery } from "@apollo/client/react";
import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/Transactions";
import type { TransactionDataType, TransactionsListData } from "@/types";
import { LoadingState } from "@/components/LoadingState";
import { EmptyState } from "@/components/EmptyState";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { DELETE_TRANSACTION } from "@/lib/graphql/mutations/Transactions";

export function TransactionsPage() {
  const LIMIT = 10;

  // Estados dos diálogos
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Estado da transação selecionada para edição ou exclusão
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionDataType | null>(null);

  // Estados dos filtros de busca
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [type, setType] = useState("all");
  const [period, setPeriod] = useState(new Date().toISOString().slice(0, 7));

  // Estado da página atual
  const [page, setPage] = useState(1);

  // Executa a query para listar as transações
  const { data: listData, loading, refetch } = useQuery<TransactionsListData>(LIST_TRANSACTIONS, {
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

  // Executa a mutation para deletar uma transação
  const [deleteTransaction, { loading: isDeleting }] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: ["ListTransactions"],
    onCompleted: () => setShowDeleteDialog(false),
  });

  // Extrai os dados da lista de transações
  const transactionsResponse = listData?.listTransactions;

  // Transações
  const transactions = transactionsResponse?.items || [];

  // Total de transações
  const totalCount = transactionsResponse?.totalCount || 0;

  // Criar o evento de nova transação
  const handleCreateTransaction = () => {
    setSelectedTransaction(null);
    setShowEditDialog(true);
  };

  // Criar o evento de edição de transação
  const handleEditTransaction = (transaction: TransactionDataType) => {
    setSelectedTransaction(transaction);
    setShowEditDialog(true);
  };

  // Criar o evento de exclusão de transação
  const handleDeleteTransaction = (transaction: TransactionDataType) => {
    setSelectedTransaction(transaction);
    setShowDeleteDialog(true);
  };

  // Criar o evento de confirmação de exclusão de transação
  const handleDeleteConfirm = async () => {
    if (!selectedTransaction) return;
    await deleteTransaction({ variables: { id: selectedTransaction.id } });
  };

  useEffect(() => {
    // Debounce para evitar requisições desnecessárias na digitação do texto da busca
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  // Exibe o loading enquanto carrega as transações
  if (loading) {
    return (
      <Page>
        <LoadingState heightClass="h-[400px]" />
      </Page>
    );
  }

  return (
    <Page>
      {/* Cabeçalho da página */}
      <PageHeader
        title="Transações"
        description="Gerencie todas as suas transações financeiras"
        buttonLabel="Nova transação"
        onButtonClick={handleCreateTransaction}
      />

      {/* Filtros de transações */}
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

      {/* Tabela de transações */}
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

      {/* Diálogo de edição de transação */}
      <TransactionDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        transactionToEdit={selectedTransaction}
        onSuccess={refetch}
      />

      {/* Diálogo de exclusão de transação */}
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
