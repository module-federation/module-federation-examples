import os from "os";
import esbuild from "esbuild";

export function getExports(routePath, remixConfig) {
  const { metafile, errors } = esbuild.buildSync({
    sourceRoot: remixConfig.appDirectory,
    entryPoints: [routePath],
    target: "esnext",
    bundle: false,
    metafile: true,
    write: false,
    outdir: os.tmpdir(),
  });
  if ((errors === null || errors === void 0 ? void 0 : errors.length) > 0) {
    throw new Error(
      esbuild.formatMessagesSync(errors, { kind: "error" }).join("\n")
    );
  }
  const outputs = Object.values(metafile.outputs);
  if (outputs.length !== 1) {
    throw Error();
  }
  const output = outputs[0];
  return output.exports;
}
