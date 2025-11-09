import React from "react";
import { ParagraphProps } from "@/types";
import ReactMarkdown from "react-markdown";

export function Paragraph({ content }: Readonly<ParagraphProps>) {
	return (
		// Set the text color and line height for readability.
		// 'py-4' adds vertical spacing between the heading and the text/list.
		<div className="px-5 md:ml-6 md:mr-2.5 md:w-[80%] md:pt-4 text-gray-700 leading-relaxed text-lg">
			<ReactMarkdown>{content}</ReactMarkdown>
		</div>
	);
}
