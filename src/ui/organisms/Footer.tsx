// import clsx from "clsx";
// import Link from "next/link";
import React from "react";

export async function Footer() {
	// const listItemStyles = "mb-2 last:mb-0";
	// const linkStyles = "hover:text-blue-300";

	return (
		<footer className="bg-black p-5 text-sm text-white">
			{/* <div className="mb-5">
				<ul>
					<li className={clsx(listItemStyles)}>
						<Link className={clsx(linkStyles)} href="/privacy-policy">
							Privacy Policy
						</Link>
					</li>
					<li className={clsx(listItemStyles)}>
						<Link className={clsx(linkStyles)} href="/terms-and-conditions">
							Terms and conditions
						</Link>
					</li>
				</ul>
			</div> */}
			<p className="text-center text-sm text-slate-100">©2023 DM Developer</p>
		</footer>
	);
}
