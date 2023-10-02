import { HTMLAttributes } from "react";
import { RatingRadioFormField } from "../atoms/RatingRadioFormField";
import { addReviewToProductAction } from "@/lib/actions/addReviewToproductAction";

interface ReviewFormProps extends HTMLAttributes<HTMLDivElement> {
	header: string;
	description: string;
	productId: string;
}

export default async function ReviewForm({
	header,
	description,
	productId,
	...props
}: ReviewFormProps) {
	return (
		<div {...props}>
			{header && (
				<h3 className="text-lg font-medium text-gray-900">{header}</h3>
			)}
			{description && (
				<p className="mt-1 text-sm text-gray-600">{description}</p>
			)}
			<form
				action={addReviewToProductAction}
				className="mt-2 flex flex-col gap-y-2"
				data-testid="add-review-form"
			>
				<label htmlFor="productId" className="sr-only">
					Product
				</label>
				<input
					id="productId"
					type="hidden"
					name="productId"
					value={productId}
				/>

				<label>
					<span className="text-xs text-gray-700">Review title</span>
					<input
						className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm font-light shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
						name="headline"
						required
					/>
				</label>

				<label>
					<span className="text-xs text-gray-700">Review content</span>
					<textarea
						rows={2}
						className="mt-1 block max-h-48 min-h-[2.5rem] w-full rounded-md border border-gray-300 p-2 text-sm font-light shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
						name="content"
						required
					></textarea>
				</label>

				<div>
					<span className="text-xs text-gray-700">Rating</span>
					<fieldset className="flex flex-row-reverse justify-end">
						<RatingRadioFormField name="rating" required={true} />
					</fieldset>
				</div>

				<label>
					<span className="text-xs text-gray-700">Name</span>
					<input
						className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm font-light shadow-sm outline-none focus:border-blue-500 focus:ring  focus:ring-blue-400 focus:ring-opacity-50"
						name="name"
						required
					/>
				</label>

				<label>
					<span className="text-xs text-gray-700">E-mail</span>
					<input
						className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm font-light shadow-sm outline-none focus:border-blue-500 focus:ring  focus:ring-blue-400 focus:ring-opacity-50"
						type="email"
						name="email"
						required
					/>
				</label>

				<button
					type="submit"
					className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-8 py-2 text-sm font-medium text-gray-50 hover:bg-gray-700 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
				>
					Submit review
				</button>
			</form>
		</div>
	);
}
