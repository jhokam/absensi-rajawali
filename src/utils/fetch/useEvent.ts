import { useQuery } from "@tanstack/react-query";
import type { EventResponseArray } from "@/types/event";
import { api } from "../api";

export function useEvent(debouncedSearch?: string) {
	const data = useQuery<EventResponseArray>({
		queryKey: ["eventData", debouncedSearch],
		queryFn: () => api.get(`/event`, { params: { q: debouncedSearch } }),
	});

	return data;
}
