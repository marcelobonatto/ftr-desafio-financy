import { BadgeText } from "@/components/BadgeText";
import { formatCurrency } from "@/utils";
import type { CategoryColor } from "@/types";

interface CategoryItemProps {
  color: CategoryColor;
  name: string;
  count: number;
  amount: number;
}

export function CategoryItem({
  color,
  name,
  count,
  amount,
}: CategoryItemProps) {
  return (
    <div className="grid grid-cols-[1fr_90px_110px] items-center py-4 hover:bg-gray-50/50 transition-colors px-4 -mx-4 rounded-md">
      <div className="flex items-center">
        <BadgeText color={color} text={name} />
      </div>

      <div className="text-right">
        <span className="text-xs text-gray-500 font-normal">
          {count} {count === 1 ? "item" : "itens"}
        </span>
      </div>

      <div className="text-right">
        <span className="font-bold text-gray-800 text-sm">
          {formatCurrency(amount)}
        </span>
      </div>
    </div>
  );
}
