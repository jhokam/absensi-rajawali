import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import Sidebar from "../components/Sidebar.tsx";
import { TanStackRouterDevtools } from "../components/TanStackRouterDevtools.tsx";

export const Route = createRootRoute({
	component: () => (
		<div className="flex items-center h-screen">
			<Sidebar />
			<Outlet />
			<Suspense>
				<TanStackRouterDevtools />
			</Suspense>
		</div>
	),
});
