import { useQuery } from "@tanstack/react-query";
import type { KelompokResponseArray } from "@/types/kelompok";
import { api } from "../api";

export function useKelompok(debouncedSearch?: string) {
	const data = useQuery<KelompokResponseArray>({
		queryKey: ["kelompokData", debouncedSearch],
		queryFn: () => api.get(`/kelompok`, { params: { q: debouncedSearch } }),
	});

	return data;
}
