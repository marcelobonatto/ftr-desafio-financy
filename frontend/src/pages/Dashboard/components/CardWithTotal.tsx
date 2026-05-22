import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils";
import { Loader2, type LucideIcon } from "lucide-react";

interface CardWithTotalProps {
  title: string;
  icon: LucideIcon;
  color: string;
  total: number;
  className?: string;
  loading?: boolean;
}

export function CardWithTotal({ title, icon: Icon, color, total, className, loading = false }: CardWithTotalProps) {
  return (
    <Card className={`px-4 py-8 ${className || ''}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Icon className={color} size={20} /> 
            <span className="text-sm uppercase text-gray-500">{ title }</span>
        </CardTitle>
        <CardDescription className="font-bold text-3xl text-black mt-2">
            {loading ? <Loader2 size={16} /> : formatCurrency(total) }
        </CardDescription>
      </CardHeader>
    </Card>
  );
}