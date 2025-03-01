import Sidebar from "@/components/Sidebar";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex">
			<Sidebar />
			<div className="flex-1 p-5">
				<Outlet />
			</div>
		</div>
	);
}
