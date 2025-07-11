import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();
export const api = axios.create({
	baseURL: import.meta.env.VITE_DEV_LINK,
	headers: {
		Authorization: `Bearer ${cookies.get("access_token")}`,
		"Content-Type": "application/json",
	},
});

api.interceptors.response.use((response) => response.data);
