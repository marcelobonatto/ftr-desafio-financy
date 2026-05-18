import { useEffect, useState, type SubmitEventHandler } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { CircleArrowDown, CircleArrowUp } from "lucide-react";
import { Input } from "./ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { NativeSelect, NativeSelectOption } from "./ui/native-select";

interface TransactionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    transactionToEdit?: any | null;
}

export function TransactionDialog({ open, onOpenChange, transactionToEdit }: TransactionDialogProps) {
    const isEditing = !!transactionToEdit;

    const [type, setType] = useState<"expense" | "income">("expense");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState("0,00");
    const [category, setCategory] = useState("");

    useEffect(() => {
        if (transactionToEdit) {
            setType(transactionToEdit.type === "income" ? "income" : "expense");
            setDescription(transactionToEdit.title ?? "");
            setDate(transactionToEdit.date ?? "");
            setAmount(transactionToEdit.amount?.toString() ?? "0,00");
            setCategory(transactionToEdit.category ?? "");
        } else {
            setType("expense");
            setDescription("");
            setDate("");
            setAmount("0,00");
            setCategory("");
        }
    }, [transactionToEdit]);

    const handleSubmit: SubmitEventHandler = (e) => {
        e.preventDefault();
        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="p-6">
                <DialogHeader className="space-y-1">
                    <DialogTitle className="text-base font-semibold text-gray-800">
                        {isEditing ? "Editar transação" : "Nova transação"}
                    </DialogTitle>

                    <DialogDescription className="text-sm text-gray-500 font-normal -mt-2">
                        Registre sua despesa ou receita
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="mt-2 space-y-5">
                    <div className="grid grid-cols-2 gap-2 border border-gray-200 rounded-xl overflow-hidden p-2 bg-white">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setType("expense")}
                            className={`
                                "flex items-center justify-center gap-2 h-11 rounded-sm font-medium text-sm transition-all border
                                ${type === "expense" ?
                                    "bg-gray-100 border-red-base text-gray-800" :
                                    "bg-transparent border-transparent text-gray-500 hover:text-gray-700"}
                            `}
                        >
                            <CircleArrowDown size={18} className={type === "expense" ? "text-red-base" : "text-gray-400"} />
                            Despesa
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setType("income")}
                            className={`
                                "flex items-center justify-center gap-2 h-11 rounded-sm font-medium text-sm transition-all border
                                ${type === "income" ?
                                    "bg-green-100 border-green-base text-gray-800" :
                                    "bg-transparent border-transparent text-gray-500 hover:text-gray-700"}
                            `}
                        >
                            <CircleArrowUp size={18} className={type === "income" ? "text-green-base" : "text-gray-400"} />
                            Receita
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Input
                            id="description"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Ex. Almoço no restaurante"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="date">Data</Label>
                            <Input
                                id="date"
                                type="text"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                placeholder="Selecione"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="amount">Valor</Label>

                            <InputGroup>
                                <InputGroupInput
                                    id="amount"
                                    type="text"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0,00"
                                />

                                <InputGroupAddon>
                                    R$
                                </InputGroupAddon>
                            </InputGroup>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Categoria</Label>
                        <NativeSelect
                            id="category"
                            value={category}
                            className="w-full"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <NativeSelectOption value="" disabled>Selecione</NativeSelectOption>
                            <NativeSelectOption value="food">Alimentação</NativeSelectOption>
                            <NativeSelectOption value="transport">Transporte</NativeSelectOption>
                            <NativeSelectOption value="salary">Salário</NativeSelectOption>
                        </NativeSelect>
                    </div>

                    <DialogFooter className="flex items-center justify-between gap-3">
                        <Button type="submit" className="flex-1 bg-brand-base hover:bg-brand-base/90">
                            Salvar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}