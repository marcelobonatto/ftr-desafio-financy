import { useAuthStore } from "@/stores/auth";
import { getNameInitials } from "@/utils";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface UserAvatarProps {
    className?: string;
    size?: "sm" | "lg";
}

export function UserAvatar({ className, size = "sm" }: UserAvatarProps) {
    const { user } = useAuthStore();
    const initials = getNameInitials(user?.name);

    const sizeClasses = size === "lg" ? "h-20 w-20" : "h-10 w-10";
    const fontSize = size === "lg" ? "text-3xl" : "text-sm";

    return (
        <Avatar className={`${sizeClasses} border border-gray-200 ${className || ""}`}>
            <AvatarFallback className={`bg-gray-300 text-gray-800 uppercase ${fontSize}`}>
                {initials}
            </AvatarFallback>
        </Avatar>
    );
}