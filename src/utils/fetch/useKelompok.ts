import { useQuery } from "@tanstack/react-query";
import type { KelompokResponseArray } from "@/types/kelompok";
import { api } from "../api";

export function useKelompok(
	debouncedSearch?: string,
	pagination?: { pageIndex: number; pageSize: number },
) {
	const fetchKelompok = async (
		debouncedSearch?: string,
		pagination?: { pageIndex: number; pageSize: number },
	): Promise<KelompokResponseArray> => {
		const response = await api.get("/kelompok", {
			params: {
				q: debouncedSearch,
				page: pagination?.pageIndex,
				limit: pagination?.pageSize,
			},
		});
		return response.data;
	};

	const data = useQuery({
		queryKey: ["kelompokData", debouncedSearch, pagination],
		queryFn: () => fetchKelompok(debouncedSearch, pagination),
	});

	return data;
}
