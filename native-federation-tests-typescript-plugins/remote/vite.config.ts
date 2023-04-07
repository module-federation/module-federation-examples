import { NativeFederationTestsRemote } from '@module-federation/native-federation-tests/vite'
import { NativeFederationTypeScriptRemote } from '@module-federation/native-federation-typescript/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import packageJson from './package.json'

const moduleFederationConfig = {
    name: 'moduleFederationTypescript',
    filename: 'remoteEntry.js',
    exposes: {
        './button': './src/components/button',
        './anotherButton': './src/components/anotherButton'
    },
    shared: {
        ...packageJson.dependencies,
        react: { singleton: true, eager: true, requiredVersion: packageJson.dependencies.react },
        "react-dom": { singleton: true, eager: true, requiredVersion: packageJson.dependencies["react-dom"] }
    },
}

export default defineConfig({
    plugins: [
        react(),
        NativeFederationTypeScriptRemote({ moduleFederationConfig }),
        NativeFederationTestsRemote({moduleFederationConfig})
    ],
    build: {
        lib: {
            entry: 'src/index.ts',
            formats: ['es']
        }
    },
    server: {
        port: 3000,
        proxy: {
            '/@mf-types.zip': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                rewrite: () => `/@fs/${process.cwd()}/dist/@mf-types.zip`
            }
        },
        fs: {
            allow: ['./dist']
        }
    }
})
