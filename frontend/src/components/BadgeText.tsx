import { COLOR_VARIANTS } from "@/constants/colors";
import type { CategoryColor } from "@/types";

interface BadgeTextProps {
    color: CategoryColor;
    text: string;
}

export function BadgeText({ color, text }: BadgeTextProps) {
    const selectedColorClass = COLOR_VARIANTS[color];

    return (
        <span className={`inline-flex items-center rounded-full ${selectedColorClass} px-2 py-1 text-xs font-medium tracking-wider whitespace-nowrap`}>
            {text}
        </span>
    );
}