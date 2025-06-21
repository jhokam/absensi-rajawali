import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { scan } from "react-scan";
import App from "./App";
import { ProfileProvider } from "./utils/useProfile";

scan({
	enabled: true,
});

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
