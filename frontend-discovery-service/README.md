# Client-side routing using Webpack Module Federation Example

This example shows how to run a number of Micro Frontends with [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/) using Frontend Service Discovery on AWS, how to deploy a new version of a Micro Frontend, and how to shift traffic using the Blue/Green deploy pattern.

## 0. Pre-requirements

To run this demo, you'll need:
* Node.js >= 16
* cURL

## 1. Deploy Service Discovery on AWS

You will need to deploy Frontend Service Discovery on AWS by following the [Deployment instructions](./USER_GUIDE.md#deploying-the-solution).
In order for this example to work, you will need these settings:
* **AccessControlAllowOrigin**: `https://localhost:3001`
* **CookieSettings**: `Secure;SameSite=None`

When the deployment completes, take note of the `ConsumerApi` and `AdminApi` urls from the deployment output.

In the next session, you will need to make authenticated calls to the Admin API. To obtain an API Token, refer to the [Making Authenticated API Requests guide](../../docs/USER_GUIDE.md#making-authenticated-api-requests).

## 2. Deploy Micro Frontends

Let's first create a new Project called `my-project`. Replace `$API_URL` and `$API_TOKEN` with the values obtained in step 1.

```
curl -X POST $API_URL/projects \
     -H "Authorization: Bearer $API_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"name":"my-project"}'
```

Take note of the Project ID from the response, then let's create a Micro Frontend called `catalog`.

```
curl -X POST $API_URL/projects/$PROJECT_ID/microFrontends \
     -H "Authorization: Bearer $API_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"name":"catalog"}'
```

Take note of the Micro Frontend ID, then let's publish catalog V1. Note that the Integrity parameter on the next step is mocked for demo purposes. When running in production, you shoud use the Integrity string to perform integrity checks.

```
curl -X POST $API_URL/projects/$PROJECT_ID/microFrontends/$MFE_ID/versions \
     -H "Authorization: Bearer $API_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"version":{ "url": "https://localhost:3003/remoteEntry.js","metadata":{"integrity": "e0d123e5f316bef78bfdf5a008837577","version": "1.0.0"}}}'
```

In the next step we will run locally a demo app that will expose the Catalog Micro Frontend at `https://localhost:3003/remoteEntry.js`. But next, let's create another Micro Frontend called `product` and let's deploy it for running at port `3002` instead.

```
curl -X POST $API_URL/projects/$PROJECT_ID/microFrontends \
     -H "Authorization: Bearer $API_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"name":"product"}'
```

Remember to take note of the Micro Frontend ID, to be used to run the next command:

```
curl -X POST $API_URL/projects/$PROJECT_ID/microFrontends/$MFE_ID/versions \
     -H "Authorization: Bearer $API_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"version":{ "url": "https://localhost:3002/remoteEntry.js","metadata":{"integrity": "e0d123e5f316bef78bfdf5a008837578","version": "1.0.0"}}}'
```

Finally, you should be able to make a request to the `ConsumerApi` for the given project:

```
curl $CONSUMER_API_URL/projects/$PROJECT_ID/microFrontends

```
Should respond with something like:
```
{
    "schema":"<SCHEMA_URL>",
    "microFrontends":{
        "my-project/product": [
            {
                "url":"https://localhost:3002/remoteEntry.js",
                "metadata": {
                    "version":"1.0.0",
                    "integrity":"e0d123e5f316bef78bfdf5a008837578"
                }
            }
        ],
        "my-project/catalog": [
            {
                "url":"https://localhost:3003/remoteEntry.js",
                "metadata": {
                    "version":"1.0.0",
                    "integrity":"e0d123e5f316bef78bfdf5a008837577"
                }
            }
        ]
    }
}
```

## 3. Run Shell App

The app is located inside this folder. After cloning this repo, run:
`npm install` to install the dependencies and then `npm run build` to package the app shell and the Micro Frontends.

Next, run `export DISCOVERY_ENDPOINT=$CONSUMER_API_URL/projects/$PROJECT_ID/microFrontends && npm start`, after making sure to replace the CONSUMER API and PROJECT ID portions of the url. Then access the shell app by opening `https://localhost:3001` on your browser.

> Note: the shell app running on port 3001 is on `https` with a self-signed certificate. If you see a `Warning` message when opening the shell app with your browser, choose `Advanced` and then `Accept the risk and continue` to see the content.

You'll notice that the shell app, after dynamically fetching the Micro Frontends list from the Service Discovery API, will fetch the appropriate URL declared during Micro Frontend registration, if its button is clicked.

> Note: apps running at ports 3002 (product MFE), 3003 (catalog v1 MFE) and 3004 (catalog v2 MFE) all run on `https` with a self-signed certificate. After clicking to a button to load a Micro Frontend, if you see a `net::ERR_CERT_AUTHORITY_INVALID` error on your Javascript console and the UI stuck to `Loading dynamic script` or `Failed to load dynamic script`, navigate to `https://localhost:3002`, `https://localhost:3003`, `https://localhost:3004` and accept the risk for self-signed certificates as done for `https://localhost:3001`. Then get back to `https://localhost:3001` and try again.

Feel free to explore the source code for the [app shell](./app-shell/), the [catalog Micro Frontend](./catalog-1.0.0/) and the [product Micro Frontend](./product-1.0.0/). While all the apps are pretty basic, explore the `webpack.config.js` of each project to observe how Webpack Module Federation is orchestrating the discovery and fetching of the remote urls.

## 4. Deploy a new version of the Catalog Micro Frontend

You may notice that there is another Micro Frontend running locally on port `3004`, that is catalog V2 which we'll now deploy to the Frontend Service Discovery.

Take note of the catalog's Micro Frontend ID for making the next API call:

```
curl -X POST $API_URL/projects/$PROJECT_ID/microFrontends/$MFE_ID/versions \
     -H "Authorization: Bearer $API_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"version":{ "url": "https://localhost:3004/remoteEntry.js","metadata":{"integrity": "e0d123e5f316bef78bfdf5a008837574","version": "2.0.0"}},"deploymentStrategy":"Linear10PercentEvery1Minute"}'
```

This will initiate the gradual roll-out of Catalog V2 during the next 10 minutes. After deployment, only 10% of users will see V2, after one minute an extra 10% of the users will be shifted to V2, and so on until 100% of users will see V2.

## 5. Test traffic shifting

If you open and refresh `https://localhost:3001` on your browser during a deployment, you should be able, at some point, to click `Load my-project/catalog` button and see `Hi, I'm the Catalog V2`. The shifting is based on a user Id saved in the `USER_TOKEN` cookie.

Consider that during a deployment:
* Some users will see V1, some others will see V2, based on their `USER_TOKEN` values
* As soon as a user sees V2, the same user should keep seeing V2 during the deployment and after it completes
* In this example, the list of Micro Frontends is fetched only once at page load - so if you are testing the shift from V1 to V2, you may need to refresh the page.

In order to test multiple users, view/modify/delete the `USER_TOKEN` value used to recognise the user session, and refresh the page to make a new request to the Consumer API. When the cookie is deleted, the next response will contain a `Set-Cookie` with a new value. See the User Guide to learn more about [consumer stickiness](../../docs/USER_GUIDE.md#consumer-stickiness)

## 6. Wrapping up

In order to run Frontend Service Discovery on AWS in production, you will need to carefully setup CORS to ensure secure requests. In order to do that, make sure you have accurate values for **AccessControlAllowOrigin** and **CookieSettings** values.
