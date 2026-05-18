import { PageHeader } from "@/components/PageHeader";
import { Page } from "@/components/Page";
import { useState } from "react";
import { TransactionFilters } from "./components/TransactionFilters";
import { TransactionsTable } from "./components/TransactionsTable";

export function TransactionsPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  return (
    <Page>
      <PageHeader
        title="Transações"
        description="Gerencie todas as suas transações financeiras"
        buttonLabel="Nova transação"
        onButtonClick={() => setShowCreateDialog(true)}
      />

      <TransactionFilters className="mt-4" />
      <TransactionsTable className="mt-4" />
    </Page>
  );
}