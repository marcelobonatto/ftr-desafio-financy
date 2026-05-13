import { Page } from "@/components/Page";
import { ChevronRight, CircleArrowDown, CircleArrowUp, Wallet } from "lucide-react";
import { CardWithTotal } from "./components/CardWithTotal";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { NavLink } from "react-router-dom";

export function DashboardPage() {
  return (
    <Page>
      <div className="flex gap-6">
        <CardWithTotal title="Saldo Total" icon={Wallet} color="text-purple-base" total={12847.32} className="flex-1" />
        <CardWithTotal title="Receitas do Mês" icon={CircleArrowUp} color="text-brand-base" total={4250} className="flex-1" />
        <CardWithTotal title="Despesas do Mês" icon={CircleArrowDown} color="text-red-base" total={2180.45} className="flex-1" />
      </div>
      <div className="flex gap-6 mt-6">
        <Card className="px-2 py-8 flex-2">
          <CardHeader>
            <CardTitle className="flex justify-between">
              <span className="text-sm uppercase text-gray-500">TRANSAÇÕES RECENTES</span>
              <NavLink to="/transactions" className="text-base flex">Ver todas <ChevronRight /></NavLink>
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="py-8 flex-1">
          <CardHeader>
            <CardTitle className="flex justify-between">
              <span className="text-sm uppercase text-gray-500">CATEGORIAS</span>
              <NavLink to="/transactions" className="text-base flex">Gerenciar <ChevronRight /></NavLink>
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    </Page>
  );
}