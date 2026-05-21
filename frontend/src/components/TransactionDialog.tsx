import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { TransactionDialogForm } from "./TransactionDialogForm";

interface TransactionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    transactionToEdit?: any | null;
    onSuccess?: () => void;
}

export function TransactionDialog({
    open,
    onOpenChange,
    transactionToEdit,
    onSuccess
}: TransactionDialogProps) {
    const isEditing = !!transactionToEdit;

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

                {open && (
                    <TransactionDialogForm
                        key={transactionToEdit?.id ?? "new"}
                        transactionToEdit={transactionToEdit}
                        onOpenChange={onOpenChange}
                        onSuccess={onSuccess}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}