import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { StrapiImage } from "../StrapiImage";

import { InfoBlockProps } from "@/types";
import { Button } from "../ui/button";
export function InfoBlock({
	theme,
	reversed,
	headline,
	content,
	image,
	cta,
}: Readonly<InfoBlockProps>) {
	return (
		<section
			className="md:even:[&_.imageWrapper]:rounded-tl-[42%]
		md:even:[&_.imageWrapper]:rounded-bl-[42%] md:odd:[&_.imageWrapper]:rounded-tr-[42%]
		md:odd:[&_.imageWrapper]:rounded-br-[42%]
		w-full h-full relative mt-12 overflow-hidden md:odd:[&_.imageWrapper]:max-h-[800px] max-md:px-[20px]"
		>
			<div
				className={`md:flex flex-col grid grid-cols-1 ${reversed ? "md:flex-row" : "flex-row-reverse"
					} container w-full max-w-[1920px] px-0 mx-auto items-center gap-6 my-12`}
			>
				<div className="imageWrapper overflow-hidden flex-1 w-full relative max-md:rounded-[15px] max-md:aspect-video">
					<StrapiImage
						src={image.url}
						alt={image.alternativeText || "No alternative text provided"}
						fill
						className="!relative w-full inset-0 object-cover lg:hover:scale-105 transition-all duration-300 ease-in-out"
					/>
				</div>

				<div className="w-full md:w-1/2 flex flex-col gap-4 flex-1 p-6">
					<h2
						className={`text-2xl font-semibold ${theme === "turquoise" ? "text-teal-500" : "text-orange-500"
							}`}
					>
						{headline}
					</h2>

					<div className="prose prose-lg text-gray-800">
						<ReactMarkdown>{content}</ReactMarkdown>
					</div>

					{cta && (
						<Link
							href={cta.href}
							target={cta.isExternal ? "_blank" : "_self"}
						>
							<Button
								className={`bg-${theme === "turquoise" ? "teal" : "orange"
									}-500 hover:bg-${theme === "turquoise" ? "teal" : "orange"
									}-600 text-white font-medium px-6 py-3 rounded-full`}
							>
								{cta.text}
							</Button>
						</Link>
					)}
				</div>
			</div>
		</section>
	);
}
