import { ImageProps } from "@/types";

import Link from "next/link";
import { StrapiImage } from "./StrapiImage";
import { formatDate } from "@/utils/format-date";

export interface CardProps {
   documentId: string;
   title: string;
   description: string;
   slug: string;
   image: ImageProps;
   price?: number;
   startDate?: string;
   createdAt: string;
   basePath: string;
}

export function Card({
   title,
   description,
   slug,
   image,
   price,
   createdAt,
   startDate,
   basePath,
}: Readonly<CardProps>) {
   return (
      <Link href={`/${basePath}/${slug}`} className="group block w-full h-full">
         <div className="bg-white border border-gray-100 rounded-xl overflow-hidden
         shadow-lg transition-all duration-300
         hover:shadow-xl hover:scale-[1.01] flex flex-col h-full
            ">
            {/* Image Container: Sets a fixed aspect ratio for consistent card height */}
            <div className="relative aspect-[4/3] w-full overflow-hidden">
               <StrapiImage
                  src={image.url}
                  alt={image.alternativeText || "No alternative text provided"}
                  fill // Use 'fill' to make it responsive within the container
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
               // width={400}
               // height={400}
               />
            </div>
            {/* Text Content Area */}
            <div className="p-4 flex flex-col flex-grow">
               {/* Title */}
               <h5 className="text-base md:text-lg font-semibold leading-snug text-gray-900 mb-2 line-clamp-3">
                  {title}
               </h5>

               {/* Price and Date */}
               <div className="mt-auto pt-1">
                  {price && (
                     <p className="text-sm font-bold text-blue-600">
                        <span>Price: </span>
                        {price}
                     </p>
                  )}
                  {(startDate ?? createdAt) && (
                     <p className="text-xs text-gray-500">
                        {formatDate(startDate ?? createdAt)}
                     </p>
                  )}
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">{description.slice(0, 144)}...</p>
               </div>
            </div>
         </div>
      </Link>
   );
}
