import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export function createRouters() {
	const router = createTanStackRouter({
		scrollRestoration: true,
		routeTree,
		notFoundMode: "root",
	});
	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createRouters>;
	}
}
