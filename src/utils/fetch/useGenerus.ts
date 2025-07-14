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
	pagination?: { pageIndex: number; pageSize: number },
) {
	const fetchGenerus = async (
		debouncedSearch?: string,
		jenisKelaminParam?: string,
		jenjangParam?: string,
		pendidikanTerakhirParam?: string,
		sambungParam?: string,
		keteranganParam?: string,
		pagination?: { pageIndex: number; pageSize: number },
	): Promise<GenerusResponseArray> => {
		const response = await api.get("/generus", {
			params: {
				q: debouncedSearch,
				jenis_kelamin: jenisKelaminParam,
				jenjang: jenjangParam,
				pendidikan_terakhir: pendidikanTerakhirParam,
				sambung: sambungParam,
				keterangan: keteranganParam,
				page: pagination?.pageIndex,
				limit: pagination?.pageSize,
			},
		});
		return response.data;
	};

	const data = useQuery({
		queryKey: [
			"generusData",
			debouncedSearch,
			jenisKelaminParam,
			jenjangParam,
			pendidikanTerakhirParam,
			sambungParam,
			keteranganParam,
			pagination,
		],
		queryFn: () =>
			fetchGenerus(
				debouncedSearch,
				jenisKelaminParam,
				jenjangParam,
				pendidikanTerakhirParam,
				sambungParam,
				keteranganParam,
				pagination,
			),
	});

	return data;
}
