import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DELETE_CATEGORY } from "@/lib/graphql/mutations/Categories";
import {
  GET_CATEGORY_STATISTICS,
  LIST_CATEGORIES,
} from "@/lib/graphql/queries/Categories";
import type { CategoryDataType } from "@/types";
import { useMutation } from "@apollo/client/react";

interface CategoryDialogDeleteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: CategoryDataType | null;
}

export function CategoryDialogDelete({
  open,
  onOpenChange,
  category,
}: CategoryDialogDeleteProps) {
  const [deleteCategoryMutation, { loading }] = useMutation(DELETE_CATEGORY, {
    onCompleted: () => {
      onOpenChange(false);
    },
    refetchQueries: [
      { query: GET_CATEGORY_STATISTICS },
      { query: LIST_CATEGORIES },
    ],
  });

  const handleDeleteCategory = async () => {
    if (!category) return;

    await deleteCategoryMutation({
      variables: {
        id: category.id,
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remover Categoria</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Tem certeza que deseja remover{" "}
          <span className="font-medium"> {category?.name}</span>? Esta ação não
          poderá ser desfeita.
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteCategory}
            disabled={loading}
          >
            Remover
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
