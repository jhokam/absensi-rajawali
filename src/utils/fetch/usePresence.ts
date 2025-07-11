import { useQuery } from "@tanstack/react-query";
import type { PresenceResponseArray } from "@/types/presence";
import { api } from "../api";

export function usePresence(debouncedSearch?: string) {
	const fetchPresence = async (
		debouncedSearch?: string,
	): Promise<PresenceResponseArray> => {
		const response = await api.get("/presence", {
			params: {
				q: debouncedSearch,
			},
		});
		return response.data;
	};

	const data = useQuery({
		queryKey: ["presenceData", debouncedSearch],
		queryFn: () => fetchPresence(debouncedSearch),
	});

	return data;
}
