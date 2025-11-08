"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";//npm

export function Search() {
   // Get access to URL search parameters, routing, and current pathname
   const searchParams = useSearchParams();
   const { replace } = useRouter();
   const pathname = usePathname();

   // Create a debounced search handler that only triggers 300ms after the user stops typing
   const handleSearch = useDebouncedCallback((term: string) => {
      // Create a new URLSearchParams instance with current params
      const params = new URLSearchParams(searchParams);
      // Reset to first page whenever search term changes
      params.set("page", "1");

      // Update URL search parameters based on search term
      if (term) {
         params.set("query", term);
      } else {
         params.delete("query");
      }

      // Update the URL without triggering a page refresh
      // scroll: false prevents the page from jumping to top
      replace(`${pathname}?${params.toString()}`, { scroll: false });
   }, 300);

   return (
      <div className="mb-12 w-full max-w-[50rem] mx-auto">
         <input
            type="text"
            placeholder="Search"
            className="w-full bg-white py-1 px-2 border-[1px] border-gray-300 rounded-lg text-[16px] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none  transition duration-150 ease-in-out"
            // Call handleSearch whenever input value changes
            onChange={(e) => handleSearch(e.target.value)}
            // Initialize input with existing search query from URL
            defaultValue={searchParams.get("query")?.toString()}
         />
      </div>
   );
}
