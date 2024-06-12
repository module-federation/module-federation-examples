import esbuild from "esbuild";

const isWatchMode = process.argv.includes("--watch");

const teams = ["explore", "decide", "checkout"];
const buildOptions = [];

teams.forEach((team) => {
  buildOptions.push(
    {
      entryPoints: [`src/${team}/scripts.js`],
      outfile: `public/${team}/static/scripts.js`,
    },
    {
      entryPoints: [`src/${team}/styles.css`],
      external: ["*.woff2"],
      outfile: `public/${team}/static/styles.css`,
    },
  );
});

buildOptions.forEach(async (options) => {
  let opts = {
    bundle: true,
    minify: true,
    logLevel: "info",
    ...options,
  };
  if (isWatchMode) {
    let ctx = await esbuild.context(opts);
    ctx.watch();
  } else {
    esbuild.build(opts).catch(() => process.exit(1));
  }
});
