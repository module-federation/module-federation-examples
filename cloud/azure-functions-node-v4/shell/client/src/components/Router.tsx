import { Routes, Route, BrowserRouter } from "react-router-dom";
import App from "./App";

export default function Router() {
	return (
		<Routes>
			<Route path="*" element={<App />} />
		</Routes>
	);
}
