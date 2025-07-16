import { useQuery } from "@tanstack/react-query";
import type { EventResponse } from "@/types/event";
import { api } from "../api";

export function useEvents(id?: string) {
	const fetchEvent = async (id?: string): Promise<EventResponse> => {
		const response = await api.get(`/event/${id}`);
		return response.data;
	};

	const data = useQuery({
		queryKey: ["eventData", id],
		queryFn: () => fetchEvent(id),
		enabled: !!id,
	});

	return data;
}
