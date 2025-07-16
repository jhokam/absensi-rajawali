import {
	keepPreviousData,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	createRootRoute,
	createRootRouteWithContext,
	createRouter,
	HeadContent,
	Outlet,
	RouterProvider,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { AxiosError } from "axios";
import { NuqsAdapter } from "nuqs/adapters/react";
import { Suspense } from "react";
import { CookiesProvider } from "react-cookie";
import { scan } from "react-scan";
import ThemedLink from "@/components/ThemedLink.tsx";
import { CustomAlert } from "../components/CustomAlert";
import type { ErrorBase } from "../types/api";
import { AlertProvider } from "../utils/useAlert";
import "../styles/index.css";
import { createRouters } from "../router";

type RouteContext = {};

scan({
	enabled: true,
});

type QueryKey = [
	(
		| "desaData"
		| "eventData"
		| "generusData"
		| "kelompokData"
		| "logData"
		| "presenceData"
		| "userData"
	),
	...ReadonlyArray<unknown>,
];

declare module "@tanstack/react-query" {
	interface Register {
		defaultError: AxiosError<ErrorBase>;
		mutationKey: QueryKey;
		queryKey: QueryKey;
	}
}

export const Route = createRootRoute({
	shellComponent: RootDocument,
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
	head: () => ({
		meta: [
			{
				charSet: "UTF-8",
			},
			{
				title: "Database Rajawali",
			},
			{
				name: "description",
				content: "Database Rajawali",
			},
			{
				name: "keywords",
				content: "Database, Absensi, Rajawali, Absensi Online, Absensi Digital",
			},
			{
				name: "author",
				content: "Abdul Aziz",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1.0",
			},
			{
				name: "copyright",
				content: "RajawaliNews",
			},
			{
				name: "coverage",
				content: "Indonesia",
			},
		],
	}),
});

function RootDocument() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				placeholderData: keepPreviousData,
			},
		},
	});
	const router = createRouters();

	return (
		<QueryClientProvider client={queryClient}>
			<html lang="id">
				<head>
					<HeadContent />
				</head>
				<body>
					<CustomAlert />
					<CookiesProvider>
						<AlertProvider>
							<NuqsAdapter>
								<Suspense>
									<RouterProvider router={router} />
									<Outlet />
								</Suspense>
							</NuqsAdapter>
						</AlertProvider>
					</CookiesProvider>
					<TanStackRouterDevtools />
					<ReactQueryDevtools />
					<Scripts />
				</body>
			</html>
		</QueryClientProvider>
	);
}
