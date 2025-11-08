import type { ArticleProps, Block } from "@/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/utils/format-date";
import { getContentBySlug } from "@/data/loaders";

import { HeroSection } from "@/components/blocks/HeroSection";
import { BlockRenderer } from "@/components/BlockRenderer";
import { Card, type CardProps } from "@/components/Card";
import { ContentList } from "@/components/ContentList";

interface PageProps {
   params: { slug: string };
}

async function loader(slug: string) {
   const { data } = await getContentBySlug(slug, "/api/articles");
   const article = data[0]; // Assuming the article is the first item in the returned data array
   if (!article) throw notFound();
   return { article: article as ArticleProps, blocks: article?.blocks };
}

interface ArticleOverviewProps {
   headline: string;
   description: string;
   tableOfContent: { heading: string, linkId: string }[];
}

function ArticleOverview({
   headline,
   description,
   tableOfContent
}: Readonly<ArticleOverviewProps>) {
   return (
      <div className="mx-4 flex justify-between w-[80%] mt-[1rem] mb-[6rem]">
         <div className="w-[45%]">
            <h3 className="mb-[2rem] text-[#333]">{headline}</h3>
            <p className="text-[#666] font-[2.4rem] leading-[1.5rem]">{description}</p>
         </div>
         {tableOfContent && tableOfContent.length > 0 && (
            <div className="w-[40%] pl-[2rem] border-l-[1px] border-l-[#ddd]">
               <h4 className="mb-[1rem] text-[#333] font-bold">Table of Contents</h4>
               <ul className="list-none list-inside text-[#666]">
                  {tableOfContent.map((item, index) => (
                     <li key={index} className="mb-[0.5rem]">
                        <Link href={`#${item.linkId}`} className="text-[#666] hover:underline">
                           {index + 1}. {item.heading}
                        </Link>
                     </li>
                  ))}
               </ul>
            </div>
         )}
      </div>
   );
}

const BlogCard = (props: Readonly<CardProps>) => <Card {...props} basePath="blog" />;

export default async function SingleBlogRoute({ params }: PageProps) {
   const slug = params.slug;
   const { article, blocks } = await loader(slug);
   const { title, author, publishedAt, description, image } = article;

   console.dir(blocks, { depth: null });

   const tableOfContent = blocks?.filter(
      (block: Block) => block.__component === "blocks.heading"
   );

   return (
      <div>
         <HeroSection
            id={article.id}
            heading={title}
            theme="orange"
            image={image}
            author={author}
            publishedAt={formatDate(publishedAt)}
            darken={true}
         />
         <div>
            <ArticleOverview headline={title} description={description} tableOfContent={tableOfContent} />
            <BlockRenderer blocks={blocks} />
            <ContentList
               headline="Checkout Our Latest Blog Posts"
               path="/api/articles"
               component={BlogCard}
               featured={true}
               headlineAlignment="center"
            />
         </div>
      </div>

   );
}
