"use client";

import { useRouter } from "next/navigation";
import React from "react";

export function CartModalOverlay() {
	const router = useRouter();

	return (
		<div
			onClick={() => router.back()}
			className="absolute inset-0 bg-gray-100 bg-opacity-75"
		></div>
	);
}
