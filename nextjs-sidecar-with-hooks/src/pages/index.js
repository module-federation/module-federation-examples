import Head from 'next/head';
import { lazy, Suspense } from 'react';

const RemoteHeader = ({ scope, module, ...props }) => {

    if (!global[scope]) {
        return null;
    }

    global[scope].init({
        react: {
            get: () => Promise.resolve().then(() => () => require('react')),
            loaded: true,
            singleton: true,
            version: [ 16, 13, 1 ]
        }
    });

    const Component = lazy(() => global[scope].get(module).then(factory => factory()));

    return (
        <Suspense fallback="Loading System">
            <Component { ...props } />
        </Suspense>
    );
};

export default function Home() {
    return (
        <div className="container">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <RemoteHeader scope="app1" module="./Header" />

                <p className="description">
                    Get started by editing <code>pages/index.js</code>
                </p>

                <div className="grid">
                    <a href="https://nextjs.org/docs" className="card">
                        <h3>Documentation &rarr;</h3>
                        <p>Find in-depth information about Next.js features and API.</p>
                    </a>

                    <a href="https://nextjs.org/learn" className="card">
                        <h3>Learn &rarr;</h3>
                        <p>Learn about Next.js in an interactive course with quizzes!</p>
                    </a>

                    <a
                        href="https://github.com/vercel/next.js/tree/master/examples"
                        className="card">
                        <h3>Examples &rarr;</h3>
                        <p>Discover and deploy boilerplate example Next.js projects.</p>
                    </a>

                    <a
                        href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        className="card">
                        <h3>Deploy &rarr;</h3>
                        <p>
                            Instantly deploy your Next.js site to a public URL with Vercel.
                        </p>
                    </a>
                </div>
            </main>

            <footer>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer">
                    Powered by{ ' ' }
                    <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
                </a>
            </footer>
        </div>
    );
}
