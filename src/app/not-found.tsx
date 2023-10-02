import { NotFoundIcon } from "@/ui/icons/NotFoundIcon";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center py-7">
			<div className="mb-6 flex w-full flex-col items-center justify-center text-center lg:w-1/2 lg:px-2 xl:px-0">
				<p className="text-7xl font-bold tracking-wider text-gray-600 md:text-8xl lg:text-9xl">
					<span className="text-blue-400">4</span>0
					<span className="text-blue-400">4</span>
				</p>
				<p className="mt-2 text-4xl font-bold tracking-wider text-gray-400 md:text-5xl lg:text-6xl">
					Page Not Found
				</p>
				<p className="my-3 text-lg text-gray-500 md:text-xl lg:text-2xl">
					Sorry, the page you are looking for could not be found.
				</p>
			</div>
			<div className="flex w-1/2 max-w-screen-sm items-center justify-center">
				<NotFoundIcon className="mx-auto object-cover text-blue-400" />
			</div>
		</div>
	);
}
