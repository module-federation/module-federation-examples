import {NextFederationPlugin} from "@module-federation/nextjs-mf";

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, options) => {
        if (!options.isServer) {
            config.plugins.push(
                new NextFederationPlugin({
                    name: 'home',
                    filename: 'static/chunks/remoteEntry.js',
                    remotes: {
                        shop: 'shop@http://localhost:3002/_next/static/chunks/remoteEntry.js'
                    },
                    exposes: {
                        './nav': './src/components/nav.tsx'
                    },
                    shared: {}
                })
            );
        }

        return config;
    },
};

export default nextConfig;
