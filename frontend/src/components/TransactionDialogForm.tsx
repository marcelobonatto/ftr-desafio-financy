import type { CategoriesListData, TransactionDataType } from "@/types";
import { useState, type SubmitEventHandler } from "react";
import { Button } from "./ui/button";
import {
  ChevronDownIcon,
  CircleArrowDown,
  CircleArrowUp,
  Loader2,
} from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { NativeSelect, NativeSelectOption } from "./ui/native-select";
import { DialogFooter } from "./ui/dialog";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  CREATE_TRANSACTION,
  UPDATE_TRANSACTION,
} from "@/lib/graphql/mutations/Transactions";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Categories";
import { formatCurrencyAsNumber } from "@/utils";

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

  const [type, setType] = useState<"EXPENSE" | "INCOME">(
    () => transactionToEdit?.type ?? "EXPENSE",
  );
  const [description, setDescription] = useState(
    () => transactionToEdit?.description ?? "",
  );
  const [date, setDate] = useState<Date>(() => {
    const baseDate = transactionToEdit?.date
      ? new Date(transactionToEdit.date)
      : new Date();
    baseDate.setHours(0, 0, 0, 0);
    return baseDate;
  });

  const [amount, setAmount] = useState(() =>
    transactionToEdit?.amount
      ? formatCurrencyAsNumber(transactionToEdit.amount.toString())
      : "0,00",
  );
  const [category, setCategory] = useState(
    () => transactionToEdit?.category?.id ?? "",
  );

  const { data: categoriesData, loading: categoriesLoading } =
    useQuery<CategoriesListData>(LIST_CATEGORIES, {
      skip: !open,
    });

  const [createTransaction, { loading: createLoading }] = useMutation(
    CREATE_TRANSACTION,
    {
      onCompleted: () => {
        toast.success("Transação criada com sucesso!");
        onSuccess?.();
        onOpenChange(false);
      },
      onError: (error) => {
        toast.error(error.message || "Erro ao criar transação.");
      },
    },
  );

  const [updateTransaction, { loading: updateLoading }] = useMutation(
    UPDATE_TRANSACTION,
    {
      onCompleted: () => {
        toast.success("Transação atualizada com sucesso!");
        onSuccess?.();
        onOpenChange(false);
      },
      onError: (error) => {
        toast.error(error.message || "Erro ao atualizar transação.");
      },
    },
  );

  const isMutating = createLoading || updateLoading;

  const handleSubmit: SubmitEventHandler = async (e) => {
    e.preventDefault();

    if (!description.trim()) return toast.error("A descrição é obrigatória.");
    if (!date) return toast.error("A data é obrigatória.");

    const parsedAmount = parseAmountToFloat(amount);
    if (parsedAmount <= 0)
      return toast.error("Informe um valor válido maior que zero.");

    if (!category) return toast.error("Selecione uma categoria.");

    const payload = {
      description: description.trim(),
      amount: parsedAmount,
      date,
      type,
      categoryId: category,
    };

    if (isEditing && transactionToEdit) {
      await updateTransaction({
        variables: {
          id: transactionToEdit.id,
          data: payload,
        },
      });
    } else {
      await createTransaction({
        variables: {
          data: payload,
        },
      });
    }
  };

  const categories = categoriesData?.listCategories || [];

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formatted = formatCurrencyAsNumber(inputValue);
    setAmount(formatted);
  };

  const parseAmountToFloat = (value: string) => {
    const cleanValue = value.replace(/\./g, "").replace(",", ".");
    return parseFloat(cleanValue);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 space-y-5">
      <div className="grid grid-cols-2 gap-2 border border-gray-200 rounded-xl overflow-hidden p-2 bg-white">
        <Button
          type="button"
          variant="outline"
          onClick={() => setType("EXPENSE")}
          className={`
                                "flex items-center justify-center gap-2 h-11 rounded-sm font-medium text-sm transition-all border
                                ${
                                  type === "EXPENSE"
                                    ? "bg-gray-100 border-red-base text-gray-800"
                                    : "bg-transparent border-transparent text-gray-500 hover:text-gray-700"
                                }
                            `}
          disabled={isMutating}
        >
          <CircleArrowDown
            size={18}
            className={type === "EXPENSE" ? "text-red-base" : "text-gray-400"}
          />
          Despesa
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => setType("INCOME")}
          className={`
                                "flex items-center justify-center gap-2 h-11 rounded-sm font-medium text-sm transition-all border
                                ${
                                  type === "INCOME"
                                    ? "bg-green-100 border-green-base text-gray-800"
                                    : "bg-transparent border-transparent text-gray-500 hover:text-gray-700"
                                }
                            `}
          disabled={isMutating}
        >
          <CircleArrowUp
            size={18}
            className={type === "INCOME" ? "text-green-base" : "text-gray-400"}
          />
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
          <Popover>
            <PopoverTrigger
              render={
                <Button
                  variant={"outline"}
                  data-empty={!date}
                  className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                >
                  {date ? (
                    format(date, "P", { locale: ptBR })
                  ) : (
                    <span>Selecione uma data</span>
                  )}
                  <ChevronDownIcon data-icon="inline-end" />
                </Button>
              }
            />
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                required
                selected={date}
                onSelect={setDate}
                defaultMonth={date}
                locale={ptBR}
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
              onChange={handleAmountChange}
              placeholder="0,00"
              disabled={isMutating}
            />

            <InputGroupAddon>R$</InputGroupAddon>
          </InputGroup>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Categoria</Label>
        {categoriesLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
          </>
        ) : (
          <NativeSelect
            id="category"
            value={category}
            className="w-full"
            onChange={(e) => setCategory(e.target.value)}
            disabled={isMutating}
          >
            <NativeSelectOption value="" disabled>
              Selecione
            </NativeSelectOption>
            {categories.map((category) => (
              <NativeSelectOption key={category.id} value={category.id}>
                {category.name}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        )}
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
