import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import * as Icons from "lucide-react";

interface CategoryStatCardProps {
    icon?: Icons.LucideIcon;
    iconName?: string;
    value: string | number;
    description: string;
    color?: string;
    className?: string;
}

export function CategoryStatCard({ icon: Icon, iconName, value, description, color = 'text-primary', className }: CategoryStatCardProps) {

    const iconFromName = iconName
        ? (Icons as unknown as Record<string, Icons.LucideIcon | undefined>)[
              iconName
          ]
        : undefined;
    const IconComponent = Icon || iconFromName || Icons.Tag;

    return (
        <Card className={`px-4 py-8 ${className || ''}`}>
            <CardHeader>
                <CardTitle className="flex items-center gap-4">
                    <IconComponent className={color} size={20} />
                    <span className="font-bold text-2xl text-black">{value}</span>
                </CardTitle>
                <CardDescription className="ml-9">
                    <span className="text-sm uppercase text-gray-500">{description}</span>
                </CardDescription>
            </CardHeader>
        </Card>
    );
}