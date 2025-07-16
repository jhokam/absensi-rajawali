// src/server.ts
import {
	createStartHandler,
	defaultStreamHandler,
} from "@tanstack/react-start/server";
import { createRouters } from "./router";

export default createStartHandler({
	createRouter: createRouters,
})(defaultStreamHandler);
