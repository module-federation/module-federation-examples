import {NextFederationPlugin} from "@module-federation/nextjs-mf";

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, options) => {
        if (!options.isServer) {
            config.plugins.push(
                new NextFederationPlugin({
                    name: 'shop',
                    filename: 'static/chunks/remoteEntry.js',
                    remotes: {
                        shop: 'home@http://localhost:3001/_next/static/chunks/remoteEntry.js'
                    },
                    exposes: {
                        './footer': './src/components/footer.tsx'
                    },
                    shared: {}
                })
            );
        }

        return config;
    },
};

export default nextConfig;


