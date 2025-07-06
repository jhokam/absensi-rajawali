import { Cookies } from "react-cookie";

export async function api(endpoint: string, options: RequestInit = {}) {
	const cookies = new Cookies();
	const response = await fetch(import.meta.env.VITE_DEV_LINK + endpoint, {
		...options,
		headers: {
			...(options.headers || {}),
			Authorization: `Bearer ${cookies.get("access_token")}`,
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		const errorMessage =
			errorData.error?.message || `HTTP error! status: ${response.status}`;
		throw new Error(errorMessage);
	}

	return response.json();
}
