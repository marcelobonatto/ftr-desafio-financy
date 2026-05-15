import { NavLink } from "react-router-dom";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useAuthStore } from "@/stores/auth";
import { useLocation, useNavigate } from "react-router-dom";

export function Header() {
    // const { user, logout, isAuthenticated } = useAuthStore();
    const { user, logout } = useAuthStore();
    const location = useLocation();
    const navigate = useNavigate();
    const isDashboard = location.pathname === "/";
    const isTransactions = location.pathname === "/transactions";
    const isCategories = location.pathname === "/categories";
    const isProfile = location.pathname === "/profile";

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const isAuthenticated = isDashboard || isTransactions || isCategories || isProfile;

    return (
        <header className="w-full px-16 bg-white border-b border-gray-200">

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
                        <Avatar className="h-10 w-10 border border-gray-200 cursor-pointer">
                            <AvatarFallback className="bg-gray-300 text-gray-800">
                                {user?.name?.substring(0, 2).toUpperCase() || 'FN'}
                            </AvatarFallback>
                        </Avatar>
                    </NavLink>
                </div>
            </div>
        </header>
    );
}