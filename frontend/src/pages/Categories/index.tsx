import { PageHeader } from "@/components/PageHeader";
import { Page } from "@/components/Page";
import { useState } from "react";
import { ArrowUpDown, Loader2, Tag } from "lucide-react";
import { CategoryStatCard } from "@/pages/Categories/components/CategoryStatCard";
import { CategoryCard } from "./components/CategoryCard";
import { CategoryDialog } from "./components/CategoryDialog";
import { useQuery } from "@apollo/client/react";
import { GET_CATEGORIES, GET_CATEGORY_STATISTICS } from "@/lib/graphql/queries/Categories";
import type { CategoryColor } from "@/types";
import { toast } from "sonner";

interface CategoryStatsData {
  getCategoryStatistics: {
    totalCategories: number;
    totalTransactions: number;
    mostUsedCategoryName: string;
    mostUsedCategoryIcon: string;
    mostUsedCategoryColor: string;
  };
}

interface CategoryItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  transactionCount: number;
}

interface CategoriesListData {
  listCategories: {
    categories: CategoryItem[];
  }
}

export function CategoriesPage() {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);

  const { data: statsData, loading: statsLoading } = useQuery<CategoryStatsData>(GET_CATEGORY_STATISTICS);
  const { data: listData, loading: listLoading, refetch: refetchList } = useQuery<CategoriesListData>(GET_CATEGORIES);

  const handleCreateCategory = () => {
    setSelectedCategory(null);
    setShowDialog(true);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setShowDialog(true);
  };

  if (statsLoading || listLoading) {
    return (
      <Page>
        <div className="w-full h-[400px] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-brand-base" />
        </div>
      </Page>
    );
  }

  const stats = statsData?.getCategoryStatistics;
  const categoriesList = listData?.listCategories ?? [];

  return (
    <Page>
      <PageHeader
        title="Categorias"
        description="Organize suas transações por categorias"
        buttonLabel="Nova categoria"
        onButtonClick={handleCreateCategory}
      />

      <div className="flex gap-6 mt-6">
        <CategoryStatCard
          icon={Tag}
          value={stats?.totalCategories ?? 0}
          description="Total de categorias"
          color="text-gray-700"
          className="flex-1"
        />
        <CategoryStatCard
          icon={ArrowUpDown}
          value={stats?.totalTransactions ?? 0}
          description="Total de transações"
          color="text-purple-base"
          className="flex-1"
        />
        <CategoryStatCard
          iconName={stats?.mostUsedCategoryIcon}
          value={stats?.mostUsedCategoryName}
          description="Categoria mais utilizada"
          color={`text-${stats?.mostUsedCategoryColor}-base`}
          className="flex-1"
        />
      </div>

      {categoriesList.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200 mt-4">
          <p className="text-gray-400 italic">Nenhuma categoria cadastrada ainda. Clique em "Nova categoria" para começar!</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-6 pt-4">
          {categoriesList.map((category) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              description={category.description}
              count={category.transactionCount}
              color={category.color as CategoryColor}
              iconName={category.icon}
              onEdit={() => handleEditCategory(category)}
              onDelete={() => toast.error(`Deletar ${category.name} (Próximo passo)`)}
            />
          ))}
        </div>
      )}

      <CategoryDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        categoryToEdit={selectedCategory}
        onSuccess={refetchList}
      />
    </Page>
  );
}