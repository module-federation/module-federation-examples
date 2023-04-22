# Azure Functions V4 Node Programming Model with Module Federation

This repo is built upon the [Azure Functions Node V4 Programming Model](https://azure.microsoft.com/en-us/updates/public-preview-azure-functions-v4-programming-model-for-nodejs/) and demonstrates the ability to federate two different ways.

-Federating from a CSR to the Azure Function SSR content.
-Federating from the Azure Function SSR to a CSR app.

To run the example:

If it doesn't exist, under the _shell/api_ folder create _local.settings.json_ with the following content:

```javascript
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsFeatureFlags": "EnableWorkerIndexing"
  }
}
```

Then run:

-   npm run build
-   npm run start
-   visit [http://localhost:7071/api/app](http://localhost:7071/api/app) for the SSR app
-   visit [http://localhost:8080/client](http://localhost:8080/client) for the CSR app
