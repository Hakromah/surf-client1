"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { StrapiImage } from "../StrapiImage";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import { LogoProps, LinkProps } from "@/types";

interface HeaderProps {
	data: {
		logo: LogoProps;
		navigation: LinkProps[];
		cta: LinkProps;
	};
}

export function Header({ data }: HeaderProps) {
	const pathname = usePathname();
	const headerLight = pathname === "/experience";

	if (!data) return null;

	const { logo, navigation, cta } = data;

	const buttonStyle = "inline-flex cursor-pointer items-center justify-center rounded-full ml-3 bg-teal-500 hover:bg-teal-600 px-6 py-3 text-base font-semibold text-white transition-colors focus:outline-none focus:ring-4 focus:ring-emerald-500/50 h-12";

	return (

		<header
			className={`fixed top-0 z-50 w-full border-b transition-colors duration-300 mb-4 h-[var(--header-height)] ${headerLight
				? "bg-orange-400 text-white border-b-amber-800"
				: "bg-black text-white border-transparent"
				}`}
		>
			<div className="mx-auto flex max-w-[1920px] w-full items-center justify-between px-6 py-4">
				{/* Logo */}
				<Link href="/" className="flex items-center">
					<StrapiImage
						src={logo.image.url}
						alt={logo.image.alternativeText || "Logo"}
						width={120}
						height={120}
						className="h-auto w-20 object-contain rounded-[50%]"
					/>
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center gap-8">
					{navigation.map((item) => (
						<Link
							key={item.id}
							href={item.href}
							target={item.isExternal ? "_blank" : "_self"}
							className="text-2xl font-bold tracking-wide transition-colors hover:text-primary"
						>
							{item.text}
						</Link>
					))}
				</nav>

				{/* CTA Button (Desktop) */}
				<div className="hidden md:block">
					<Link
						href={cta.href}
						target={cta.isExternal ? "_blank" : "_self"}
					>
						<Button
							size="sm"
							variant={headerLight ? "default" : "secondary"}
							className={buttonStyle}
						>
							{cta.text}
						</Button>
					</Link>
				</div>

				{/* Mobile Menu Trigger */}
				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="togo-btn md:hidden text-current hover:bg-transparent"
						>
							<Menu className="h-5 w-5" />
						</Button>
					</SheetTrigger>

					{/* Mobile Drawer Content */}
					<SheetContent
						className="flex flex-col items-center justify-start w-full sm:w-[320px]
						bg-gradient-to-br from-purple-600 via-purple-500
						to-purple-400 text-white pt-20 pb-10 gap-8 shadow-2xl rounded-l-2xl animate-slideIn"
					>
						{/* 👇 Hidden accessible title to remove warning */}
						<VisuallyHidden>
							<SheetTitle>Mobile navigation menu</SheetTitle>
						</VisuallyHidden>
						{navigation.map((item) => (
							<SheetClose asChild key={item.id}>
								<Link
									href={item.href}
									target={item.isExternal ? "_blank" : "_self"}
									className="text-lg font-semibold tracking-wide text-white/90 hover:text-white
									transition-all duration-300 hover:scale-105"
								>
									{item.text}
								</Link>
							</SheetClose>
						))}
						<SheetClose asChild>
							<Link href={cta.href}
								target={cta.isExternal ? "_blank" : "_self"}>
								<Button className="px-6 py-3 w-[80%] bg-white text-purple-700 font-semibold
								rounded-full shadow-lg hover:bg-purple-100 transition-all
								duration-300 hover:scale-105">{cta.text}</Button>
							</Link>
						</SheetClose>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
}
