import { useQuery } from "@tanstack/react-query";
import type { EventResponseArray } from "@/types/event";
import { api } from "../api";

export function useEvent(debouncedSearch?: string) {
	const fetchEvent = async (
		debouncedSearch?: string,
	): Promise<EventResponseArray> => {
		const response = await api.get("/event", {
			params: {
				q: debouncedSearch,
			},
		});
		return response.data;
	};

	const data = useQuery({
		queryKey: ["eventData", debouncedSearch],
		queryFn: () => fetchEvent(debouncedSearch),
	});

	return data;
}
