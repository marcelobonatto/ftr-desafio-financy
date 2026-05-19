import { BadgeIcon } from "@/components/BadgeIcon";
import { BadgeText } from "@/components/BadgeText";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { CategoryColor } from "@/types";
import { SquarePen, Trash2 } from "lucide-react";
import * as Icons from "lucide-react";

interface CategoryCardProps {
    name: string;
    description: string;
    count: number;
    color: CategoryColor;
    icon?: Icons.LucideIcon;
    iconName?: string;
    className?: string;
    onEdit: () => void;
    onDelete: () => void;
}

export function CategoryCard({ name, description, count, color, icon: Icon, iconName, className, onEdit, onDelete }: CategoryCardProps) {
    const IconComponent = Icon || (Icons as any)[iconName] || Icons.Tag;

    return (
        <Card className={className}>
            <CardHeader className="flex items-center justify-between w-full h-10">
                <div className="h-10 w-10 flex items-center justify-center">
                    <BadgeIcon icon={IconComponent} color={color} />
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="outline" size="icon" onClick={onDelete}>
                        <Trash2 size={16} color="red" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={onEdit}>
                        <SquarePen size={16} />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col align-top gap-1">
                <h3 className="font-semibold text-base text-gray-800 leading-tight">
                    {name}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2 leading-normal">
                    {description}
                </p>
            </CardContent>
            <CardFooter className="flex items-center justify-between w-full pt-2 border-t border-gray-50">
                <BadgeText color={color} text={name} />
                <span className="text-xs text-gray-600 font-normal">
                    {count} {count === 1 ? 'item' : 'itens'}
                </span>
            </CardFooter>
        </Card>
    )
}