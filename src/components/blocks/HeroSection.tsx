import Link from "next/link";
import { StrapiImage } from "../StrapiImage";
import { HeroSectionProps } from "@/types";
import { Button } from "../ui/button";

export function HeroSection({
	heading,
	cta,
	image,
	logo,
	darken = false,
}: Readonly<HeroSectionProps>) {
	return (
		<section className="relative h-[90vh]">
			{/* Background image */}
			<div className="absolute inset-0 z-0 rounded-b-[80px] overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)]">
				<StrapiImage
					src={image.url}
					alt={image.alternativeText || "No alternative text provided"}
					className="absolute inset-0 w-full h-full object-cover"
					fill
				/>
				{darken && <div className="absolute inset-0 bg-black/50 z-10" />}
			</div>

			{/* Content */}
			<div className="relative z-20 flex flex-col items-start justify-center h-full px-10 text-white">
				<h1 className="text-4xl md:text-6xl font-semibold mb-6 leading-tight">
					{heading}
				</h1>
				{cta && (
					<Button
						asChild
						className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-6 py-3 rounded-full"
					>
						<Link href={cta.href}>{cta.text}</Link>
					</Button>
				)}
			</div>
			{/* Overlapping logo */}
			{logo && (
				<div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 z-30">
					<div className="bg-gray-300 p-4 rounded-full shadow-lg z-100">
						<StrapiImage
							src={logo.image.url}
							alt={
								logo.image.alternativeText ||
								"No alternative text provided"
							}
							className="rounded-full"
							width={100}
							height={100}
						/>
					</div>
				</div>
			)}
		</section>
	);
}
