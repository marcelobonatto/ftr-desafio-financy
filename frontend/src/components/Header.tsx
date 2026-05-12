import { NavLink } from "react-router-dom";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function Header() {
    return (
        <div className="mx-auto flex bg-white h-16 items-center justify-between py-10 px-16">
            <div className="flex justify-between gap-2">
                <div className="min-w-48">
                    <img src="/img/logo.svg" alt="Logo" />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <nav className="flex items-center gap-4">
                    <NavLink to="/" className="w-fit">
                        Dashboard
                    </NavLink>
                    <NavLink to="/transactions" className="w-fit">
                        Transações
                    </NavLink>
                    <NavLink to="/categories" className="w-fit">
                        Categorias
                    </NavLink>
                </nav>
            </div>
            <div className="flex items-center gap-2">
                <NavLink to="/profile" className="w-fit">
                    <Avatar>
                        <AvatarFallback className="bg-gray-300 text-gray-800">
                            MB
                        </AvatarFallback>
                    </Avatar>
                </NavLink>
            </div>
        </div>
    );
}