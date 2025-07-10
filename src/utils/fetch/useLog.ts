import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { LogResponseArray } from "@/types/log";
import { api } from "../api";

export function useLog(params?: URLSearchParams, debouncedSearch?: string) {
	const data = useQuery<LogResponseArray>({
		queryKey: ["logData", debouncedSearch],
		queryFn: () => api(`/log?${params?.toString()}`),
		placeholderData: keepPreviousData,
	});

	return data;
}
