import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CREATE_CATEGORY, UPDATE_CATEGORY } from "@/lib/graphql/mutations/Categories";
import { GET_CATEGORIES, GET_CATEGORY_STATISTICS } from "@/lib/graphql/queries/Categories";
import { useMutation } from "@apollo/client/react";
import * as Icons from "lucide-react";
import { Loader2 } from "lucide-react";
import { useEffect, useState, type SubmitEventHandler } from "react";
import { toast } from "sonner";

const ICON_OPTIONS = [
    { name: "BriefcaseBusiness", icon: Icons.BriefcaseBusiness },
    { name: "CarFront", icon: Icons.CarFront },
    { name: "HeartPulse", icon: Icons.HeartPulse },
    { name: "PiggyBank", icon: Icons.PiggyBank },
    { name: "ShoppingCart", icon: Icons.ShoppingCart },
    { name: "Ticket", icon: Icons.Ticket },
    { name: "ToolCase", icon: Icons.ToolCase },
    { name: "Utensils", icon: Icons.Utensils },
    { name: "PawPrint", icon: Icons.PawPrint },
    { name: "Home", icon: Icons.Home },
    { name: "Gift", icon: Icons.Gift },
    { name: "Dumbbell", icon: Icons.Dumbbell },
    { name: "BookOpen", icon: Icons.BookOpen },
    { name: "BaggageClaim", icon: Icons.BaggageClaim },
    { name: "Mailbox", icon: Icons.Mailbox },
    { name: "ReceiptText", icon: Icons.ReceiptText }
];

const COLOR_OPTIONS = [
    { name: "green", hexClass: "bg-green-base" },
    { name: "blue", hexClass: "bg-blue-base" },
    { name: "purple", hexClass: "bg-purple-base" },
    { name: "pink", hexClass: "bg-pink-base" },
    { name: "red", hexClass: "bg-red-base" },
    { name: "orange", hexClass: "bg-orange-base" },
    { name: "yellow", hexClass: "bg-yellow-base" }
];

interface CategoryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    categoryToEdit?: any | null;
    onSuccess?: () => void;
}

export function CategoryDialog({ open, onOpenChange, categoryToEdit, onSuccess }: CategoryDialogProps) {
    const isEditing = !!categoryToEdit;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("BriefcaseBusiness");
    const [selectedColor, setSelectedColor] = useState("green");

    useEffect(() => {
        if (categoryToEdit) {
            setTitle(categoryToEdit.name ?? "");
            setDescription(categoryToEdit.description ?? "");
            setSelectedIcon(categoryToEdit.icon ?? "");
            setSelectedColor(categoryToEdit.color ?? "");
        } else {
            setTitle("");
            setDescription("");
            setSelectedIcon("BriefcaseBusiness");
            setSelectedColor("green");
        }
    }, [categoryToEdit, open]);

    const [createCategory, { loading: createLoading }] = useMutation(CREATE_CATEGORY, {
        refetchQueries: [{ query: GET_CATEGORY_STATISTICS }],
        onCompleted: () => {
            toast.success("Categoria criada com sucesso!");
            onSuccess?.();
            onOpenChange(false);
        },
        onError: (error) => {
            toast.error(error.message || "Erro ao criar categoria.");
        }
    });

    const [updateCategory, { loading: updateLoading }] = useMutation(UPDATE_CATEGORY, {
        onCompleted: () => {
            toast.success("Categoria atualizada com sucesso!");
            onSuccess?.();
            onOpenChange(false);
        },
        onError: (error) => {
            toast.error(error.message || "Erro ao atualizar categoria.");
        }
    });

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
            color: selectedColor
        };

        if (isEditing && categoryToEdit) {
            await updateCategory({
                variables: {
                    id: categoryToEdit.id,
                    data: payload
                }
            });
        } else {
            await createCategory({
                variables: {
                    data: payload
                }
            });
        }
    };

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

                <form onSubmit={handleSubmit} className="mt-2 space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="title">Título</Label>
                        <Input id="title" type="text" placeholder="Ex: Alimentação"
                            value={title} onChange={(e) => setTitle(e.target.value)}
                            disabled={isMutating} required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Input id="description" type="text" placeholder="Descrição da categoria"
                            value={description} onChange={(e) => setDescription(e.target.value)}
                            disabled={isMutating} />
                        <FieldDescription className="text-xs">Opcional</FieldDescription>
                    </div>

                    <div className="space-y-2">
                        <Label>Ícone</Label>
                        <div className="grid grid-cols-8 gap-2">
                            {ICON_OPTIONS.map((icon) => {
                                const IconComponent = icon.icon;
                                const isSelected = selectedIcon === icon.name;

                                return (
                                    <Button key={icon.name} type="button" variant="outline" size="icon"
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
                                    <Button key={color.name} type="button" variant="outline" size="icon"
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
                        <Button type="submit" variant="solid" size="md" className="w-full"
                            disabled={isMutating}>
                            {isMutating && <Loader2 className="h-4 w-4 animate-spin" />}
                            {isMutating ? "Salvando..." : "Salvar"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}