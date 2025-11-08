import Link from "next/link";
import { StrapiImage } from "@/components/StrapiImage";
import ReactMarkdown from "react-markdown";
import { FeaturedArticleProps } from "@/types";

export function FeaturedArticle({
	headline,
	link,
	excerpt,
	image,
}: Readonly<FeaturedArticleProps>) {
	const buttonStyle = "inline-flex items-center cursor-pointer justify-center rounded-lg bg-emerald-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition-colors hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-500/50";

	return (
		<article className="container mx-auto px-4 pt-[calc(var(--header-height)+2rem)] pb-16 lg:pb-24 w-full">
			<div className="grid lg:grid-cols-2 gap-12 items-center max-w-[1920px]">
				{/* Article Info Section */}
				<div className="space-y-6 lg:space-y-8">
					<h3 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">{headline}</h3>
					<div className="text-gray-600 text-lg">
						<ReactMarkdown>{excerpt}</ReactMarkdown>
					</div>
					<Link href={link.href} className={buttonStyle}>
						{link.text}
					</Link>
				</div>
				<div className="rounded-4xl w-full overflow-hidden aspect-square lg:aspect-video h-full">
					<StrapiImage
						src={image.url}
						alt={image.alternativeText || "No alternative text provided"}
						height={400}
						width={600}
						className="h-full w-full object-cover"
					/>
				</div>
			</div>
		</article>
	);
}
