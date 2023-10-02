import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<Response> {
	const body: unknown = await request.json();

	if (
		typeof body === "object" &&
		body &&
		"productId" in body &&
		typeof body.productId === "string"
	) {
		body.productId;
		revalidatePath(`/product/${body.productId}`);
		revalidatePath(`/products`);

		return NextResponse.json({}, { status: 201 });
	}

	return NextResponse.json({ message: "Invalid" }, { status: 400 });
}
