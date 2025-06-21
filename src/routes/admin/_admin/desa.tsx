import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/_admin/desa")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/admin/dashboard/_layout/desa"!</div>;
}
