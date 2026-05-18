import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface CategoryStatCardProps {
    icon: LucideIcon;
    value: string | number;
    description: string;
    color?: string;
    className?: string;
}

export function CategoryStatCard({ icon: Icon, value, description, color = 'text-primary', className }: CategoryStatCardProps) {
    return (
        <Card className={`px-4 py-8 ${className || ''}`}>
            <CardHeader>
                <CardTitle className="flex items-center gap-4">
                    <Icon className={color} size={20} />
                    <span className="font-bold text-2xl text-black">{value}</span>
                </CardTitle>
                <CardDescription className="ml-9">
                    <span className="text-sm uppercase text-gray-500">{description}</span>
                </CardDescription>
            </CardHeader>
        </Card>
    );
}