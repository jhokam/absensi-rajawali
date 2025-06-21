import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/_admin/kelompok")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/admin/dashboard/_layout/kelompok"!</div>;
}
