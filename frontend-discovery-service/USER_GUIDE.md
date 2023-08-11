# User Guide: Frontend Service Discovery on AWS Solution

This guide outlines how to install, configure, and use the Frontend Service Discovery solution on AWS. Follow the instructions below to deploy the solution using an AWS CloudFormation template.

## Deployment Overview

Deployment of the solution as an AWS CloudFormation template typically takes 5-10 minutes.

Your access to the AWS account must have IAM permissions to launch AWS CloudFormation templates that create IAM roles and to create the solution resources.

>Note: You are responsible for the cost of the AWS services used in this solution. Review the AWS service pricing pages for the most accurate and up-to-date information, as prices are subject to change.

## <a id="deploying-the-solution"></a> Step-by-Step Deployment Guide

1. Choose Deployment Method:

    - AWS Console: Click the "Launch Template" button for your preferred AWS region.
    - AWS CLI: Refer to the "Template Link" to download the template files.

| Region | Launch Template | Template Link |
| --- | --- | ---|
| **US East (N. Virginia)** (us-east-1)  | [Launch](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/new?frontend-discovery-service&templateURL=https://solution-builders-us-east-1.s3.us-east-1.amazonaws.com/frontend-discovery-service/latest/template.yaml) | [Link](https://solution-builders-us-east-1.s3.us-east-1.amazonaws.com/frontend-discovery-service/latest/template.yaml) |
| **US East (Ohio)** (us-east-2) | [Launch](https://console.aws.amazon.com/cloudformation/home?region=us-east-2#/stacks/new?frontend-discovery-service&templateURL=https://solution-builders-us-east-2.s3.us-east-2.amazonaws.com/frontend-discovery-service/latest/template.yaml) | [Link](https://solution-builders-us-east-2.s3.us-east-2.amazonaws.com/frontend-discovery-service/latest/template.yaml) |
| **US West (Oregon)** (us-west-2) | [Launch](https://console.aws.amazon.com/cloudformation/home?region=us-west-2#/stacks/new?frontend-discovery-service&templateURL=https://solution-builders-us-west-2.s3.us-west-2.amazonaws.com/frontend-discovery-service/latest/template.yaml) | [Link](https://solution-builders-us-west-2.s3.us-west-2.amazonaws.com/frontend-discovery-service/latest/template.yaml) |
| **Asia Pacific (Mumbai)** (ap-south-1) | [Launch](https://console.aws.amazon.com/cloudformation/home?region=ap-south-1#/stacks/new?frontend-discovery-service&templateURL=https://solution-builders-ap-south-1.s3.ap-south-1.amazonaws.com/frontend-discovery-service/latest/template.yaml) | [Link](https://solution-builders-ap-south-1.s3.ap-south-1.amazonaws.com/frontend-discovery-service/latest/template.yaml)  |
| **Asia Pacific (Sydney)** (ap-southeast-2) | [Launch](https://console.aws.amazon.com/cloudformation/home?region=ap-southeast-2#/stacks/new?frontend-discovery-service&templateURL=https://solution-builders-ap-southeast-2.s3.ap-southeast-2.amazonaws.com/frontend-discovery-service/latest/template.yaml) | [Link](https://solution-builders-ap-southeast-2.s3.ap-southeast-2.amazonaws.com/frontend-discovery-service/latest/template.yaml) |
| **Asia Pacific (Tokyo)** (ap-northeast-1)  | [Launch](https://console.aws.amazon.com/cloudformation/home?region=ap-northeast-1#/stacks/new?frontend-discovery-service&templateURL=https://solution-builders-ap-northeast-1.s3.ap-northeast-1.amazonaws.com/frontend-discovery-service/latest/template.yaml) | [Link](https://solution-builders-ap-northeast-1.s3.ap-northeast-1.amazonaws.com/frontend-discovery-service/latest/template.yaml) |
| **EU (Ireland)** (eu-west-1) | [Launch](https://console.aws.amazon.com/cloudformation/home?region=eu-west-1#/stacks/new?frontend-discovery-service&templateURL=https://solution-builders-eu-west-1.s3.eu-west-1.amazonaws.com/frontend-discovery-service/latest/template.yaml) | [Link](https://solution-builders-eu-west-1.s3.eu-west-1.amazonaws.com/frontend-discovery-service/latest/template.yaml) |
| **EU (London)** (eu-west-2) | [Launch](https://console.aws.amazon.com/cloudformation/home?region=eu-west-2#/stacks/new?frontend-discovery-service&templateURL=https://solution-builders-eu-west-2.s3.eu-west-2.amazonaws.com/frontend-discovery-service/latest/template.yaml) | [Link](https://solution-builders-eu-west-2.s3.eu-west-2.amazonaws.com/frontend-discovery-service/latest/template.yaml) |
| **EU (Frankfurt)** (eu-central-1) | [Launch](https://console.aws.amazon.com/cloudformation/home?region=eu-central-1#/stacks/new?frontend-discovery-service&templateURL=https://solution-builders-eu-central-1.s3.eu-central-1.amazonaws.com/frontend-discovery-service/latest/template.yaml)   | [Link](https://solution-builders-eu-central-1.s3.eu-central-1.amazonaws.com/frontend-discovery-service/latest/template.yaml)     |
| **EU (Stockholm)** (eu-north-1)| [Launch](https://console.aws.amazon.com/cloudformation/home?region=eu-north-1#/stacks/new?frontend-discovery-service&templateURL=https://solution-builders-eu-north-1.s3.eu-north-1.amazonaws.com/frontend-discovery-service/latest/template.yaml) | [Link](https://solution-builders-eu-north-1.s3.eu-north-1.amazonaws.com/frontend-discovery-service/latest/template.yaml) |

2. Login to AWS Account:

    If prompted, log in using your AWS account credentials.

3. Create Stack:

    - Navigate to "Create Stack" at the "Specify template" step.
    - The fields for the CloudFormation template are pre-populated.
    - Click "Next" to continue.

4. Specify Stack Details:

    **Provide values for the CloudFormation stack parameters:**

    - **Stack Name:** (Default: frontend-discovery-service) This is the name that is used to refer to this stack in CloudFormation once deployed.
    - **AccessControlAllowOrigin:** The cors configuration for allow-origin for the consumer API. Specify a domain or `*` to allow all.
    - **CookieSettings:** Suffix to be applied by Consumer API when producing the `Set-Cookie` header in case of user not recognized, in order to guarantee stickiness during deployments. Default value is `Secure`. For example, if the new user token will be `example123`, the header will be: `Set-Cookie: USER_TOKEN=example123; Secure`.
    
    **Optional Parameters:**
    - **EnableDynamoDBBackups:** (Default: false) Whether to enable point in time recovery for the DynamoDB tables.
    - **Stage:** (Default: prod) The stage name used for both APIs.
    - **LogLevel:** (Default: INFO) The log level for Lambda functions deployed for the solution.
    - **DefaultUserEmail:** Optional email for the default user for the Admin API. Leave blank to skip creation.
    - **CognitoAdvancedSecurity**: (Default: OFF) The type of Cognito advanced security to enable.
    - **DeleteExpiryMinutes**: (Default: 1440) How long deleted records (Projects, Micro-Frontends) will remain in the system before expiry.
    
    Click "Next" when completed.

5. [Configure Stack Options:](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-console-add-tags.html)

    Adjust additional options if desired, then click "Next."

6. Review and Acknowledge Permissions:

    Check the following boxes to grant necessary permissions:

    - IAM resources creation acknowledgment.
    - IAM resources with custom names acknowledgment.
    - CloudFormation CAPABILITY_AUTO_EXPAND acknowledgment.

7. Create Stack:

    Click *"Create Stack."*

8. Monitor Progress:

    - Wait for the CloudFormation stack to launch.
    - Completion is marked by "Stack status" of "CREATE_COMPLETE."
    - Monitor the stack creation in the "Events" tab.

9. Retrieve API Access Values:
    
    Note the AdminApi and ConsumerApi values in the Outputs tab for future access to the application.

## Accessing the Application

The solution integrates an Admin REST API and Consumer API, allowing you to seamlessly incorporate it into your existing applications. 

Here's how to manage Admin API users:

### Managing Admin API Users

Follow these steps to add or manage users within the application:

1. **Navigate to UserPool**:
   - Select the "Resources" tab for your CloudFormation stack.
   - Find the "UserPool" and click the link in the "Physical ID" column to access the Cognito console for the UserPool.

2. **Manage Users**:
   - Select the "Users" tab.
   - Utilize this page to create or manage users as needed.

For more detailed information on managing users, please refer to the [Managing Users in User Pools Guide](https://docs.aws.amazon.com/cognito/latest/developerguide/managing-users.html).

### Making Authenticated API Requests

This section guides you on how to make authenticated API requests using the Admin API. You'll need to authenticate these requests using the AWS Cognito User Pool.

## Authentication with Cognito

### Credentials

Note down the `CognitoUserPoolID`, `CognitoWebClientID`, and `AdminApi` parameters from the "Outputs" tab of your stack.

>**Note:** If you provided a `DefaultUserEmail` parameter during deployment, a temporary password will be emailed to you. Otherwise, you'll need to create a user in the AWS Console and use the temporary password to establish a long-term password.

### Step-by-Step Authentication Guide

1. **Initiate Authentication**:
   Use the values you noted earlier to run the following command:
   ```bash
   aws cognito-idp admin-initiate-auth \
     --user-pool-id $COGNITO_USER_POOL_ID \
     --client-id $COGNITO_USER_POOL_CLIENT_ID \
     --auth-flow ADMIN_USER_PASSWORD_AUTH \
     --auth-parameters USERNAME=$USER_EMAIL_ADDRESS,PASSWORD=$USER_PASSWORD
   ```

2. **Respond to Password Challenge**:
   You will receive a challenge response requiring a password update. Fill in session with the value from the response to the previous command. Update USER_PASSWORD variable to a new complex password. Respond with:
   ```bash
    aws cognito-idp admin-respond-to-auth-challenge \
    --user-pool-id $COGNITO_USER_POOL_ID \
    --client-id $COGNITO_USER_POOL_CLIENT_ID \
    --challenge-name NEW_PASSWORD_REQUIRED \
    --session $SESSION \
    --challenge-responses USERNAME=$USER_EMAIL_ADDRESS,NEW_PASSWORD=$USER_PASSWORD
   ```

3. **Authenticate for Future Sessions**:
   You will receive an authentication response. For future sessions, authenticate using the first command above.

4. **Make Authenticated Requests to the API**:
   Use the `IdToken` generated previously to make an authenticated request. 
   
   Example:
   ```bash
   curl $API_URL/projects -H "Authorization: Bearer $ID_TOKEN"
   ```

### Example and Additional Resources

- An example of programmatic authentication can be found in the [integration tests](https://github.com/module-federation/module-federation-examples/blob/master/tests/integration.test.js).
- For further details, refer to the [Cognito REST API integration guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-invoke-api-integrated-with-cognito-user-pool.html).

Follow this guide to ensure secure and authenticated access to your Admin API using Cognito. Feel free to refer to the provided examples and integration guide for more advanced usage scenarios.

### Integrating the Solution with Other Applications

This section outlines how to seamlessly integrate the Frontend Service Discovery on AWS with other applications deployed in the same AWS account and region using AWS CloudFormation.

### Using CloudFormation Stack Outputs

You can leverage the Frontend Service Discovery solution stack as a nested stack. This allows you to use its outputs (such as the API URL) as inputs for other applications. Here's how you can proceed:

>Note on Using Exports: When another stack imports an output value, remember that you cannot delete or modify the stack exporting the value. You must remove all imports before deleting the exporting stack or altering the output value.

For a comprehensive understanding of the differences between importing exported values and using nested stacks, please consult the [Exporting Stack Output Values]() guide.

## Customizing the Consumer Response

The process of customizing the consumer response involves a sequence of steps to determine the version information to return when a consumer requests a MicroFrontend via the Consumer API. The procedure can be segmented into two main phases:

### Phase 1: Consumer Stickiness

#### Process:

1. **Initial Request**: If a `USER_TOKEN` cookie does not already exist, the response to the first request of a Consumer includes a `Set-Cookie` header, persisting across various requests.
   
2. **Cross-Domain Consideration**: If working cross-domain, use `Secure; Same-Site=None` as `CookieSettings` during solution deployment. Also, specify the Frontend's origin as `AccessControlAllowOrigin` to comply with CORS rules and ensure proper cookie persistence.

3. **Customization**: This functionality is implemented as middleware using [middy](https://middy.js.org/docs/). Custom middleware can be easily written if needed. Refer to the default code in [userTrackingHandler.js](https://github.com/module-federation/module-federation-examples/blob/master/infrastructure/lambda/consumerApi/userTrackingHandler.js)

### Phase 2: Determining the MicroFrontend for a Consumer

#### Process:

1. **Single Active Version**: If only one version is active, it will be returned.
   
2. **Multiple Active Versions**: The `USER_TOKEN` combines with current active versions to determine a bucket value ranging from 1-100. It's then compared with the MicroFrontend's traffic distribution to select the proper version. If a deployment shifts the traffic distribution, Consumers eventually transition to the new version. As the bucket value is consistent for a given set of active versions, the Consumer will then remain on the new version as the deployment continues.

3. **Error Handling**: In case of errors, the version marked as `default` is returned.

4. **Customization**: The above functionality is implemented in [determineMFE.js](https://github.com/module-federation/module-federation-examples/blob/master/infrastructure/lambda/consumerApi/determineMFE.js) and can be customized as needed.

## Detailed Example:

### Scenario:
- Project: MyWebsite (ID: aa11)
- MicroFrontend: Catalog (ID: bb22)
- Active Version: 1.0.0

### Steps:

1. **Consumer API Request**: Two users (USER_ID 12345 and 23456) consume the Consumer API on Prod stage: `GET https://{consumerAPIUrl}/Prod/aa11/microFrontends`. They both receive a response for version 1.0.0 of Catalog, similar to:

    ```json
    {
        "schema": "https://raw.githubusercontent.com/awslabs/frontend-discovery/main/schema/v1-pre.json",
        "microFrontends": {
            "MyWebsite/Catalog": [
                {
                    "metadata": {
                        "version": "1.0.0",
                        "integrity": "e0d123e5f317bef78bfdf5a008837200"
                    },
                    "fallbackUrl": "https://alt-cdn.com/catalog-1.0.0.js",
                    "url": "https://static.example.com/catalog-1.0.0.js"
                }
            ]
        }
    }
    ```

2. **Deploying New Version**: The Admin API deploys version 2.0.0 of Catalog with a `Linear10PercentEvery1Minute` deployment strategy `POST https://{adminAPIUrl}/Prod/aa11/microFrontends/bb22/versions` with appropriate `Authorization` header and request body:

    ```json
    {
        "version": {
            "url": "https://static.example.com/catalog-2.0.0.js",
            "metadata": {
                "version": "2.0.0",
                "integrity": "e0d123e5f317bef78bfdf5a008837200"
            },
            "fallbackUrl": "https://alt-cdn.com/catalog-2.0.0.js"
        },
        "deploymentStrategy": "Linear10PercentEvery1Minute"
    }
    ```

3. **Traffic Distribution**: Immediately and for the next minute, 10% of the users will start seeing version 2.0.0 when making the request described in step 2, while 90% will keep seeing 1.0.0. The platform will do its best to distribute traffic according to configuration, making sure stickiness is guaranteed, so that when user 12345, at some point during the deployment, starts to see version 2.0.0, they will keep seeing the same version for the rest of the deployment.

4. **Deployment Completion**: After approximately 10 minutes, all users receive version 2.0.0.

## Creating Deployments for MicroFrontends

Creating a deployment for a MicroFrontend involves a structured process that can be initiated in one of two ways:

1. **Publishing a Version with a Deployment Strategy**: When releasing a new version of the MicroFrontend, include a specific deployment strategy.
2. **Creating a Deployment for a Previously Published Version**: Deploying a version that has already been published without a specific strategy.

### Understanding the Deployment Process

When a deployment begins, it follows a series of systematic steps to ensure that the MicroFrontend is updated accurately:

#### 1. **Checking for Existing Deployments**:
   - The system checks whether there is already an ongoing deployment for the same MicroFrontend.
   - If an existing deployment is found, the API returns a 4xx response, preventing further action.

#### 2. **Calculating States Based on the Deployment Strategy**:
   - The requested Deployment Strategy determines a set of states to be implemented during the deployment.
   - These states are in line with [AWS SAM options](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/automating-updates-to-serverless-apps.html) and are recorded in the Deployment DynamoDB table.

#### 3. **Initiating a Step Functions State Machine Execution**:
   - This process governs the flow of the deployment, applying the calculated states to the MicroFrontend DynamoDB table.
   - The detailed sequence of this process is as follows:

     - **Apply Calculated States**: The system continues to apply the calculated states to the MicroFrontend DynamoDB table until the deployment reaches completion.
     - **Update the Default Property**: Once the deployment is finished, the `default` property of the MicroFrontend is updated to reflect the new version.

![](https://github.com/module-federation/module-federation-examples/blob/master/frontend-discovery-service/images/deploymentflow.png)

## Audit Logs 

The use of the Admin API is associated with the generation of audit logs. These logs are dispatched to CloudWatch Logs and organized under a specific `audit key`, facilitating an orderly and methodical recording of activities. Due to their structured nature, these logs can be accessed and queried through CloudWatch Log Insights, allowing for precise analysis and tracking of interactions. 

The following example query may serve as an initial reference for those seeking to explore the logs in more detail:

```
filter ispresent(audit.method)
| fields @timestamp, @logStream, audit.method, audit.user, audit.ipAddress, audit.projectId, audit.microFrontendId, audit.version, audit.deploymentId, audit.statusCode
| sort @timestamp desc
```

## Updating the Solution

To benefit from the latest features and improvements, you should update the solution deployed to your account when a new version is published. To find out what the latest version is and what has changed since your currently deployed version, check the [Changelog].

How you update the solution depends on the difference between versions. If the new version is a minor upgrade (for instance, from version 3.45 to 3.67) you should deploy using a CloudFormation Stack Update. If the new version is a major upgrade (for instance, from 2.34 to 3.0) you may wish to deploy as a new stack and migrate the DynamoDB data across manually.

Major version releases are made in exceptional circumstances and may contain changes that prohibit backward compatibility. Minor versions releases are backward-compatible.

### Identify current solution version

You can find the version of the currently deployed solution by retrieving the
`SolutionVersion` output for the solution stack. The solution version is also
shown on the Dashboard of the Web UI.

### Identify the Stack URL to deploy

After reviewing the [Changelog], obtain the `Template Link` URL of the latest
version from ["Deploying the Solution"](#deploying-the-solution) (it will be
similar to
`https://solution-builders-us-east-1.s3.us-east-1.amazonaws.com/frontend-discovery-service/latest/template.yaml`).
If you wish to deploy a specific version rather than the latest version, replace
`latest` from the url with the chosen version, for instance
`https://solution-builders-us-east-1.s3.us-east-1.amazonaws.com/frontend-discovery-service/v0.2/template.yaml`.

### Minor Upgrades: Applying CloudFormation Stack Update

Performing minor upgrades usually requires deploying a CloudFormation Stack update. Here are the steps for both the AWS Console and the AWS Command Line Interface (CLI):

### Deploying via the AWS Console:

1. **Access the CloudFormation Console**: Navigate to the [CloudFormation Console Page], and select the desired Solution by clicking on the corresponding stack's radio button.

2. **Initiate the Update Process**: Click on "Update," then choose "Replace current template." Enter the template URL for the version you want to deploy into the "Amazon S3 URL" textbox. Click "Next."

3. **Review Stack Details**: On the "Stack Details" screen, carefully review the Parameters, and then click "Next."

4. **Configure Stack Options**: On the "Configure stack options" screen, simply click "Next."

5. **Acknowledgments**: On the "Review stack" screen, you must acknowledge the following:
   - "I acknowledge that AWS CloudFormation might create IAM resources."
   - "I acknowledge that AWS CloudFormation might create IAM resources with custom names."
   - "I acknowledge that AWS CloudFormation might require the following capability: CAPABILITY_AUTO_EXPAND."
   
   These acknowledgments enable CloudFormation to create a Role allowing access to the necessary resources and to dynamically name them.

6. **Start the Update**: Click "Update stack" to begin the stack update process.

7. **Monitor the Update**: Wait for the CloudFormation stack to finish updating. You will know the update is complete when the "Stack status" displays "UPDATE_COMPLETE."

### Deploying via the AWS CLI:

For those who prefer using the AWS Command Line Interface (CLI) for deploying updates, you can find detailed instructions in the [AWS documentation](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/update-stack.html).

By following these guidelines, you'll be able to successfully apply a minor update to your solution, taking advantage of new features and improvements in the software.

### Major Upgrades: Implementing a New Deployment

A major upgrade requires more careful planning and execution as it involves creating a completely new stack and migrating data and users. Here's a step-by-step guide to help you through the process:

### Creating a New Stack and Migrating Data:

1. **Deploy a New Instance**: Follow the instructions in the [Step-by-Step Deployment Guide section](#deploying-the-solution), ensuring you use unique values for the Stack Name parameter that differ from the existing stack.

2. **Data Migration**: Migrate data related to MicroFrontends from the old DynamoDB to the new stack. For smaller data sets, scripting the transfer may be most convenient. Alternatively, you can utilize [S3 Export](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/S3DataExport.HowItWorks.html) and then create a script solely for import.

3. **Review Changes**: Consult the [Changelog] to understand any changes that might affect how you interact with the new deployment. You might need to update software or libraries that interface with the APIs.

4. **Delete the Old Stack**: Once all Admin and Consumer Users are migrated to the new stack, you can safely delete the old stack.

## Deleting the Solution:

### Via AWS Console:

1. **Access the CloudFormation Console**: Navigate to the [CloudFormation Console Page](https://console.aws.amazon.com/cloudformation/home) and select the solution stack, then click "Delete."

2. **Confirm Deletion**: Once the confirmation modal appears, choose "Delete stack."

3. **Monitor Deletion**: Wait for the CloudFormation stack to finish deleting. Completion is indicated when the "Stack status" displays "DELETE_COMPLETE."

#### Via AWS CLI:

If you prefer using the AWS Command Line Interface (CLI) to delete a stack, please refer to the [AWS documentation](https://docs.aws.amazon.com/cli/latest/reference/cloudformation/delete-stack.html)
