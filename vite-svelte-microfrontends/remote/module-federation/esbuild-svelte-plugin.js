import * as fs from 'fs';
import * as path from 'path';
import * as svelteCompiler from 'svelte/compiler';

export const sveltePlugin = {
	name: 'svelte',
	setup(build) {
		build.onLoad({ filter: /\.svelte$/ }, async (args) => {
			// This converts a message in Svelte's format to esbuild's format
			let convertMessage = ({ message, start, end }) => {
				let location;
				if (start && end) {
					let lineText = source.split(/\r\n|\r|\n/g)[start.line - 1];
					let lineEnd = start.line === end.line ? end.column : lineText.length;
					location = {
						file: filename,
						line: start.line,
						column: start.column,
						length: lineEnd - start.column,
						lineText,
					};
				}
				return { text: message, location };
			};

			// Load the file from the file system
			let source = await fs.promises.readFile(args.path, 'utf8');
			let filename = path.relative(process.cwd(), args.path);

			// Convert Svelte syntax to JavaScript
			try {
				let { js, warnings } = svelteCompiler.compile(source, { filename });
				let contents = js.code + `//# sourceMappingURL=` + js.map.toUrl();
				return { contents, warnings: warnings.map(convertMessage) };
			} catch (e) {
				return { errors: [convertMessage(e)] };
			}
		});
	},
};
