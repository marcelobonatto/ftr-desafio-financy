import { formatCurrency } from "@/utils";
import { BadgeIcon } from "@/components/BadgeIcon";
import { CircleArrowDown, CircleArrowUp, type LucideIcon } from "lucide-react";
import { BadgeText } from "@/components/BadgeText";

interface TransactionItemProps {
    color: 'blue' | 'purple' | 'pink' | 'red' | 'orange' | 'yellow' | 'green';
    icon: LucideIcon;
    title: string;
    date: string;
    category: string;
    value: number;
}

export function TransactionItem({ color, icon: Icon, title, date, category, value }: TransactionItemProps) {

    const isNegative = value < 0;
    const formattedValue = (isNegative ? '- ' : '+ ') + formatCurrency(Math.abs(value));

    return (
        <div className="flex items-center justify-between py-4 border-b border-gray-500 hover:bg-gray-50/50 transition-colors px-4 -mx-4">
            <div className="flex items-center gap-4 flex-1">
                <BadgeIcon icon={Icon} color={color} />

                <div className="flex flex-col min-w-0 overflow-hidden flex-1">
                    <span className="font-bold text-gray-800 text-sm truncate">{title}</span>
                    <span className="text-xs text-gray-500">{date}</span>
                </div>

                <div className="flex items-center w-1/2">
                    <div className="w-1/2 flex justify-center px-2">
                        <BadgeText color={color} text={category} />
                    </div>

                    <div className="w-1/2 flex justify-end items-center gap-2">
                        <span className="font-bold whitespace-nowrap">{formattedValue}</span>
                        {isNegative ?
                            <CircleArrowDown className="text-red-base shrink-0" size={18} />
                            : <CircleArrowUp className="text-green-base shrink-0" size={18} />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}