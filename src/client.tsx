import { StartClient } from "@tanstack/react-start";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { createRouters } from "./router";

const router = createRouters();

hydrateRoot(
	document,
	<StrictMode>
		<StartClient router={router} />
	</StrictMode>,
);
