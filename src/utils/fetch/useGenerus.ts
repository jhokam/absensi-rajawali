import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { GenerusResponseArray } from "@/types/generus";
import { api } from "../api";

export function useGenerus(
	params?: URLSearchParams,
	debouncedSearch?: string,
	jenisKelaminParam?: string,
	jenjangParam?: string,
	pendidikanTerakhirParam?: string,
	sambungParam?: string,
	keteranganParam?: string,
) {
	const data = useQuery<GenerusResponseArray>({
		queryKey: [
			"generusData",
			debouncedSearch,
			jenisKelaminParam,
			jenjangParam,
			pendidikanTerakhirParam,
			sambungParam,
			keteranganParam,
		],
		queryFn: () => api(`/generus?${params?.toString()}`),
		placeholderData: keepPreviousData,
	});

	return data;
}
