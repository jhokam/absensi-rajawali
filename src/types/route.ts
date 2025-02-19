import type { Route as rootRoute } from "../routes/__root";

export type RouteConfig = {
	id: string;
	path: string;
	getParentRoute: () => typeof rootRoute;
};
