import { BlockRenderer } from "@/components/BlockRenderer";
import { ContentList } from "@/components/ContentList";
import { getHomePage } from "@/data/loaders";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/BlogCard";
async function loader() {
	const data = await getHomePage();
	if (!data) notFound();

	console.log(data);
	return { ...data };
}

export default async function HomeRoute() {
	const data = await loader();

	const blocks = data.blocks || [];

	console.dir(data, { depth: null });
	return (
		<div>
			<BlockRenderer blocks={blocks} />
			<div className="container mx-auto my-20">
				<ContentList
					headline="Checkout Our Featured Articles"
					path="/api/articles"
					component={BlogCard}
					featured
					headlineAlignment="center"
				/>
			</div>
		</div>
	);
}

