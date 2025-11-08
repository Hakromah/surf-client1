"use client";

import Link from "next/link";
import { StrapiImage } from "../StrapiImage";
import type { LinkProps, LogoProps } from "@/types";

interface FooterProps {
	data: {
		logo: LogoProps;
		navigation: LinkProps[];
		policies: LinkProps[];
		copy: string;
	};
}

export function Footer({ data }: FooterProps) {
	if (!data) return null;

	const { logo, navigation, policies, copy } = data;

	return (
		<footer className="w-full bg-gradient-to-b from-gray-900 to-black text-gray-300 border-t border-gray-800">
			<div className="mx-auto w-[90%] max-w-[1280px] flex flex-col md:flex-row items-center md:items-start justify-between gap-10 py-12">

				{/* Logo + Navigation */}
				<div className="flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
					{/* Logo */}
					<StrapiImage
						src={logo.image.url}
						alt={logo.image.alternativeText || 'Footer logo'}
						width={100}
						height={100}
						className="w-20 h-auto object-contain transition-transform hover:scale-105"
					/>

					{/* Navigation */}
					<ul className="flex flex-wrap items-center justify-center md:justify-start gap-6">
						{navigation.map((item) => (
							<li key={item.id}>
								<Link
									href={item.href}
									target={item.isExternal ? '_blank' : '_self'}
									className="
									text-sm font-medium text-gray-400 hover:text-white
									transition-all duration-300
									hover:scale-105
								"
								>
									{item.text}
								</Link>
							</li>
						))}
					</ul>
				</div>

				{/* Policies + Copyright */}
				<div className="flex flex-col items-center md:items-end text-center md:text-right gap-4">
					<ul className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
						{policies.map((item) => (
							<li key={item.id}>
								<Link
									href={item.href}
									target={item.isExternal ? '_blank' : '_self'}
									className="
									text-gray-400 hover:text-white
									transition-all duration-300 hover:underline underline-offset-4
								"
								>
									{item.text}
								</Link>
							</li>
						))}
					</ul>

					<p className="text-xs text-gray-500">
						&copy; {new Date().getFullYear()} {copy}. All rights reserved.
					</p>
				</div>
			</div>

			{/* Decorative Divider or Accent */}
			<div className="h-[1px] w-[80%] mx-auto bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-40"></div>

			{/* Optional: Social Icons Section */}
			<div className="mt-8 flex justify-center gap-6 pb-8">
				{/* Example Icons — Replace with your social links */}
				<Link href="https://www.linkedin.com/in/hassan-s-kromah-95021b102/" target="_blank" className="hover:text-purple-400 transition-colors">
					<i className="ri-twitter-fill text-xl">linkedin</i>
				</Link>
				<Link href="https://github.com/Hakromah" className="hover:text-purple-400 transition-colors" target="_blank">
					<i className="ri-instagram-fill text-xl">github</i>
				</Link>
				<Link href="/" className="hover:text-purple-400 transition-colors">
					<i className="ri-github-fill text-xl">instagram</i>
				</Link>
			</div>
		</footer>
	);
}
