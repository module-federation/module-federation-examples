import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import {Helmet} from 'react-helmet';
import serialize from 'serialize-javascript';
import fetch from 'node-fetch';

import App from '../client/components/App';
import {createApolloClient} from '../client/apolloClient';
import {renderToPipeableStream } from "react-dom/server";

export default async (req, res, next) => {

    const {apolloClient} = createApolloClient({
        ssrMode: true,
        fetch,
    });

    const pathname = req.path;
    const search = req.originalUrl.replace(pathname, '');

    const location = {
        pathname,
        state: {
            origin: `https://${req.headers.host}`,
            isBot: false,
            querystring: search.replace('?', ''),
            originalReferrer: req.headers.referer || '',
            url: pathname + search,
        },
    };

    try {
        let didError = false;

        const stream = renderToPipeableStream(
            <StaticRouter location={location}>
                <App apolloClient={apolloClient }/>
            </StaticRouter>, {
                onAllReady() {
                    console.log('renderToPipeableStream READY!!!!!!!!!!!!!!')
                    const helmet = Helmet.renderStatic();
                    const apolloData = apolloClient.extract();
                    const serverRenderedApplicationState = {
                        apolloData,
                    };
                    res.statusCode = didError ? 500 : 200;
                    res.setHeader('Content-type', 'text/html');
                    res.write(`<!DOCTYPE html`);
                    res.write(`<html ${helmet.htmlAttributes.toString()}>
                              <head>
                                ${helmet.title.toString()}
                                ${helmet.meta.toString()}
                                ${helmet.link.toString()}
                              </head>
                              <body>`);
                    res.write(`<div id="root">`);
                    stream.pipe(res);
                    res.write(`</div>`);
                    res.write(
                        `<script async data-chunk="main" src="http://localhost:3000/static/main.js">
                        </script><script>window.__CLIENT_CONFIG__ = ${serialize(serverRenderedApplicationState)}</script>`,
                    );
                    res.write(`${helmet.script.toString()}</body></html>`);
                },
                onShellError() {
                    res.statusCode = 500;
                    res.send(`<h1>An error occurred</h1>`);
                },
                onError(err) {
                    didError = true;
                    console.error(err);
                },
        });

    } catch (error: any) {
        console.log('>>>>>>>>>>>>>>>>>', error);
    }

};
