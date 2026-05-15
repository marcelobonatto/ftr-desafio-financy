import { colorVariants } from "@/constants/colors";
import type { LucideIcon } from "lucide-react";

interface BadgeIconProps {
    color: 'blue' | 'purple' | 'pink' | 'red' | 'orange' | 'yellow' | 'green';
    icon: LucideIcon;
}

export function BadgeIcon({ color, icon: Icon }: BadgeIconProps) {
    const selectedColorClass = colorVariants[color];

    return (
        <div className={`${selectedColorClass} h-10 w-10 rounded-md shrink-0 flex items-center justify-center`}>
            <Icon size={16} />
        </div>
    );
}