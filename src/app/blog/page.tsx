/* eslint-disable @typescript-eslint/no-unused-vars */
import { BlockRenderer } from "@/components/BlockRenderer";
import { ContentList } from "@/components/ContentList";
import { getPageBySlug } from "@/data/loaders";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/BlogCard";

async function loader(slug: string) {
  const { data } = await getPageBySlug(slug);
  if (data.length === 0) notFound();
  return { blocks: data[0]?.blocks };
}

interface PageProps {
  searchParams: Promise<{ page?: string; query: string }>;
}

export default async function BlogRoute({ searchParams }: PageProps) {
  const { page, query } = await searchParams;
  const { blocks } = await loader("blog");

  return <div className="container mx-auto px-4 pt-[calc(var(--header-height))] pb-16 lg:pb-24 w-full">
    <BlockRenderer blocks={blocks} />
    <ContentList
      headline="Checkout Our Latest Blog Posts"
      path="/api/articles"
      component={BlogCard}
      showSearch
      query={query}
      showPagination
      page={page}
      headlineAlignment="center"
    />
  </div>
}
