interface EmptyStateProps {
    message?: string;
    className?: string;
}

export function EmptyState({
    message = "Nenhum registro encontrado para exibir.",
    className
}: EmptyStateProps) {

    return (
        <div className={`text-center py-12 bg-white rounded-lg border border-gray-200 ${className}`}>
            <p className="text-gray-400 italic">{message}</p>
        </div>
    );
}