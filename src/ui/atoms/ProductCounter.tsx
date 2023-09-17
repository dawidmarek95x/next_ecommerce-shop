"use client";

import { useState } from "react";

export const ProductCounter = () => {
	const [counter, setCounter] = useState(0);

	return (
		<div>
			<button
				className="border border-slate-200 px-4"
				onClick={() => setCounter((counter) => counter - 1)}
			>
				-
			</button>
			<input
				className="border border-slate-200"
				type="text"
				readOnly
				value={counter}
			/>
			<button
				className="border border-slate-200 px-4"
				onClick={() => setCounter((counter) => counter + 1)}
			>
				+
			</button>
		</div>
	);
};
