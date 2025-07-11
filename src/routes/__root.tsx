import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Suspense } from "react";
import { CookiesProvider } from "react-cookie";
import ThemedLink from "@/components/ThemedLink.tsx";
import { CustomAlert } from "../components/CustomAlert";

type RouteContext = {};

export const Route = createRootRouteWithContext<RouteContext>()({
	component: () => (
		<CookiesProvider>
			<TanStackRouterDevtools />
			<ReactQueryDevtools />
			<Suspense>
				<CustomAlert />
				<Outlet />
			</Suspense>
		</CookiesProvider>
	),
	notFoundComponent: () => (
		<div className="px-16 h-screen w-screen grid grid-flow-col justify-around items-center">
			<div>
				<h1 className="text-4xl">Oops....</h1>
				<h2 className="text-3xl pt-3.5 pb-4">Halaman tidak ditemukan</h2>
				<p className="text-lg pb-12">
					Halaman yang kamu cari tidak ditemukan
					<br />
					atau sudah dihapus.
				</p>
				<ThemedLink to="/admin/dashboard">Kembali</ThemedLink>
			</div>
			<img src="/404-ilustration.png" alt="404 ilustration" />
		</div>
	),
});
