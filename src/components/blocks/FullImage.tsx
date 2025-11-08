import { FullImageProps } from "@/types";
import { StrapiImage } from "@/components/StrapiImage";

export function FullImage({ image }: Readonly<FullImageProps>) {
	return (
		// The container centers the content (mx-auto) and applies vertical margin (my-12) for spacing.
		// It also sets a maximum width (e.g., max-w-4xl or max-w-5xl) to ensure it doesn't span the full screen.
		<div className="my-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
			<StrapiImage
				src={image.url}
				alt={image.alternativeText || "No alternative text provided"}
				// Using a smaller base size and letting Tailwind scale for better performance
				width={1200}
				height={800}
				// 'w-full' ensures the image fills its container (max-w-6xl)
				// 'h-auto' ensures the image maintains its aspect ratio
				className="w-full h-auto object-cover rounded-md shadow-lg"
			/>
			{/* Image Caption Placeholder (based on screenshot) */}
			<p className="text-sm text-gray-500 mt-2 italic text-center">
				Caption for the image. Source by, taken whatever.
			</p>
		</div>
	);
}
