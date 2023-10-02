import { Route } from "next";
import { ActiveLink } from "../atoms/ActiveLink";

export const Pagination = <T extends string>({
	totalResults,
	currentPage,
	adjacentPageCount,
	resultsPerPage,
	basePath,
	searchParams = {},
}: {
	totalResults: number;
	currentPage: number;
	adjacentPageCount: number;
	resultsPerPage: number;
	basePath: T;
	searchParams?: { [s: string]: string | undefined };
}) => {
	const totalPages = Math.ceil(totalResults / resultsPerPage);
	const startPage = Math.max(1, currentPage - adjacentPageCount);
	const endPage = Math.min(totalPages, currentPage + adjacentPageCount);

	const pages = [];
	for (let i = startPage; i <= endPage; i++) {
		pages.push(i);
	}

	const params = Object.entries(searchParams)
		.map(([key, value]) => `${key}=${value}`)
		.join("&");

	return (
		<nav
			className="mt-4 flex justify-center space-x-2"
			role="navigation"
			aria-label="Pagination Navigation"
		>
			<ul className="flex">
				{currentPage > 1 && (
					<li className="me-2">
						<ActiveLink
							href={
								`${basePath}/${(currentPage - 1).toString()}${
									searchParams && `?${params}`
								}` as Route<T>
							}
							className="rounded-md border border-sky-700 bg-sky-700 px-2 py-1 text-white hover:border-sky-500 hover:bg-sky-500"
						>
							Previous
						</ActiveLink>
					</li>
				)}
				{pages.map((page, idx) => (
					<li key={idx} className={`me-2 ${page === endPage && "me-0"}`}>
						<ActiveLink
							href={
								`${basePath}/${page.toString()}${
									searchParams && `?${params}`
								}` as Route<T>
							}
							className="rounded-md border border-sky-700 px-2 py-1 hover:bg-sky-700 hover:text-white"
							activeClassName="bg-sky-700 text-white"
							inactiveClassName="bg-white text-sky-700"
						>
							{page}
						</ActiveLink>
					</li>
				))}
				{currentPage < totalPages && (
					<li className="ms-2">
						<ActiveLink
							href={
								`${basePath}/${(currentPage + 1).toString()}${
									searchParams && `?${params}`
								}` as Route<T>
							}
							className="rounded-md border border-sky-700 bg-sky-700 px-2 py-1 text-white hover:border-sky-500 hover:bg-sky-500"
						>
							Next
						</ActiveLink>
					</li>
				)}
			</ul>
		</nav>
	);
};
