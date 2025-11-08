"use client";
import { FC } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Button } from "./ui/button";

// Props interface for the main pagination component
interface PaginationProps {
   pageCount: number; // Total number of pages
}

// Props interface for the arrow buttons
interface PaginationArrowProps {
   direction: "left" | "right"; // Direction of the arrow
   href: string; // URL to navigate to
   isDisabled: boolean; // Whether the arrow should be disabled
}

// Arrow button component for navigation
const PaginationArrow: FC<PaginationArrowProps> = ({
   direction,
   href,
   isDisabled,
}) => {
   const router = useRouter();
   const isLeft = direction === "left";

   // Disable the arrow if it's on the first or last page
   // Base classes for the button, including the dynamic disabled state
   const baseClasses = `
      px-5 py-2.5 rounded-lg bg-gray-100 text-gray-600
      transition-all duration-200 ease-in-out font-semibold text-lg
      hover:bg-gray-200 hover:text-gray-800 hover:-translate-y-0.5
      focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
      ${isDisabled ? "opacity-40 cursor-not-allowed hover:bg-gray-100 hover:text-gray-600 hover:translate-y-0" : ""}`;
   return (
      <Button
         onClick={(e) => {
            e.preventDefault();
            // Use Next.js client-side navigation without scroll reset
            router.push(href, { scroll: false });
         }}
         className={baseClasses}
         aria-disabled={isDisabled}
         disabled={isDisabled}
      >
         {isLeft ? "< Previous" : "Next >"}
      </Button>
   );
};

export function PaginationComponent({ pageCount }: Readonly<PaginationProps>) {
   // Get current URL path and search parameters using Next.js hooks
   const pathname = usePathname();
   const searchParams = useSearchParams();
   // Extract current page from URL params, defaulting to 1 if not present
   const currentPage = Number(searchParams.get("page")) || 1;

   // Helper function to create URLs for pagination
   const createPageURL = (pageNumber: number | string) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", pageNumber.toString());
      return `${pathname}?${params.toString()}`; // Combines current path with updated page parameter
   };

   return (
      <nav role="navigation" aria-label="Pagination" className="flex justify-center py-4 text-2xl">
         <ul className="flex items-center gap-3 list-none p-0 m-0">
            {/* Left arrow - disabled if on first page */}
            <li>
               <PaginationArrow
                  direction="left"
                  href={createPageURL(currentPage - 1)}
                  isDisabled={currentPage <= 1}
               />
            </li>
            {/* Current page indicator */}
            <li>
               <span className="px-4 py-2.5 font-semibold text-gray-700 min-w-10 text-center
               bg-gray-200 rounded-lg shadow-sm">{currentPage} </span>
            </li>
            {/* Right arrow - disabled if on last page */}
            <li>
               <PaginationArrow
                  direction="right"
                  href={createPageURL(currentPage + 1)}
                  isDisabled={currentPage >= pageCount}
               />
            </li>
         </ul>
      </nav>
   );
}
