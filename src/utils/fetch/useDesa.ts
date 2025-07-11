import { useQuery } from "@tanstack/react-query";
import type { DesaResponseArray } from "@/types/desa";
import { api } from "../api";

export function useDesa(debouncedSearch?: string) {
	const fetchDesa = async (
		debouncedSearch?: string,
	): Promise<DesaResponseArray> => {
		const response = await api.get("/desa", {
			params: {
				q: debouncedSearch,
			},
		});
		return response.data;
	};

	const query = useQuery({
		queryKey: ["desaData", debouncedSearch],
		queryFn: async () => fetchDesa(debouncedSearch),
	});

	return query;
}
