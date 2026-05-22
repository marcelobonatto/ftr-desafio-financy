import { PeriodPicker } from "@/components/PeriodPicker";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Categories";
import type { CategoriesListData } from "@/types";
import { useQuery } from "@apollo/client/react";
import { Loader2, Search } from "lucide-react";

interface TransactionFiltersProps {
  className?: string;
  search: string;
  categoryId: string;
  type: string;
  period: string;
  onSearchChange: (search: string) => void;
  onCategoryChange: (categoryId: string) => void;
  onTypeChange: (type: string) => void;
  onPeriodChange: (period: string) => void;
}

export function TransactionFilters({
  className,
  search,
  onSearchChange,
  categoryId,
  onCategoryChange,
  type,
  onTypeChange,
  period,
  onPeriodChange,
}: TransactionFiltersProps) {
  const { data: categoriesData, loading: categoriesLoading } =
    useQuery<CategoriesListData>(LIST_CATEGORIES);
  const categories = categoriesData?.listCategories || [];

  return (
    <div
      className={`grid grid-cols-4 gap-6 bg-white p-6 rounded-xl border border-gray-200 w-full mx-auto ${className}`}
    >
      <div className="space-y-2">
        <Label htmlFor="search" className="text-sm font-medium text-gray-700">
          Buscar
        </Label>
        <InputGroup>
          <InputGroupInput
            id="search"
            placeholder="Buscar por descrição"
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="search" className="text-sm font-medium text-gray-700">
          Tipo
        </Label>
        <NativeSelect
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
          className="w-full"
        >
          <NativeSelectOption value="all">Todos</NativeSelectOption>
          <NativeSelectOption value="INCOME">Entradas</NativeSelectOption>
          <NativeSelectOption value="EXPENSE">Saídas</NativeSelectOption>
        </NativeSelect>
      </div>

      <div className="space-y-2">
        <Label htmlFor="search" className="text-sm font-medium text-gray-700">
          Categoria
        </Label>
        {categoriesLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
          </>
        ) : (
          <NativeSelect
            value={categoryId}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full"
          >
            <NativeSelectOption value="all">Todas</NativeSelectOption>
            {categories.map((category) => (
              <NativeSelectOption key={category.id} value={category.id}>
                {category.name}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="search" className="text-sm font-medium text-gray-700">
          Período
        </Label>

        <PeriodPicker value={period} onChange={onPeriodChange} />
      </div>
    </div>
  );
}
