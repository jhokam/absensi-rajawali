import type {
	FileRoutesByPath,
	RouteOptions,
	RoutePathOptions,
} from "@tanstack/react-router";

export type SidebarMenuItem = {
	title: string;
	link: RoutePathOptions<string, string>;
};
