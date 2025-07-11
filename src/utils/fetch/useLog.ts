import { useQuery } from "@tanstack/react-query";
import type { LogResponseArray } from "@/types/log";
import { api } from "../api";

export function useLog(debouncedSearch?: string) {
	const data = useQuery<LogResponseArray>({
		queryKey: ["logData", debouncedSearch],
		queryFn: () => api.get(`/log`, { params: { q: debouncedSearch } }),
	});

	return data;
}
