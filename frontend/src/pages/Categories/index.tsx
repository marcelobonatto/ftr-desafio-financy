import { PageHeader } from "@/components/PageHeader";
import { Page } from "@/components/Page";
import { useState } from "react";
import { ArrowUpDown, Tag } from "lucide-react";
import { CategoryStatCard } from "@/pages/Categories/components/CategoryStatCard";
import { CategoryCard } from "./components/CategoryCard";
import { CategoryDialog } from "./components/CategoryDialog";
import { useQuery } from "@apollo/client/react";
import {
  LIST_CATEGORIES,
  GET_CATEGORY_STATISTICS,
} from "@/lib/graphql/queries/Categories";
import type { CategoryColor, CategoryItem, CategoryStatsData, CategoriesListData } from "@/types";
import { CategoryDialogDelete } from "./components/CategoryDialogDelete";
import { EmptyState } from "@/components/EmptyState";
import { LoadingState } from "@/components/LoadingState";

export function CategoriesPage() {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(
    null,
  );

  const { data: statsData, loading: statsLoading } =
    useQuery<CategoryStatsData>(GET_CATEGORY_STATISTICS);
  const {
    data: listData,
    loading: listLoading,
    refetch: refetchList,
  } = useQuery<CategoriesListData>(LIST_CATEGORIES);

  const handleCreateCategory = () => {
    setSelectedCategory(null);
    setShowEditDialog(true);
  };

  const handleEditCategory = (category: CategoryItem) => {
    setSelectedCategory(category);
    setShowEditDialog(true);
  };

  const handleDeleteCategory = (category: CategoryItem) => {
    setSelectedCategory(category);
    setShowDeleteDialog(true);
  };

  if (statsLoading || listLoading) {
    return (
      <Page>
        <LoadingState heightClass="h-[400px]" />
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
          value={stats?.mostUsedCategoryName || ''}
          description="Categoria mais utilizada"
          color={`text-${stats?.mostUsedCategoryColor}-base`}
          className="flex-1"
        />
      </div>

      {categoriesList.length === 0 ? (
        <EmptyState
          message="Nenhuma categoria cadastrada ainda. Clique em 'Nova categoria' para começar!"
          className="mt-4"
        />
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
              onDelete={() => handleDeleteCategory(category)}
            />
          ))}
        </div>
      )}

      <CategoryDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        categoryToEdit={selectedCategory}
        onSuccess={refetchList}
      />

      <CategoryDialogDelete
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        category={selectedCategory}
      />
    </Page>
  );
}
