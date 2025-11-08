import { notFound } from "next/navigation";
import { getPageBySlug } from "@/data/loaders";
import { BlockRenderer } from "@/components/BlockRenderer";

async function loader(slug: string) {
	const { data } = await getPageBySlug(slug);
	if (data.length === 0) notFound();
	return { blocks: data[0]?.blocks };
}

interface PageProps {
	params: { slug: string };
}

export default async function DynamicPageRoute({ params }: PageProps) {
	const { slug } = params;
	const { blocks } = await loader(slug);
	return <BlockRenderer blocks={blocks} />;
}
