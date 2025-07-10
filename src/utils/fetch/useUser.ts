import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { UserResponseArray } from "@/types/user";
import { api } from "../api";

export function useUser(params?: URLSearchParams, debouncedSearch?: string) {
	const data = useQuery<UserResponseArray>({
		queryKey: ["userData", debouncedSearch],
		queryFn: () => api(`/users?${params?.toString()}`),
		placeholderData: keepPreviousData,
	});

	return data;
}
