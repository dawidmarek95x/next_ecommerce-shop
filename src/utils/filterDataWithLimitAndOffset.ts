export function filterDataWithLimitAndOffset<T>(
	data: T[],
	params: { limit?: number; offset?: number },
): T[] {
	const result = data.slice(params.offset ?? 0);

	if (!params.limit) {
		return result;
	}

	return result.slice(0, params.limit);
}
