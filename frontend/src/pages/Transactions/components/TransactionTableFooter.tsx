import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TransactionTableFooterProps {
    className?: string;
    totalCount: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    limit?: number;
}

export function TransactionTableFooter({ className, totalCount, currentPage, onPageChange, limit }: TransactionTableFooterProps) {
    const maxPages = Math.ceil(totalCount / limit);
    const qtdeResultados = `${totalCount} ${totalCount === 1 ? "resultado" : "resultados"}`;

    const fromRecord = totalCount === 0 ? 0 : (currentPage - 1) * limit + 1;
    const toRecord = Math.min(currentPage * limit, totalCount);

    return (
        <div className={`${className} w-full bg-white mx-auto flex items-center justify-between py-4`}>

            <div className="text-sm text-gray-500 font-normal">
                {fromRecord} a {toRecord} <span className="mx-2 text-gray-300">|</span> <span className="font-medium text-gray-700">{qtdeResultados}</span>
            </div>

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