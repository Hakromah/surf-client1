import React from "react";
import type { HeadingProps } from "@/types";
export function Heading({ heading, linkId }: Readonly<HeadingProps>) {

	const textSize = "clamp(20px, 4vw, 48px)";
	return (
		<h2
			style={{ fontSize: textSize }}
			className="!text-[] [scroll-margin-top:100px]
			md:mx-auto flex max-md:text-center px-5 justify-center pb-3 md:py-12 w-full md:max-w-[50%] text-gray-900 font-serif font-extrabold"
			id={linkId}
		>
			{heading}
		</h2>
	);
}
