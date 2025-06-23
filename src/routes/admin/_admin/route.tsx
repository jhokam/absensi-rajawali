import Sidebar from "@/components/Sidebar";
import { getCookie } from "@/utils/cookies";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/_admin")({
	component: RouteComponent,
	beforeLoad: () => {
		const cookies = getCookie({ name: "access_token" });
		if (!cookies) {
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
