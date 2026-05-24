import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Propriedadades do componente do footer da tabela de transações
interface TransactionTableFooterProps {
    className?: string;
    totalCount: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    limit?: number;
}

// Componente do footer da tabela de transações
export function TransactionTableFooter({ className, totalCount, currentPage, onPageChange, limit }: TransactionTableFooterProps) {
    // Calcula o número máximo de páginas
    const maxPages = Math.ceil(totalCount / limit);
    // Quantidade de resultados
    const qtdeResultados = `${totalCount} ${totalCount === 1 ? "resultado" : "resultados"}`;
    // Registro inicial e final da página atual
    const fromRecord = totalCount === 0 ? 0 : (currentPage - 1) * limit + 1;
    const toRecord = Math.min(currentPage * limit, totalCount);

    // Renderiza o footer da tabela de transações
    return (
        <div className={`${className} w-full bg-white mx-auto flex items-center justify-between py-4`}>

            {/* Informações da página e quantidade de resultados */}
            <div className="text-sm text-gray-500 font-normal">
                {fromRecord} a {toRecord} <span className="mx-2 text-gray-300">|</span> <span className="font-medium text-gray-700">{qtdeResultados}</span>
            </div>

            {/* Paginação dos registros */}
            <div className="flex justify-end">
                <Pagination>
                    <PaginationContent className="gap-1">
                        <PaginationItem>
                            <Button variant="outline" size="sm"
                                disabled={currentPage === 1}
                                onClick={() => onPageChange(currentPage - 1)}
                                className="h-9 w-9 rounded-md border border-gray-300 hover:bg-gray-50 text-gray-700"
                            >
                                <ChevronLeft />
                            </Button>
                        </PaginationItem>

                        {/* Renderiza cada página */}
                        {Array.from({ length: maxPages }).map((_, index) => {
                            const pageNumber = index + 1;
                            const isCurrent = currentPage == pageNumber;

                            return (
                                <PaginationItem key={pageNumber}>
                                    <PaginationLink
                                        href="#"
                                        isActive={isCurrent}
                                        className={`h-9 w-9 rounded-md font-medium transition colors
                                            ${isCurrent
                                                ? "bg-brand-base text-white hover:bg-brand-dark"
                                                : "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                                            }`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onPageChange(pageNumber);
                                        }}
                                    >
                                        {pageNumber}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}

                        {/* Botão de próxima página */}
                        <PaginationItem>
                            <Button variant="outline" size="sm"
                                disabled={currentPage >= maxPages || maxPages === 0}
                                onClick={() => onPageChange(currentPage + 1)}
                                className="h-9 w-9 rounded-md border border-gray-300 hover:bg-gray-50 text-gray-700"
                            >
                                <ChevronRight />
                            </Button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}