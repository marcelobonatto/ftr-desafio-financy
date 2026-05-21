import { BadgeIcon } from "@/components/BadgeIcon";
import { BadgeText } from "@/components/BadgeText";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/utils";
import { CircleArrowDown, CircleArrowUp, SquarePen, Trash2 } from "lucide-react";
import { TransactionTableFooter } from "./TransactionTableFooter";
import type { CategoryColor, TransactionDataType } from "@/types";

interface TransactionsTableProps {
    className?: string;
    transactions: TransactionDataType[];
    totalCount: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    limit?: number;
}

// const MOCK_TRANSACTIONS = [
//     { id: 1, description: "Jantar no Restaurante", date: "18/05/26", category: "Alimentação", type: "expense", amount: 89.5, color: "blue", icon: "Utensils" },
//     { id: 2, description: "Posto de Gasolina", date: "17/05/26", category: "Transporte", type: "expense", amount: 100, color: "purple", icon: "CarFront" },
//     { id: 3, description: "Compras no Mercado", date: "16/05/26", category: "Mercado", type: "expense", amount: 156.8, color: "orange", icon: "ShoppingCart" },
//     { id: 4, description: "Retorno de Investimento", date: "14/05/26", category: "Investimento", type: "income", amount: 340.25, color: "green", icon: "PiggyBank" },
//     { id: 5, description: "Aluguel", date: "12/05/26", category: "Utilidades", type: "expense", amount: 1700, color: "yellow", icon: "ToolCase" },
//     { id: 6, description: "Freelance", date: "12/05/26", category: "Salário", type: "income", amount: 2500, color: "green", icon: "BriefcaseBusiness" },
//     { id: 7, description: "Compras Jantar", date: "10/05/26", category: "Mercado", type: "expense", amount: 150, color: "orange", icon: "ShoppingCart" },
//     { id: 8, description: "Cinema", date: "08/05/26", category: "Entretenimento", type: "expense", amount: 88, color: "pink", icon: "Ticket" },
//     { id: 9, description: "Aluguel de Filmes", date: "07/05/26", category: "Entretenimento", type: "expense", amount: 11.9, color: "pink", icon: "Ticket" },
//     { id: 10, description: "Almoço", date: "06/05/26", category: "Alimentação", type: "expense", amount: 35.9, color: "blue", icon: "Utensils" }
// ];

export function TransactionsTable({ className, transactions, totalCount, currentPage, onPageChange, limit }: TransactionsTableProps) {
    return (
        <Card className={`${className}`}>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell className="text-left uppercase font-medium tracking-wider text-gray-500">Descrição</TableCell>
                            <TableCell className="text-center uppercase font-medium tracking-wider text-gray-500">Data</TableCell>
                            <TableCell className="text-center uppercase font-medium tracking-wider text-gray-500">Categoria</TableCell>
                            <TableCell className="text-center uppercase font-medium tracking-wider text-gray-500">Tipo</TableCell>
                            <TableCell className="text-right uppercase font-medium tracking-wider text-gray-500">Valor</TableCell>
                            <TableCell className="text-right uppercase font-medium tracking-wider text-gray-500">Ações</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((transaction) => {
                            const isIncome = transaction.type === "INCOME";
                            const CategoryIcon = transaction.category.icon;

                            return (
                                <TableRow key={transaction.id}>
                                    <TableCell className="text-left flex items-center font-medium gap-2">
                                        <BadgeIcon iconName={CategoryIcon} color={transaction.category.color as CategoryColor} />
                                        {transaction.description}
                                    </TableCell>
                                    <TableCell className="text-center text-gray-600">
                                        {new Date(transaction.date).toLocaleDateString("pt-BR", {
                                            day: "2-digit", month: "2-digit", year: "2-digit",
                                        })}
                                    </TableCell>
                                    <TableCell className="text-center text-gray-600">
                                        <BadgeText color={transaction.category.color as CategoryColor} text={transaction.category.name} />
                                    </TableCell>
                                    <TableCell className="text-center text-gray-600">
                                        <div className="flex items-center justify-center gap-2">
                                            {isIncome ? (
                                                <>
                                                    <CircleArrowUp className="text-green-base shrink-0" size={18} />
                                                    <span className="text-green-base">Entrada</span>
                                                </>
                                            ) : (
                                                <>
                                                    <CircleArrowDown className="text-red-base shrink-0" size={18} />
                                                    <span className="text-red-base">Saída</span>
                                                </>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right text-gray-600 font-bold">
                                        {isIncome ? "+" : "-"} {formatCurrency(Math.abs(transaction.amount))}
                                    </TableCell>
                                    <TableCell className="text-right text-gray-600">
                                        <Button variant="outline" size="icon" onClick={() => { }}>
                                            <Trash2 size={16} color="red" />
                                        </Button>
                                        <Button variant="outline" size="icon" onClick={() => { }}>
                                            <SquarePen size={16} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                    <TableFooter className="bg-white">
                        <TableRow>
                            <TableCell colSpan={6}>
                                <TransactionTableFooter
                                    totalCount={totalCount}
                                    currentPage={currentPage}
                                    onPageChange={onPageChange}
                                    limit={limit}
                                />
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </CardContent>
        </Card>
    );
}