import { useQuery } from "@tanstack/react-query";
import type { DesaResponseArray } from "@/types/desa";
import { api } from "../api";

export function useDesa(debouncedSearch?: string) {
	const data = useQuery<DesaResponseArray>({
		queryKey: ["desaData", debouncedSearch],
		queryFn: async () =>
			await api.get(`desa`, { params: { q: debouncedSearch } }),
	});

	return data;
}
