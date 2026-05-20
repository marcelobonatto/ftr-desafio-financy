import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { CategoryDataType } from "@/types";
import { CategoryDialogForm } from "./CategoryDialogForm";

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryToEdit?: CategoryDataType | null;
  onSuccess?: () => void;
}

export function CategoryDialog({
  open,
  onOpenChange,
  categoryToEdit,
  onSuccess,
}: CategoryDialogProps) {
  const isEditing = !!categoryToEdit;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-6">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-base font-semibold text-gray-800">
            {isEditing ? "Editar categoria" : "Nova categoria"}
          </DialogTitle>

          <DialogDescription className="text-sm text-gray-500 font-normal -mt-2">
            Organize suas transações por categorias
          </DialogDescription>
        </DialogHeader>

        {open && (
          <CategoryDialogForm
            key={categoryToEdit?.id ?? "new"}
            categoryToEdit={categoryToEdit}
            onOpenChange={onOpenChange}
            onSuccess={onSuccess}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
