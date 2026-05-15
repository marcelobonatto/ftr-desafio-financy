import { BadgeText } from "@/components/BadgeText";
import { formatCurrency } from "@/utils";

interface CategoryItemProps {
    color: 'blue' | 'purple' | 'pink' | 'red' | 'orange' | 'yellow' | 'green';
    name: string;
    count: number;
    amount: number;
}

export function CategoryItem({ color, name, count, amount }: CategoryItemProps) {

    return (
        <div className="flex items-center justify-between py-4 hover:bg-gray-50/50 transition-colors px-4 -mx-4">
            <div className="flex items-center">
                <BadgeText color={color} text={name} />
            </div>

            <div className="flex items-center gap-6">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">{count} {count === 1 ? 'item' : 'itens'}</span>
                </div>

                <div className="flex flex-col">
                    <span className="font-bold text-gray-800">{formatCurrency(amount)}</span>
                </div>
            </div>
        </div>
    );
}