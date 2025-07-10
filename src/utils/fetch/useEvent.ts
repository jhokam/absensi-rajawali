import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { EventResponseArray } from "@/types/event";
import { api } from "../api";

export function useEvent(params?: URLSearchParams, debouncedSearch?: string) {
	const data = useQuery<EventResponseArray>({
		queryKey: ["eventData", debouncedSearch],
		queryFn: () => api(`/event?${params?.toString()}`),
		placeholderData: keepPreviousData,
	});

	return data;
}
