import React from "react";

export const TanStackRouterDevtools =
	import.meta.env.PROD === true
		? () => null
		: React.lazy(() =>
				import("@tanstack/router-devtools").then((res) => ({
					default: res.TanStackRouterDevtools,
				})),
			);
