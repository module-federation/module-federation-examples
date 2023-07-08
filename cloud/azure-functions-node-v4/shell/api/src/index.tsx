import { app } from "@azure/functions";
import { renderToPipeableStream, renderToString } from "react-dom/server";
import MemoryStream from "memory-stream";
import fs from "fs";
import path from "path";
import { App } from "./client";
import React from "react";
import { getModule } from "@module-federation/utilities";

import("fake");

app.http("module", {
	methods: ["GET"],
	handler: async (request, context) => {
		const scope = request.query.get("scope");
		const module = request.query.get("module");

		const container = await getModule({
			remoteContainer: {
				global: scope,
				url: "http://localhost:8080/server/remote.js",
			},
			modulePath: `./${module}`,
			exportName: "default",
		});

		return {
			body: renderToString(container()),
		};
	},
});

app.http("getChunks", {
	route: "chunks/{*filePath}",
	methods: ["GET"],
	handler: (request, context) => {
		const { filePath } = request.params;
		console.log(process.cwd(), __dirname, path.resolve(__dirname));
		return {
			body: fs.readFileSync(path.join(__dirname, "../client", filePath)),
		};
	},
});

app.http("app", {
	methods: ["GET"],
	handler: async (request, context) => {
		const responseBody = await createResponseBody(<App />);

		return {
			body: responseBody,
			headers: {
				"content-type": "text/html",
			},
		};
	},
});

async function createResponseBody(reactElement): Promise<string> {
	return new Promise((resolve) => {
		const outputStream = new MemoryStream();

		const assetMap = {
			"main.js": "/api/chunks/main.js",
		};

		const stream = renderToPipeableStream(reactElement, {
			onAllReady() {
				//outputStream.write(`<!DOCTYPE html>`);
				outputStream.write(`<html>
				<head>
				</head>
				<body>`);
				outputStream.write(`<div id="root">`);
				stream.pipe(outputStream);
				outputStream.write(`</div>`);
				outputStream.write(
					`<script async data-chunk="main" src="${assetMap["main.js"]}"></script>`
				);
				outputStream.write(`</body></html>`);
				//stream.pipe(outputStream);
				resolve(outputStream);
			},
			//bootstrapScripts: [assetMap["main.js"]],
			bootstrapScriptContent: `window.assetMap = ${JSON.stringify(
				assetMap
			)};`,
		});
	});
}
