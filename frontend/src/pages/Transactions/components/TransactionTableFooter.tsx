import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function TransactionTableFooter() {
    return (
        <div className="w-full mx-auto flex items-center justify-between py-4">

            <div className="text-sm text-gray-500 font-normal">
                1 a 10 <span className="mx-2 text-gray-300">|</span> <span className="font-medium text-gray-700">27 resultados</span>
            </div>

            <div className="flex justify-end">
                <Pagination>
                    <PaginationContent className="gap-1">
                        <PaginationItem>
                            <PaginationLink href="#" className="h-9 w-9 rounded-md border border-gray-300 hover:bg-gray-50 text-gray-700">
                                <ChevronLeft />
                            </PaginationLink>
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationLink href="#" isActive className="h-9 w-9 rounded-md bg-brand-base text-white font-medium hover:bg-brand-dark">
                                1
                            </PaginationLink>
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationLink href="#" className="h-9 w-9 rounded-md border border-gray-300 hover:bg-gray-50 text-gray-700">
                                2
                            </PaginationLink>
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationLink href="#" className="h-9 w-9 rounded-md border border-gray-300 hover:bg-gray-50 text-gray-700">
                                3
                            </PaginationLink>
                        </PaginationItem>

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