import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { DesaResponseArray } from "@/types/desa";
import { api } from "../api";

export function useDesa(params?: URLSearchParams, debouncedSearch?: string) {
	const data = useQuery<DesaResponseArray>({
		queryKey: ["desaData", debouncedSearch],
		queryFn: () => api(`/desa?${params?.toString()}`),
		placeholderData: keepPreviousData,
	});

	return data;
}
