import Head from 'next/head';

// Import styles
import '../styles/index.css';

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <script src="http://localhost:8081/remoteEntry.js" />
            </Head>
            <Component { ...pageProps } />
        </>
    );
}