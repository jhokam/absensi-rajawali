import { useQuery } from "@tanstack/react-query";
import type { LogResponseArray } from "@/types/log";
import { api } from "../api";

export function useLog(debouncedSearch?: string) {
	const fetchLog = async (
		debouncedSearch?: string,
	): Promise<LogResponseArray> => {
		const response = await api.get("/log", {
			params: {
				q: debouncedSearch,
			},
		});
		return response.data;
	};

	const data = useQuery({
		queryKey: ["logData", debouncedSearch],
		queryFn: () => fetchLog(debouncedSearch),
	});

	return data;
}
