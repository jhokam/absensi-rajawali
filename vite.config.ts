import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	return {
		plugins: [react(), tailwindcss(), TanStackRouterVite()],
		define: {
			"process.env": env,
		},
		resolve: {
			alias: {
				"@": "/src",
			},
		},
	};
});
