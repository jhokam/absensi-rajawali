import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { PresenceResponseArray } from "@/types/presence";
import { api } from "../api";

export function usePresence(
	params?: URLSearchParams,
	debouncedSearch?: string,
) {
	const data = useQuery<PresenceResponseArray>({
		queryKey: ["presenceData", debouncedSearch],
		queryFn: () => api(`/presence?${params?.toString()}`),
		placeholderData: keepPreviousData,
	});

	return data;
}
