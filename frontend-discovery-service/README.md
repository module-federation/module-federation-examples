# Client-Side Routing: A Webpack Module Federation Example

This example demonstrates how to run Micro Frontends with Webpack Module Federation using Frontend Service Discovery on AWS. It also explains how to deploy new versions of a Micro Frontend and shift traffic using the Blue/Green deploy pattern.

## 1. Pre-requirements

To run this demo, ensure you have:
- Node.js >= 16
- cURL

## 2. Deploy Service Discovery on AWS

Follow the [Deployment instructions](https://github.com/module-federation/module-federation-examples/blob/master/frontend-discovery-service/USER_GUIDE.md#deploying-the-solution) to deploy Frontend Service Discovery on AWS. 

Ensure these settings:
- `AccessControlAllowOrigin`: https://localhost:3001
- `CookieSettings`: Secure; SameSite=None

Upon successful completion of the deployment, please record the URLs for both the `ConsumerApi` and `AdminApi` as they will be displayed in the deployment output.

In the subsequent session, you will be required to make authenticated calls to the Admin API. To acquire the necessary API Token for authentication, kindly refer to the [Making Authenticated API Requests guide](https://github.com/module-federation/module-federation-examples/blob/master/frontend-discovery-service/docs/USER_GUIDE.md#making-authenticated-api-requests).    

## 3. Deploy Micro Frontends

This section guides you through the process of deploying Micro Frontends, including creating a new project, adding Micro Frontends, and publishing versions.

### Step 1: Create a New Project

First, create a new project named `my-project`. Replace `$API_URL` and `$API_TOKEN` with the values obtained in the previous step.

```bash
curl -X POST $API_URL/projects \
     -H "Authorization: Bearer $API_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"name":"my-project"}'
```

Record the Project ID from the response for future use.

### Step 2: Create and Publish the 'catalog' Micro Frontend

Create a Micro Frontend named `catalog`:

```bash
curl -X POST $API_URL/projects/$PROJECT_ID/microFrontends \
     -H "Authorization: Bearer $API_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"name":"catalog"}'
```

Record the Micro Frontend ID, then publish catalog V1. Note that the Integrity parameter is mocked for demo purposes. In production, use the Integrity string for integrity checks:

```bash
curl -X POST $API_URL/projects/$PROJECT_ID/microFrontends/$MFE_ID/versions \
     -H "Authorization: Bearer $API_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"version":{ "url": "https://localhost:3003/remoteEntry.js","metadata":{"integrity": "e0d123e5f316bef78bfdf5a008837577","version": "1.0.0"}}}'
```

### Step 3: Create and Publish the 'product' Micro Frontend

In the next step, we will execute a local demo application that exposes the Catalog Micro Frontend at `https://localhost:3003/remoteEntry.js`. Before proceeding, we will create another Micro Frontend named 'product' and deploy it to run on port 3002."

```bash
curl -X POST $API_URL/projects/$PROJECT_ID/microFrontends \
     -H "Authorization: Bearer $API_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"name":"product"}'
```

Ensure to record the Micro Frontend ID, as it will be required for executing the subsequent command:

```bash
curl -X POST $API_URL/projects/$PROJECT_ID/microFrontends/$MFE_ID/versions \
     -H "Authorization: Bearer $API_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"version":{ "url": "https://localhost:3002/remoteEntry.js","metadata":{"integrity": "e0d123e5f316bef78bfdf5a008837578","version": "1.0.0"}}}'
```

### Step 4: Verify the Deployment

Finally, make a request to the `ConsumerApi`` for the given project:

```bash
curl $CONSUMER_API_URL/projects/$PROJECT_ID/microFrontends
```

The response should resemble:

```json
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

## 4. Running the Shell Application

This section guides you through the process of running the shell application and Micro Frontends, including handling self-signed certificates and exploring the source code.

### Step 1: Clone the Repository and Install Dependencies

The application is located inside this folder. After cloning the repository, execute the following commands to install the dependencies and package the app shell and Micro Frontends:

```bash
npm install
npm run build
```

### Step 2: Set the Discovery Endpoint and Start the Application

Next, run the following command, making sure to replace the `CONSUMER_API_URL` and `PROJECT_ID` portions of the URL:

```bash
export DISCOVERY_ENDPOINT=$CONSUMER_API_URL/projects/$PROJECT_ID/microFrontends && npm start
```

Access the shell app by opening [https://localhost:3001](https://localhost:3001) in your browser.

### Step 3: Handle Self-Signed Certificates

The shell app runs on HTTPS with a self-signed certificate. If you encounter a warning message, choose "Advanced" and then "Accept the risk and continue" to view the content.

### Step 4: Explore the Shell App and Micro Frontends

You'll notice that the shell app dynamically fetches the Micro Frontends list from the Service Discovery API and retrieves the appropriate URL declared during Micro Frontend registration when its button is clicked.

**Note:** Apps running at ports 3002 (product MFE), 3003 (catalog v1 MFE), and 3004 (catalog v2 MFE) also run on HTTPS with self-signed certificates. If you encounter a `net::ERR_CERT_AUTHORITY_INVALID` error and the UI is stuck on "Loading dynamic script" or "Failed to load dynamic script," navigate to the following URLs and accept the risk for self-signed certificates:

- [https://localhost:3002](https://localhost:3002)
- [https://localhost:3003](https://localhost:3003)
- [https://localhost:3004](https://localhost:3004)

Then return to [https://localhost:3001](https://localhost:3001) and try again.

### Step 5: Explore the Source Code

Feel free to explore the source code for the [app shell](https://github.com/module-federation/module-federation-examples/blob/master/frontend-discovery-service/app-shell), [catalog Micro Frontend](https://github.com/module-federation/module-federation-examples/blob/master/frontend-discovery-service/catalog-1.0.0), and [product Micro Frontend](https://github.com/module-federation/module-federation-examples/blob/master/frontend-discovery-service/product-1.0.0). While the apps are relatively basic, you can examine the `webpack.config.js` of each project to observe how Webpack Module Federation orchestrates the discovery and fetching of remote URLs.

## 5. Deploying a New Version of the Catalog Micro Frontend 

This section outlines the process of deploying a new version (V2) of the Catalog Micro Frontend, utilizing a gradual roll-out strategy.

### Step 1: Identify the Catalog V2 Micro Frontend

You may observe another Micro Frontend running locally on port 3004. This is Catalog V2, which we will now deploy to the Frontend Service Discovery.

### Step 2: Deploy Catalog V2

Record the catalog's Micro Frontend ID, as it will be required for the next API call. Execute the following command to deploy Catalog V2:

```bash
curl -X POST $API_URL/projects/$PROJECT_ID/microFrontends/$MFE_ID/versions \
     -H "Authorization: Bearer $API_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"version":{ "url": "https://localhost:3004/remoteEntry.js","metadata":{"integrity": "e0d123e5f316bef78bfdf5a008837574","version": "2.0.0"}},"deploymentStrategy":"Linear10PercentEvery1Minute"}'
```

### Step 3: Understand the Gradual Roll-Out Strategy

This command initiates the gradual roll-out of Catalog V2 over the next 10 minutes. The deployment strategy, `Linear10PercentEvery1Minute`, ensures that:

- Initially, only 10% of users will see V2.
- After one minute, an additional 10% of users will be shifted to V2.
- This pattern continues until 100% of users see V2.

## 6. Testing Traffic Shifting

This section provides guidance on how to test traffic shifting between different versions of a Micro Frontend, specifically shifting from Catalog V1 to V2.

### Step 1: Observe the Shift During Deployment

During deployment, open and refresh [https://localhost:3001](https://localhost:3001) in your browser. At some point, you should be able to click the "Load my-project/catalog" button and see the message "Hi, I'm the Catalog V2." This shifting is based on a user ID saved in the `USER_TOKEN` cookie.

### Step 2: Understand the Shifting Behavior

During a deployment, consider the following:

- Some users will see V1, while others will see V2, depending on their `USER_TOKEN` values.
- Once a user sees V2, they will continue to see V2 throughout the deployment and after its completion.
- The list of Micro Frontends is fetched only once at page load, so you may need to refresh the page if testing the shift from V1 to V2.

### Step 3: Test Multiple Users

To simulate the experience of multiple users, you can view, modify, or delete the `USER_TOKEN` value used to recognize the user session. Refresh the page to make a new request to the Consumer API. If the cookie is deleted, the next response will contain a "Set-Cookie" header with a new value.

### Additional Resources

For more details on consumer stickiness and how it influences the traffic shifting, refer to the [User Guide](https://github.com/module-federation/module-federation-examples/blob/master/frontend-discovery-service/USER_GUIDE.md).

## 7. Wrapping Up

When running Frontend Service Discovery on AWS in a production environment, it's essential to meticulously configure Cross-Origin Resource Sharing (CORS) to guarantee secure requests. In order to do that, make sure you have accurate values for `AccessControlAllowOrigin` and `CookieSettings` values.
