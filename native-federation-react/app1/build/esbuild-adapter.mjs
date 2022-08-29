import * as esbuild from 'esbuild';

export const esbuildAdapter = async (options) => {

    const {
      entryPoint,
      external,
      outfile,
    } = options;

    await esbuild.build({
      entryPoints: [entryPoint],
      external,
      outfile,
      bundle: true,
      sourcemap: true,
      minify: true,
      format: 'esm',
      target: ['esnext']
    });
  }
