import { PageHeader } from "@/components/PageHeader";
import { Page } from "@/components/Page";
import { useState } from "react";

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
    </Page>
  );
}