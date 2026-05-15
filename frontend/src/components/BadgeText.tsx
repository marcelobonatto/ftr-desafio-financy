import { colorVariants } from "@/constants/colors";

interface BadgeTextProps {
    color: 'blue' | 'purple' | 'pink' | 'red' | 'orange' | 'yellow' | 'green';
    text: string;
}

export function BadgeText({ color, text }: BadgeTextProps) {
    const selectedColorClass = colorVariants[color];

    return (
        <span className={`inline-flex items-center rounded-full ${selectedColorClass} px-2 py-1 text-xs font-medium tracking-wider whitespace-nowrap`}>
            {text}
        </span>
    );
}