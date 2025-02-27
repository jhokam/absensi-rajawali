import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useProfile } from "./utils/useProfile";

const router = createRouter({
	routeTree,
	context: { authentication: undefined! },
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

export default function App() {
	const queryClient = new QueryClient();
	const profile = useProfile();

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} context={{ authentication: profile }} />
		</QueryClientProvider>
	);
}
