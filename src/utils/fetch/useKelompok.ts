import { useQuery } from "@tanstack/react-query";
import type { KelompokResponseArray } from "@/types/kelompok";
import { api } from "../api";

export function useKelompok(debouncedSearch?: string) {
	const fetchKelompok = async (
		debouncedSearch?: string,
	): Promise<KelompokResponseArray> => {
		const response = await api.get("/kelompok", {
			params: {
				q: debouncedSearch,
			},
		});
		return response.data;
	};

	const data = useQuery({
		queryKey: ["kelompokData", debouncedSearch],
		queryFn: () => fetchKelompok(debouncedSearch),
	});

	return data;
}
