import { HeroSection } from "@/components/blocks/HeroSection";
import { InfoBlock } from "@/components/blocks/InfoBlock";
import { Subscribe } from "@/components/blocks/Subscribe";
import type { Block } from "@/types";
import { FeaturedArticle } from "./blocks/FeaturedArticle";
import { Heading } from "@/components/blocks/Heading";
import { ParagraphWithImage } from "@/components/blocks/ParagraphWithImage";
import { Paragraph } from "@/components/blocks/Paragraph";
import { FullImage } from "@/components/blocks/FullImage";

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
	if (!blocks?.length) return null;

	return (
		<>
			{blocks.map((block, index) => {
				// Create a guaranteed unique key by combining id and index
				const uniqueKey = `${block.id}-${index}`;
				switch (block.__component) {
					case "blocks.hero-section":
						return <HeroSection key={uniqueKey} {...block} />;
					case "blocks.info-block":
						return <InfoBlock key={uniqueKey} {...block} />;
					case "blocks.featured-article":
						return <FeaturedArticle key={uniqueKey} {...block} />;
					case "blocks.subscribe":
						return <Subscribe key={uniqueKey} {...block} />;
					case "blocks.heading":
						return <Heading key={uniqueKey} {...block} />;
					case "blocks.paragraph-with-image":
						return <ParagraphWithImage key={uniqueKey} {...block} />;
					case "blocks.paragraph":
						return <Paragraph key={uniqueKey} {...block} />;
					case "blocks.full-image":
						return <FullImage key={uniqueKey} {...block} />;
					default:
						console.warn("⚠️ Unknown block type:", block.__component);
						return null;
				}
			})}
		</>
	);
}

