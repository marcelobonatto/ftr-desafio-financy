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
    const startRange = (currentPage - 1) * limit + 1;
    const endRange = Math.min(currentPage * limit, totalCount);
    const qtdeResultados = `${totalCount} ${totalCount === 1 ? "resultado" : "resultados"}`;

    return (
        <div className={`${className} w-full mx-auto flex items-center justify-between py-4`}>

            <div className="text-sm text-gray-500 font-normal">
                {startRange} a {endRange} <span className="mx-2 text-gray-300">|</span> <span className="font-medium text-gray-700">{qtdeResultados}</span>
            </div>

            <div className="flex justify-end">
                <Pagination>
                    <PaginationContent className="gap-1">
                        <PaginationItem>
                            <PaginationLink href="#" className="h-9 w-9 rounded-md border border-gray-300 hover:bg-gray-50 text-gray-700">
                                <ChevronLeft />
                            </PaginationLink>
                        </PaginationItem>

                        {Array.from({ length: maxPages }).map((_, index) => {
                            const pageNumber = index + 1;

                            return (
                                <PaginationItem key={pageNumber}>
                                    <PaginationLink
                                        href="#"
                                        isActive={currentPage === pageNumber}
                                        className="h-9 w-9 rounded-md bg-brand-base text-white font-medium hover:bg-brand-dark"
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
                            <PaginationLink href="#" className="h-9 w-9 rounded-md border border-gray-300 hover:bg-gray-50 text-gray-700">
                                <ChevronRight />
                            </PaginationLink>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}