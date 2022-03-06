import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <script src="http://localhost:3001/remote.js" />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;