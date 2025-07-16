import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tanstackRouter from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(() => {
	return {
		plugins: [
			react(),
			tailwindcss(),
			tanstackRouter({
				autoCodeSplitting: true,
			}),
			tanstackStart({ customViteReactPlugin: true }),
		],
		resolve: {
			alias: {
				"@": "/src",
			},
		},
	};
});
