import { NavLink } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";
import { UserAvatar } from "./UserAvatar";
import { isTokenExpired } from "@/utils";

export function Header() {
    const token = useAuthStore((state) => state.token);

    const authenticated = token && !isTokenExpired(token);

    return (
        <header className="w-full px-16 bg-white border-b border-gray-200">
            {authenticated && (
                <div className="mx-auto flex h-20 items-center justify-between px-16">
                    <div className="flex w-1/4 justify-start">
                        <img src="/img/logo.svg" alt="Logo" className="h-8" />
                    </div>

                    <nav className="flex flex-1 justify-center items-center gap-8">
                        <NavLink to="/"
                            className={({ isActive }) =>
                                `font-medium transition-colors hover:text-brand-base 
                                    ${isActive ? "text-brand-base" : "text-gray-500"}`}>
                            Dashboard
                        </NavLink>
                        <NavLink to="/transactions"
                            className={({ isActive }) =>
                                `font-medium transition-colors hover:text-brand-base 
                                    ${isActive ? "text-brand-base" : "text-gray-500"}`}>
                            Transações
                        </NavLink>
                        <NavLink to="/categories"
                            className={({ isActive }) =>
                                `font-medium transition-colors hover:text-brand-base 
                                    ${isActive ? "text-brand-base" : "text-gray-500"}`}>
                            Categorias
                        </NavLink>
                    </nav>

                    <div className="flex w-1/4 justify-end items-center gap-4">
                        <NavLink to="/profile">
                            <UserAvatar size="sm" />
                        </NavLink>
                    </div>
                </div>
            )}
        </header>
    );
}