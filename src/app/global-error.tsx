"use client";

import { useEffect } from "react";

export default function GlobalErrorPage({
	error,
	reset,
}: {
	error: Error & { digest: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="py-8">
			<h2 className="mb-6 text-center text-3xl font-bold">
				There was an error!
			</h2>
			<p className="mx-auto mb-6 max-w-3xl px-8 text-justify lg:max-w-4xl xl:max-w-5xl">
				{error.message}
			</p>
			<button onClick={() => reset()}>Try again</button>
		</div>
	);
}
