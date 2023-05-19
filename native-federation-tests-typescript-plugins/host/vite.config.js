import { NativeFederationTestsHost } from '@module-federation/native-federation-tests/vite'
import { NativeFederationTypeScriptHost } from '@module-federation/native-federation-typescript/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import packageJson from './package.json'

const moduleFederationConfig = {
    name: 'moduleFederationTypescript',
    filename: 'remoteEntry.js',
    remotes: {
        'moduleFederationTypescript': 'http://localhost:3000/remoteEntry.js',
    },
    shared: {
        ...packageJson.dependencies,
        react: { singleton: true, eager: true, requiredVersion: packageJson.dependencies.react },
        "react-dom": { singleton: true, eager: true, requiredVersion: packageJson.dependencies["react-dom"] }
    },
}

export default defineConfig({
    plugins: [
        NativeFederationTypeScriptHost({ moduleFederationConfig }),
        NativeFederationTestsHost({ moduleFederationConfig }),
        react()
    ],
    build: {
        lib: {
            entry: 'src/index.ts',
            formats: ['es']
        }
    },
    server: {
        port: 3001
    },
    test: {
        environment: 'jsdom',
    },
})
