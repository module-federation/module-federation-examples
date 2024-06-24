# Project Setup and Error Replication Guide


## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies

You need to install dependencies for both the Provider and consumer folders.

#### In the Provider Folder

```bash
cd provider
yarn install
```

#### In the Consumer Folder

Open a new terminal or navigate back to the root folder and then:

```bash
cd consumer
yarn install
```

### 3. Run the Application

#### In the Consumer Folder

```bash
yarn dev
```

## Replicate the Error

1. **Change Any Component**: Open any component file in your preferred code editor, make any change (even adding a comment will suffice), and save the file.
2. **Refresh the Browser**: Go to the browser where the app is running and refresh the page.

## Expected Error

After performing the above steps, you should see the following error in the browser console:

```
Uncaught (in promise) TypeError: Cannot read properties of null (reading 'isCE')
```

## Additional Notes

- Ensure that both the provider and consumer folders have their dependencies installed before running the application.
