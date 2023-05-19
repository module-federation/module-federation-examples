import React from "react";

const Widget = React.lazy(() => import("remote/Widget"));

export default function App() {
	return (
		<div>
			Hello world!
			<React.Suspense fallback="Loading...">
				<Widget />
			</React.Suspense>
		</div>
	);
}
