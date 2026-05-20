import { COLOR_VARIANTS } from "@/constants/colors";
import * as Icons from "lucide-react";
import type { CategoryColor } from "@/types";

interface BadgeIconProps {
    color: CategoryColor;
    iconName?: string;
    icon?: Icons.LucideIcon;
}

export function BadgeIcon({ color, iconName, icon: Icon }: BadgeIconProps) {

    const selectedColorClass = COLOR_VARIANTS[color];
    const IconComponent = Icon || (Icons as any)[iconName] || Icons.Tag;

    return (
        <div className={`${selectedColorClass} h-10 w-10 rounded-md shrink-0 flex items-center justify-center`}>
            <IconComponent size={16} />
        </div>
    );
}