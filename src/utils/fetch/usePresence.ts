import { useQuery } from "@tanstack/react-query";
import type { PresenceResponseArray } from "@/types/presence";
import { api } from "../api";

export function usePresence(debouncedSearch?: string) {
	const data = useQuery<PresenceResponseArray>({
		queryKey: ["presenceData", debouncedSearch],
		queryFn: () => api.get(`/presence`, { params: { q: debouncedSearch } }),
	});

	return data;
}
