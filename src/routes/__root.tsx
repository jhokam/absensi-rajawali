import { TanStackRouterDevtools } from "@/components/TanStackRouterDevtools.tsx";
import ThemedLink from "@/components/ThemedLink.tsx";
import type { UserContextType } from "@/utils/useProfile.tsx";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { Suspense } from "react";
import { CookiesProvider } from "react-cookie";

type RouteContext = {
	authentication: UserContextType;
};

export const Route = createRootRouteWithContext<RouteContext>()({
	component: () => (
		<CookiesProvider>
			<TanStackRouterDevtools />
			<Suspense>
				<Outlet />
			</Suspense>
		</CookiesProvider>
	),
	notFoundComponent: () => (
		<div className="px-16 h-screen w-screen grid grid-flow-col justify-around items-center">
			<div>
				<h1 className="text-4xl">Oops....</h1>
				<h2 className="text-3xl pt-3.5 pb-4">Page Not Found</h2>
				<p className="text-lg pb-12">
					This page doesn't exist or still in progress!
					<br />
					we suggest you back to home.
				</p>
				<ThemedLink to="/admin/dashboard">Back to Home</ThemedLink>
			</div>
			<img src="/404-ilustration.png" alt="404 ilustration" />
		</div>
	),
});
