import { Page } from "@/components/Page";
import { BriefcaseBusiness, CarFront, ChevronRight, CircleArrowDown, CircleArrowUp, PiggyBank, Plus, ShoppingCart, Utensils, Wallet } from "lucide-react";
import { CardWithTotal } from "./components/CardWithTotal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NavLink } from "react-router-dom";
import { TransactionItem } from "./components/TransactionItem";
import { CategoryItem } from "./components/CategoryItem";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TransactionDialog } from "@/components/TransactionDialog";

export function DashboardPage() {

  const [openCreateTransactionDialog, setOpenCreateTransactionDialog] = useState(false);

  const createTransactionDialogHandler = () => {
    setOpenCreateTransactionDialog(true);
  }

  return (
    <Page>
      <div className="flex gap-6">
        <CardWithTotal title="Saldo Total" icon={Wallet} color="text-purple-base" total={12847.32} className="flex-1" />
        <CardWithTotal title="Receitas do Mês" icon={CircleArrowUp} color="text-brand-base" total={4250} className="flex-1" />
        <CardWithTotal title="Despesas do Mês" icon={CircleArrowDown} color="text-red-base" total={2180.45} className="flex-1" />
      </div>
      <div className="flex gap-6 mt-6">
        <Card className="px-2 py-8 flex-2">
          <CardHeader className="border-b border-gray-500">
            <CardTitle className="flex justify-between">
              <span className="text-sm uppercase text-gray-500">TRANSAÇÕES RECENTES</span>
              <NavLink to="/transactions" className="text-base text-brand-base hover:underline flex">Ver todas <ChevronRight /></NavLink>
            </CardTitle>
          </CardHeader>
          <CardContent className="-mt-4">
            <TransactionItem color="green" icon={BriefcaseBusiness} title="Pagamento de Salário" date="01/12/25" category="Receita" value={4250} />
            <TransactionItem color="blue" icon={Utensils} title="Jantar no Restaurante" date="30/11/25" category="Alimentação" value={-89.5} />
            <TransactionItem color="purple" icon={CarFront} title="Posto de Gasolina" date="29/11/25" category="Transporte" value={-100} />
            <TransactionItem color="orange" icon={ShoppingCart} title="Compras no Mercado" date="28/11/25" category="Compras" value={-156.8} />
            <TransactionItem color="green" icon={PiggyBank} title="Retorno de Investimento" date="26/11/25" category="Receita" value={340.25} />
            <div className="text-center mt-6">
              <Button variant="link" onClick={createTransactionDialogHandler} className="font-medium text-brand-base transition-colors hover:underline cursor-pointer">
                <Plus className="inline" /> Nova Transação
              </Button>
            </div>
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