import {
	keepPreviousData,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { NuqsAdapter } from "nuqs/adapters/react";
import { routeTree } from "./routeTree.gen";
import { AlertProvider } from "./utils/useAlert";
import "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ErrorBase } from "./types/api";

const router = createRouter({
	scrollRestoration: true,
	routeTree,
	notFoundMode: "root",
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

declare module "@tanstack/react-query" {
	interface Register {
		defaultError: AxiosError<ErrorBase>;
	}
}

export default function App() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				placeholderData: keepPreviousData,
			},
		},
	});

	return (
		<QueryClientProvider client={queryClient}>
			<NuqsAdapter>
				<AlertProvider>
					<RouterProvider router={router} />
				</AlertProvider>
			</NuqsAdapter>
		</QueryClientProvider>
	);
}
