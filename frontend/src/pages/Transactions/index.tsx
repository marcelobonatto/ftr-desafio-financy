import { PageHeader } from "@/components/PageHeader";
import { Page } from "@/components/Page";
import { useState } from "react";
import { TransactionFilters } from "./components/TransactionFilters";
import { TransactionsTable } from "./components/TransactionsTable";
import { TransactionDialog } from "@/components/TransactionDialog";

export function TransactionsPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleCreateTransaction = () => {
    setShowCreateDialog(true);
    setSelectedTransaction(null);
  }

  const handleEditTransaction = (transaction) => {
    setShowCreateDialog(true);
    setSelectedTransaction(transaction);
  }

  return (
    <Page>
      <PageHeader
        title="Transações"
        description="Gerencie todas as suas transações financeiras"
        buttonLabel="Nova transação"
        onButtonClick={handleCreateTransaction}
      />

      <TransactionFilters className="mt-4" />
      <TransactionsTable className="mt-4" />
      <TransactionDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </Page>
  );
}