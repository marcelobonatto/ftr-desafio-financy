interface LoadingStateProps {
    heightClass?: string;
    className?: string;
}

export function LoadingState({ heightClass = "h-[400px]", className }: LoadingStateProps) {
    return (
        <div className={`${heightClass} ${className} flex items-center justify-center`}>
            <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 bg-gray-200 rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-gray-200 rounded-full animate-bounce delay-75"></div>
                <div className="w-4 h-4 bg-gray-200 rounded-full animate-bounce delay-150"></div>
            </div>
        </div>
    );
}