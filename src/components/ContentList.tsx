import { ArticleProps } from "@/types";
import { getContent } from "@/data/loaders";

import { PaginationComponent } from "./PaginationComponent";
import { Search } from "@/components/Search";

interface ContentListProps {
   headline: string;
   query?: string;
   path: string;
   featured?: boolean;
   component: React.ComponentType<ArticleProps & { basePath: string }>;
   headlineAlignment?: "center" | "right" | "left";
   showSearch?: boolean;//whether to show search bar or not
   page?: string;
   showPagination?: boolean;//this property is to show or hide pagination component
}

async function loader(path: string, featured?: boolean, query?: string, page?: string) {
   const { data, meta } = await getContent(path, featured, query, page);
   return {
      articles: (data as ArticleProps[]) || [],
      pageCount: meta.pagination.pageCount || 1,
   };
}

export async function ContentList({
   headline,
   path,
   featured,
   component,
   headlineAlignment = "left",
   showSearch,
   query,
   page,
   showPagination,
}: Readonly<ContentListProps>) {
   const { articles, pageCount } = await loader(path, featured, query, page);

   // Utility for text alignment class
   const alignClass = headlineAlignment === 'center' ? 'text-center' :
      headlineAlignment === 'right' ? 'text-right' :
         'text-left';
   const Component = component;
   return (
      <section className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
         <h3 className={`text-3xl font-bold mb-6 ${alignClass}`}>
            {headline || "Featured Articles"}
         </h3>
         {showSearch && <Search />}
         {/* Tailwind Grid: The key to the layout: 1 column on small, 2 on medium, 3 on large screens */}
         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
               <Component key={article.documentId} {...article} basePath={path} />
            ))}
         </div>
         {/* Pagination Component - shown only if showPagination is true */}
         {showPagination && <PaginationComponent pageCount={pageCount} />}
      </section>
   );
}
