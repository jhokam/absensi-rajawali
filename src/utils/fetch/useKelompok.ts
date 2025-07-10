import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { KelompokResponseArray } from "@/types/kelompok";
import { api } from "../api";

export function useKelompok(
	params?: URLSearchParams,
	debouncedSearch?: string,
) {
	const data = useQuery<KelompokResponseArray>({
		queryKey: ["kelompokData", debouncedSearch],
		queryFn: () => api(`/kelompok?${params?.toString()}`),
		placeholderData: keepPreviousData,
	});

	return data;
}
