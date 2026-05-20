import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { FieldDescription } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { COLOR_OPTIONS } from "@/constants/colors";
import { ICON_OPTIONS } from "@/constants/icons";
import { CREATE_CATEGORY, UPDATE_CATEGORY } from "@/lib/graphql/mutations/Categories";
import { GET_CATEGORY_STATISTICS } from "@/lib/graphql/queries/Categories";
import type { CategoryDataType } from "@/types";
import { useMutation } from "@apollo/client/react";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useState, type SubmitEventHandler } from "react";
import { toast } from "sonner";

interface CategoryDialogFormProps {
    categoryToEdit?: CategoryDataType | null;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export function CategoryDialogForm({
    categoryToEdit,
    onOpenChange,
    onSuccess,
}: CategoryDialogFormProps) {
    const isEditing = !!categoryToEdit;

    const [title, setTitle] = useState(() => categoryToEdit?.name ?? "");
    const [description, setDescription] = useState(
        () => categoryToEdit?.description ?? "",
    );
    const [selectedIcon, setSelectedIcon] = useState(
        () => categoryToEdit?.icon ?? "BriefcaseBusiness",
    );
    const [selectedColor, setSelectedColor] = useState(
        () => categoryToEdit?.color ?? "green",
    );

    const [createCategory, { loading: createLoading }] = useMutation(
        CREATE_CATEGORY,
        {
            refetchQueries: [{ query: GET_CATEGORY_STATISTICS }],
            onCompleted: () => {
                toast.success("Categoria criada com sucesso!");
                onSuccess?.();
                onOpenChange(false);
            },
            onError: (error) => {
                toast.error(error.message || "Erro ao criar categoria.");
            },
        },
    );

    const [updateCategory, { loading: updateLoading }] = useMutation(
        UPDATE_CATEGORY,
        {
            onCompleted: () => {
                toast.success("Categoria atualizada com sucesso!");
                onSuccess?.();
                onOpenChange(false);
            },
            onError: (error) => {
                toast.error(error.message || "Erro ao atualizar categoria.");
            },
        },
    );

    const isMutating = createLoading || updateLoading;

    const handleSubmit: SubmitEventHandler = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            toast.error("Título da categoria é obrigatório.");
            return;
        }

        const payload = {
            name: title.trim(),
            description: description.trim() || null,
            icon: selectedIcon,
            color: selectedColor,
        };

        if (isEditing && categoryToEdit) {
            await updateCategory({
                variables: {
                    id: categoryToEdit.id,
                    data: payload,
                },
            });
        } else {
            await createCategory({
                variables: {
                    data: payload,
                },
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-2 space-y-5">
            <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                    id="title"
                    type="text"
                    placeholder="Ex: Alimentação"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isMutating}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Input
                    id="description"
                    type="text"
                    placeholder="Descrição da categoria"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={isMutating}
                />
                <FieldDescription className="text-xs">Opcional</FieldDescription>
            </div>

            <div className="space-y-2">
                <Label>Ícone</Label>
                <div className="grid grid-cols-8 gap-2">
                    {ICON_OPTIONS.map((icon) => {
                        const IconComponent = icon.icon;
                        const isSelected = selectedIcon === icon.name;

                        return (
                            <Button
                                key={icon.name}
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => setSelectedIcon(icon.name)}
                                disabled={isMutating}
                                className={`h-10 w-10 rounded-md border flex items-center justify-center transition-all bg-white hover:bg-gray-50
                                                   ${isSelected ? "border-brand-base ring-1 ring-brand-base text-brand-base" : "border-gray-300 text-gray-600"}`}
                            >
                                <IconComponent className="h-5 w-5" />
                            </Button>
                        );
                    })}
                </div>
            </div>

            <div className="space-y-2">
                <Label>Cor</Label>
                <div className="grid grid-cols-7 gap-2">
                    {COLOR_OPTIONS.map((color) => {
                        const isSelected = selectedColor === color.name;

                        return (
                            <Button
                                key={color.name}
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => setSelectedColor(color.name)}
                                disabled={isMutating}
                                className={`h-8 w-12 rounded-md border flex items-center justify-center transition-all bg-white hover:bg-gray-50
                                                   ${isSelected ? "border-brand-base ring-1 ring-brand-base text-brand-base" : "border-gray-300 text-gray-600"}`}
                            >
                                <div className={`h-4 w-8 rounded ${color.hexClass}`}></div>
                            </Button>
                        );
                    })}
                </div>
            </div>

            <DialogFooter className="pt-2">
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