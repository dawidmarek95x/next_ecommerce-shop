"use client";
import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributeAnchorTarget } from "react";
import clsx from "clsx";
import { UrlObject } from "url";

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
	href: Route<T> | UrlObject;
	inactiveClassName?: string;
	prefetch?: boolean;
	replace?: boolean;
	target?: HTMLAttributeAnchorTarget;
}) => {
	const pathname = usePathname();

	const matchedPath =
		(typeof href === "string"
			? href.includes("?")
				? href.split("?")[0]
				: href
			: href.pathname) ?? null;

	const isActive =
		(matchedPath &&
			pathname &&
			(exact ? pathname === matchedPath : pathname.startsWith(matchedPath))) ||
		false;

	const ariaCurrent = isActive ? "page" : undefined;

	return (
		<Link
			className={clsx(
				className,
				isActive ? activeClassName : inactiveClassName,
			)}
			href={href}
			target={target}
			replace={replace}
			prefetch={prefetch}
			role="link"
			aria-current={ariaCurrent}
		>
			{children}
		</Link>
	);
};
