import { useQuery } from "@tanstack/react-query";
import type { UserResponseArray } from "@/types/user";
import { api } from "../api";

export function useUser(debouncedSearch?: string) {
	const data = useQuery<UserResponseArray>({
		queryKey: ["userData", debouncedSearch],
		queryFn: () => api.get(`/users`, { params: { q: debouncedSearch } }),
	});

	return data;
}
