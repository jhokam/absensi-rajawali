import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/_admin/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>HI DASHBOARD!</div>;
}
