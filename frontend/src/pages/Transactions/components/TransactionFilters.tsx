import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Search } from "lucide-react";

interface TransactionFiltersProps {
    className?: string;
}

export function TransactionFilters({ className }: TransactionFiltersProps) {
    return (
        <div className={`grid grid-cols-4 gap-6 bg-white p-6 rounded-xl border border-gray-200 w-full mx-auto ${className}`}>
            <div className="space-y-2">
                <Label htmlFor="search" className="text-sm font-medium text-gray-700">Buscar</Label>
                <InputGroup>
                    <InputGroupInput id="search" placeholder="Buscar por descrição" type="text" />
                    <InputGroupAddon>
                        <Search />
                    </InputGroupAddon>
                </InputGroup>
            </div>

            <div className="space-y-2">
                <Label htmlFor="search" className="text-sm font-medium text-gray-700">Tipo</Label>
                <NativeSelect className="w-full">
                    <NativeSelectOption value="all">Todos</NativeSelectOption>
                    <NativeSelectOption value="revenue">Entradas</NativeSelectOption>
                    <NativeSelectOption value="expense">Saídas</NativeSelectOption>
                </NativeSelect>
            </div>

            <div className="space-y-2">
                <Label htmlFor="search" className="text-sm font-medium text-gray-700">Categoria</Label>
                <NativeSelect className="w-full">
                    <NativeSelectOption value="all">Todas</NativeSelectOption>
                    <NativeSelectOption value="food">Alimentação</NativeSelectOption>
                    <NativeSelectOption value="entertainment">Entretenimento</NativeSelectOption>
                    <NativeSelectOption value="investments">Investimentos</NativeSelectOption>
                    <NativeSelectOption value="market">Mercado</NativeSelectOption>
                    <NativeSelectOption value="salary">Salário</NativeSelectOption>
                    <NativeSelectOption value="health">Saúde</NativeSelectOption>
                    <NativeSelectOption value="transport">Transporte</NativeSelectOption>
                    <NativeSelectOption value="utilities">Utilidades</NativeSelectOption>
                </NativeSelect>
            </div>

            <div className="space-y-2">
                <Label htmlFor="search" className="text-sm font-medium text-gray-700">Período</Label>
                <NativeSelect defaultValue="2026-05" className="w-full">
                    <NativeSelectOption value="2026-05">Maio / 2026</NativeSelectOption>
                    <NativeSelectOption value="2026-04">Abril / 2026</NativeSelectOption>
                </NativeSelect>
            </div>
        </div>
    );
}