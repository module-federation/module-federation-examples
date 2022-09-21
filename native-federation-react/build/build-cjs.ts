import { dirname } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import * as esbuild from 'esbuild';
import { parseCjsExports } from 'esm-node-services';
import { getPackageInfo } from './utils/package-info';

const esmImportName = name => `__esm_${name}`;
/**
 * A bit naive approach to tap into require calls.
 */
const requireSnippet = external => `
${external.map(ext => `import ${esmImportName(ext)} from '${ext}';`).join('\n')}
var require = (function(){
  var ext = {${external.map(name => `${name}: ${esmImportName(name)}`).join(',')}};
  var req = typeof require === 'function' && require;
  return function (mod) {
    if ([${external.map(name => `'${name}'`).join(',')}].includes(mod)) {
      return ext[mod];
    }
    return req && req.apply(this, arguments);
  }
}());
`.trim();

export async function build(moduleName, outFile, workspaceRoot, external) {
  const { esm, packageName } = getPackageInfo(moduleName, workspaceRoot);
  const outDir = dirname(outFile);

  if (esm === false) {
    const { exportDefault: hasDefaultExport, exports } = await parseCjsExports({
      buildDir: outDir,
      importPath: packageName,
    });

    await esbuild.build({
      stdin: {
        contents: getModuleContent(moduleName, exports, hasDefaultExport),
        sourcefile: moduleName,
        resolveDir: outDir
      },
      // external,
      bundle: true,
      minify: true,
      sourcemap: true,
      format: 'esm',
      outfile: outFile,
      plugins: [cjsRequirePlugin(external)],
    })
  }
}

function cjsRequirePlugin(externals) {
  const usedExternals = [];

  return {
    name: 'cjs-require-plugin',
    setup(build) {
      const { outfile } = build.initialOptions;

      build.onResolve({ filter: /.*/ }, (args) => {
        if (externals.includes(args.path) && args.kind === 'require-call') {
          usedExternals.push(args.path);

          return {
            path: args.path,
            external: true
          }
        }
  
        return null;
      });

      build.onEnd(async () => {
        if (usedExternals.length === 0) {
          return;
        }

        const content = readFileSync(outfile, 'utf-8');
        const finalContent = [
          requireSnippet(usedExternals),
          content
        ].join('\n')

        writeFileSync(outfile, finalContent, 'utf-8');
      })
    }
  }
}

function getModuleContent(moduleName, exports, hasDefaultExport) {
  if (hasDefaultExport) {
    return `export { ${exports.join(', ')} } from '${moduleName}';`
  }

  return `
    import * as mod from '${moduleName}';
    export default mod;
    export const { ${exports.join(',')} } = mod;
  `;
}