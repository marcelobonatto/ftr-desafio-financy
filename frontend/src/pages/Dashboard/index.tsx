import { Page } from "@/components/Page";
import * as LucideIcons from "lucide-react";
import { ChevronRight, CircleArrowDown, CircleArrowUp, Plus, Tag, Wallet } from "lucide-react";
import { CardWithTotal } from "./components/CardWithTotal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NavLink } from "react-router-dom";
import { TransactionItem } from "./components/TransactionItem";
import { CategoryItem } from "./components/CategoryItem";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TransactionDialog } from "@/components/TransactionDialog";
import { GET_LATEST_TRANSACTIONS, GET_TRANSACTIONS_SUMMARY } from "@/lib/graphql/queries/Transactions";
import { useQuery } from "@apollo/client/react";
import type { CategoryColor, TransactionDataType } from "@/types";

interface GetLatestTransactionsData {
  getLatestTransactionsOutput: TransactionDataType[];
}

interface GetTransactionSummaryData {
  getTransactionsSummary: {
    totalBalance: number,
    monthIncomes: number,
    monthExpenses: number
  };
}

export function DashboardPage() {

  const [openCreateTransactionDialog, setOpenCreateTransactionDialog] = useState(false);

  const createTransactionDialogHandler = () => {
    setOpenCreateTransactionDialog(true);
  }

  const [period, setPeriod] = useState(() => new Date().toISOString().slice(0, 7));

  const month = parseInt(period.split("-")[1]);
  const year = parseInt(period.split("-")[0]);

  const { data: summaryData, loading: summaryLoading } = useQuery<GetTransactionSummaryData>(GET_TRANSACTIONS_SUMMARY, {
    variables: {
      input: { month, year }
    },
    fetchPolicy: "network-only"
  });

  const summary = summaryData?.getTransactionsSummary || {
    totalBalance: 0,
    monthIncomes: 0,
    monthExpenses: 0
  };

  const { data: transactionsData } = useQuery<GetLatestTransactionsData>(GET_LATEST_TRANSACTIONS, {
    variables: {
      limit: 5
    },
    fetchPolicy: "network-only"
  });

  const latestTransactions = transactionsData?.getLatestTransactionsOutput ?? [];

  return (
    <Page>
      <div className="flex gap-6">
        <CardWithTotal title="Saldo Total" icon={Wallet} color="text-purple-base" 
                       total={summary.totalBalance} loading={summaryLoading} className="flex-1" />
        <CardWithTotal title="Receitas do Mês" icon={CircleArrowUp} color="text-brand-base" 
                       total={summary.monthIncomes} loading={summaryLoading} className="flex-1" />
        <CardWithTotal title="Despesas do Mês" icon={CircleArrowDown} color="text-red-base" 
                       total={summary.monthExpenses} loading={summaryLoading} className="flex-1" />
      </div>

      <div className="flex gap-6 mt-6">
        <Card className="px-2 py-8 flex-2">
          <CardHeader className="border-b border-gray-500">
            <CardTitle className="flex justify-between">
              <span className="text-sm uppercase text-gray-500">
                TRANSAÇÕES RECENTES
              </span>
              <NavLink to="/transactions" className="text-base text-brand-base hover:underline flex">
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
              <Button variant="link" onClick={createTransactionDialogHandler} className="font-medium text-brand-base transition-colors hover:underline cursor-pointer">
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
              <span className="text-sm uppercase text-gray-500">CATEGORIAS</span>
              <NavLink to="/transactions" className="text-base flex text-brand-base hover:underline">Gerenciar <ChevronRight /></NavLink>
            </CardTitle>
          </CardHeader>
          <CardContent className="-mt-4">
            <CategoryItem color="blue" name="Alimentação" count={12} amount={542.3} />
            <CategoryItem color="purple" name="Transporte" count={8} amount={385.5} />
            <CategoryItem color="orange" name="Mercado" count={3} amount={298.75} />
            <CategoryItem color="pink" name="Entretenimento" count={2} amount={186.2} />
            <CategoryItem color="yellow" name="Utilidades" count={7} amount={245.8} />
          </CardContent>
        </Card>
      </div>

      <TransactionDialog open={openCreateTransactionDialog} onOpenChange={setOpenCreateTransactionDialog} />
    </Page>
  );
}