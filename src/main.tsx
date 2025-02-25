import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ProfileProvider } from "./utils/useProfile";

const rootElement = document.getElementById("root");
if (!rootElement) {
	throw new Error("Root element not found");
}

if (!rootElement.innerHTML) {
	createRoot(rootElement).render(
		<StrictMode>
			<ProfileProvider>
				<App />
			</ProfileProvider>
		</StrictMode>,
	);
}
