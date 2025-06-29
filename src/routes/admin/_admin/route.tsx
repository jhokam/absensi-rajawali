import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Cookies } from "react-cookie";
import Sidebar from "@/components/Sidebar";

export const Route = createFileRoute("/admin/_admin")({
	component: RouteComponent,
	beforeLoad: async () => {
		const cookie = new Cookies();
		if (!cookie.get("access_token")) {
			throw redirect({
				to: "/admin/login",
			});
		}
	},
});

function RouteComponent() {
	return (
		<div className="flex">
			<Sidebar />
			<div className="flex-1 p-5 bg-white">
				<Outlet />
			</div>
		</div>
	);
}
