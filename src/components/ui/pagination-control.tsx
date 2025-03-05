import * as React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationControlProps {
  totalRecord: number;
  pageSize: number;
  page: number;
  setPage: (page: number) => void;
  siblingCount?: number;
}

const PaginationControl: React.FC<PaginationControlProps> = ({
  totalRecord,
  pageSize,
  page,
  setPage,
  siblingCount = 1,
}) => {
  const totalPages = Math.ceil(totalRecord / pageSize);

  // Generate page numbers based on current page and siblingCount
  const generatePagination = () => {
    // Always show first and last page
    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    // Calculate left and right siblings
    const leftSiblingIndex = Math.max(page - siblingCount, firstPageIndex);
    const rightSiblingIndex = Math.min(page + siblingCount, lastPageIndex);

    // Determine whether to show left and right dots/ellipsis
    const shouldShowLeftDots = leftSiblingIndex > firstPageIndex + 1;
    const shouldShowRightDots = rightSiblingIndex < lastPageIndex - 1;

    // Initialize array to store page items
    const pageItems = [];

    // Add the first page
    if (firstPageIndex !== leftSiblingIndex) {
      pageItems.push(firstPageIndex);
    }

    // Add left dots if needed
    if (shouldShowLeftDots) {
      pageItems.push("leftDots");
    }

    // Add the page range around current page
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      pageItems.push(i);
    }

    // Add right dots if needed
    if (shouldShowRightDots) {
      pageItems.push("rightDots");
    }

    // Add the last page
    if (lastPageIndex !== rightSiblingIndex) {
      pageItems.push(lastPageIndex);
    }

    return pageItems;
  };

  const paginationRange = generatePagination();

  // If there's only one page, don't render pagination
  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setPage(Math.max(1, page - 1))}
            aria-disabled={page <= 1}
            tabIndex={page <= 1 ? -1 : 0}
            className={page <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === "leftDots" || pageNumber === "rightDots") {
            return (
              <PaginationItem key={`${pageNumber}-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          // Cast to number as we know it's not a string at this point
          const pageNum = pageNumber as number;
          return (
            <PaginationItem key={pageNum}>
              <PaginationLink
                isActive={page === pageNum}
                onClick={() => setPage(pageNum)}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            aria-disabled={page >= totalPages}
            tabIndex={page >= totalPages ? -1 : 0}
            className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControl;