import { useQuery } from "@tanstack/react-query";
import type { UserResponseArray } from "@/types/user";
import { api } from "../api";

export function useUser(debouncedSearch?: string) {
	const fetchUser = async (
		debouncedSearch?: string,
	): Promise<UserResponseArray> => {
		const response = await api.get("/users", {
			params: {
				q: debouncedSearch,
			},
		});
		return response.data;
	};

	const data = useQuery({
		queryKey: ["userData", debouncedSearch],
		queryFn: () => fetchUser(debouncedSearch),
	});

	return data;
}
