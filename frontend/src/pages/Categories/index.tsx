import { PageHeader } from "@/components/PageHeader";
import { Page } from "@/components/Page";
import { useState } from "react";
import { ArrowUpDown, BriefcaseBusiness, CarFront, HeartPulse, PiggyBank, ShoppingCart, Tag, Ticket, ToolCase, Utensils } from "lucide-react";
import { CategoryStatCard } from "@/pages/Categories/components/CategoryStatCard";
import { CategoryCard } from "./components/CategoryCard";

export function CategoriesPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  return (
    <Page>
      <PageHeader
        title="Categorias"
        description="Organize suas transações por categorias"
        buttonLabel="Nova categoria"
        onButtonClick={() => setShowCreateDialog(true)}
      />

      {/* <CreateCategoryDialog
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
      /> */}

      <div className="flex gap-6 mt-6">
        <CategoryStatCard
          icon={Tag}
          value="8"
          description="Total de categorias"
          color="text-gray-700"
          className="flex-1"
        />
        <CategoryStatCard
          icon={ArrowUpDown}
          value="27"
          description="Total de transações"
          color="text-purple-base"
          className="flex-1"
        />
        <CategoryStatCard
          icon={Utensils}
          value="Alimentação"
          description="Categoria mais utilizada"
          color="text-blue-base"
          className="flex-1"
        />
      </div>

      <div className="grid grid-cols-4 gap-4 mt-6">
        <CategoryCard
          name="Alimentação"
          description="Restaurantes, delivery e refeições"
          count={10}
          color="blue"
          icon={Utensils}
          onEdit={() => { }}
          onDelete={() => { }}
        />
        <CategoryCard
          name="Entretenimento"
          description="Cinema, jogos e lazer"
          count={2}
          color="pink"
          icon={Ticket}
          onEdit={() => { }}
          onDelete={() => { }}
        />
        <CategoryCard
          name="Investimento"
          description="Aplicações e retornos financeiros"
          count={1}
          color="green"
          icon={PiggyBank}
          onEdit={() => { }}
          onDelete={() => { }}
        />
        <CategoryCard
          name="Mercado"
          description="Compras de supermercados e mantimentos"
          count={3}
          color="orange"
          icon={ShoppingCart}
          onEdit={() => { }}
          onDelete={() => { }}
        />
        <CategoryCard
          name="Salário"
          description="Renda mensal e bonificações"
          count={3}
          color="green"
          icon={BriefcaseBusiness}
          onEdit={() => { }}
          onDelete={() => { }}
        />
        <CategoryCard
          name="Saúde"
          description="Medicamentos, consultas e exames"
          count={0}
          color="red"
          icon={HeartPulse}
          onEdit={() => { }}
          onDelete={() => { }}
        />
        <CategoryCard
          name="Transporte"
          description="Gasolina, transporte público e viagens"
          count={8}
          color="purple"
          icon={CarFront}
          onEdit={() => { }}
          onDelete={() => { }}
        />
        <CategoryCard
          name="Utilidades"
          description="Energia, água, internet e telefone"
          count={7}
          color="yellow"
          icon={ToolCase}
          onEdit={() => { }}
          onDelete={() => { }}
        />
      </div>
    </Page>
  );
}