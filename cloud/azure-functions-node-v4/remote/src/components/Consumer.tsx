import React, { Suspense, lazy } from "react";

const Provider = lazy(() => import("shell/Provider"));

export default function Consumer() {
	return (
		<div>
			<Suspense fallback="Loading Shell">
				<Provider />
			</Suspense>
		</div>
	);
}
