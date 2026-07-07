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

- npm run build
- npm run start
- visit [http://localhost:7071/api/app](http://localhost:7071/api/app) for the SSR app
- visit [http://localhost:8080/client](http://localhost:8080/client) for the CSR app

<img width="0" height="0" alt="" src="https://www.google-analytics.com/g/collect?v=2&tid=G-DRPXW0EEVT&cid=ae045149-9d17-0367-bbb0-11c41d92b411&en=readme_view&ep.repository=module-federation-examples&ep.example=cloud&ep.readme_path=cloud%2Fazure-functions-node-v4%2FREADME.md&dl=https%3A%2F%2Fgithub.com%2Fmodule-federation%2Fmodule-federation-examples%2Ftree%2Fmaster%2Fcloud%2Fazure-functions-node-v4&dt=ModuleFederationExamples+cloud%2Fazure-functions-node-v4%2FREADME.md">
