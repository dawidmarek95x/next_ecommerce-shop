"use client";
import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributeAnchorTarget } from "react";
import clsx from "clsx";

export const ActiveLink = <T extends string>({
	activeClassName,
	children,
	className,
	exact = true,
	href,
	inactiveClassName,
	prefetch = true,
	replace = false,
	target,
}: {
	activeClassName?: string;
	children: React.ReactNode;
	className?: string;
	exact?: boolean;
	href: Route<T> | URL;
	inactiveClassName?: string;
	prefetch?: boolean;
	replace?: boolean;
	target?: HTMLAttributeAnchorTarget;
}) => {
	const pathname = usePathname();

	const isActive = exact
		? pathname === href
		: pathname?.startsWith(href as string);

	return (
		<Link
			className={clsx(
				className,
				isActive ? activeClassName : inactiveClassName,
			)}
			href={href as Route<string>}
			target={target}
			replace={replace}
			prefetch={prefetch}
			role="link"
		>
			{children}
		</Link>
	);
};
