import { notFound } from "next/navigation";
import { getPageBySlug } from "@/data/loaders";
import { BlockRenderer } from "@/components/BlockRenderer";

async function loader(slug: string) {
	const { data } = await getPageBySlug(slug);
	if (data.length === 0) notFound();
	return { blocks: data[0]?.blocks };
}

type BrokenNextJsParams = { slug: string } & {
	// Add the properties the compiler is complaining are missing from Promise<any>
	then: never;
	catch: never;
	finally: never;
	[Symbol.toStringTag]: 'Promise';
};

// Use the structural workaround type for the component's props.
export default async function DynamicPageRoute({ params

}: {
	// We cast the expected parameter type to our workaround type.
	params: BrokenNextJsParams
}) {
	// The code inside remains clean and synchronous, as 'params.slug' is accessible.
	const slug = await params.slug;

	const { blocks } = await loader(slug);
	return <BlockRenderer blocks={blocks} />;
}

