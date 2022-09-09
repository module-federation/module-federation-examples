import { BuildAdapter } from '@softarc/native-federation/build';
import * as esbuild from 'esbuild';

export const esBuildAdapter: BuildAdapter = async (options) => {
  
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