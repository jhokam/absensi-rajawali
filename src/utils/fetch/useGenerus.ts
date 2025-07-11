import { useQuery } from "@tanstack/react-query";
import type { GenerusResponseArray } from "@/types/generus";
import { api } from "../api";

export function useGenerus(
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
		queryFn: async () =>
			await api.get(`generus`, {
				params: {
					q: debouncedSearch,
					jenis_kelamin: jenisKelaminParam,
					jenjang: jenjangParam,
					pendidikan_terakhir: pendidikanTerakhirParam,
					sambung: sambungParam,
					keterangan: keteranganParam,
				},
			}),
	});

	return data;
}
