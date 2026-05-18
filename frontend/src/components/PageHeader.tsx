import { Plus } from "lucide-react";
import { Button } from "./ui/button";

interface PageHeaderProps {
    title: string;
    description: string;
    buttonLabel: string;
    onButtonClick: () => void;
}

export function PageHeader({ title, description, buttonLabel, onButtonClick }: PageHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold text-gray-800 leading-none mb-2">{title}</h1>
                <p className="text-base text-gray-500 font-normal leading-none mb-1">{description}</p>
            </div>
            <Button variant="solid" size="md" onClick={onButtonClick}>
                <Plus size={16} />
                {buttonLabel}
            </Button>
        </div>
    );
}