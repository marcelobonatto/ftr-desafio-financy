import type { TransactionDataType } from "@/types";
import { useState, type SubmitEventHandler } from "react";
import { Button } from "./ui/button";
import { CalendarIcon, CircleArrowDown, CircleArrowUp, Loader2 } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { NativeSelect, NativeSelectOption } from "./ui/native-select";
import { DialogFooter } from "./ui/dialog";
import { useMutation } from "@apollo/client/react";
import { CREATE_TRANSACTION, UPDATE_TRANSACTION } from "@/lib/graphql/mutations/Transactions";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";

interface TransactionDialogFormProps {
    transactionToEdit?: TransactionDataType | null;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export function TransactionDialogForm({
    transactionToEdit,
    onOpenChange,
    onSuccess,
}: TransactionDialogFormProps) {
    const isEditing = !!transactionToEdit;

    const [type, setType] = useState<"EXPENSE" | "INCOME">(() => transactionToEdit?.type ?? "EXPENSE");
    const [description, setDescription] = useState(() => transactionToEdit?.title ?? "");
    const [date, setDate] = useState(() => transactionToEdit?.date ?? new Date().toISOString().substring(0, 10));
    const [amount, setAmount] = useState(() => transactionToEdit?.amount?.toString() ?? "0,00");
    const [category, setCategory] = useState(() => transactionToEdit?.category?.id ?? "");

    const [createTransaction, { loading: createLoading }] = useMutation(CREATE_TRANSACTION, {
        onCompleted: () => {
            toast.success("Transação criada com sucesso!");
            onSuccess?.();
            onOpenChange(false);
        },
        onError: (error) => {
            toast.error(error.message || "Erro ao criar transação.");
        }
    });

    const [updateTransaction, { loading: updateLoading }] = useMutation(UPDATE_TRANSACTION, {
        onCompleted: () => {
            toast.success("Transação atualizada com sucesso!");
            onSuccess?.();
            onOpenChange(false);
        },
        onError: (error) => {
            toast.error(error.message || "Erro ao atualizar transação.");
        }
    });

    const isMutating = createLoading || updateLoading;

    const handleSubmit: SubmitEventHandler = (e) => {
        e.preventDefault();
        onSuccess?.();
        onOpenChange(false);
    }

    return (
        <form onSubmit={handleSubmit} className="mt-2 space-y-5">
            <div className="grid grid-cols-2 gap-2 border border-gray-200 rounded-xl overflow-hidden p-2 bg-white">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => setType("EXPENSE")}
                    className={`
                                "flex items-center justify-center gap-2 h-11 rounded-sm font-medium text-sm transition-all border
                                ${type === "EXPENSE" ?
                            "bg-gray-100 border-red-base text-gray-800" :
                            "bg-transparent border-transparent text-gray-500 hover:text-gray-700"}
                            `}
                    disabled={isMutating}
                >
                    <CircleArrowDown size={18} className={type === "EXPENSE" ? "text-red-base" : "text-gray-400"} />
                    Despesa
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    onClick={() => setType("INCOME")}
                    className={`
                                "flex items-center justify-center gap-2 h-11 rounded-sm font-medium text-sm transition-all border
                                ${type === "INCOME" ?
                            "bg-green-100 border-green-base text-gray-800" :
                            "bg-transparent border-transparent text-gray-500 hover:text-gray-700"}
                            `}
                    disabled={isMutating}
                >
                    <CircleArrowUp size={18} className={type === "INCOME" ? "text-green-base" : "text-gray-400"} />
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
                    disabled={isMutating}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="date">Data</Label>
                    {/* <Input
                        id="date"
                        type="text"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="Selecione"
                        disabled={isMutating}
                    /> */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "w-[240px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground",
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? (
                                    format(date, "PPP")
                                ) : (
                                    <span>Pick a date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
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
                            disabled={isMutating}
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
                    disabled={isMutating}
                >
                    <NativeSelectOption value="" disabled>Selecione</NativeSelectOption>
                    <NativeSelectOption value="food">Alimentação</NativeSelectOption>
                    <NativeSelectOption value="transport">Transporte</NativeSelectOption>
                    <NativeSelectOption value="salary">Salário</NativeSelectOption>
                </NativeSelect>
            </div>

            <DialogFooter className="flex items-center justify-between gap-3">
                <Button
                    type="submit"
                    variant="solid"
                    size="md"
                    className="w-full"
                    disabled={isMutating}
                >
                    {isMutating && <Loader2 className="h-4 w-4 animate-spin" />}
                    {isMutating ? "Salvando..." : "Salvar"}
                </Button>
            </DialogFooter>
        </form>
    );
}