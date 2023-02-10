<div align="center">
    <h1> 
        Cypress e2e </br> (Module Federation Examples)
    </h1>
    <p>
        <a>
            <img src="https://img.shields.io/badge/Tested%20with-Cypress-04C38E.svg"/>
        </a>
            <a href="https://github.com/module-federation/module-federation-examples/actions/workflows/on-pull-request.yml">
                <img src="https://github.com/module-federation/module-federation-examples/actions/workflows/on-pull-request.yml/badge.svg"/>
            </a>
        </a>
        </a>
    </p>
</div>

Structure of the cypress folder:

```
cypress
├── common
│   ├── base.ts
│   └── selectors.ts
├── config
│   └── cypress.config.ts (cypress system file)
├── fixtures
│   └── constants.ts
│   └── commonTestData.ts
├── helpers
│   └── base-helper.ts
├── support
│   ├── commands.ts (cypress system file)
│   └── e2e.ts (cypress system file)
├── types
├── screenshots (optional)
├── videos (optional)
├── downloads (optional)
```

`common` - contains common files for the tests.
- `base.ts` - all methods that could be used in more than one test should be placed in this file.
- `selectors.ts` - all selectors/locators that are used in tests.

`config` - contains configuration files for the Cypress itself.
- `cypress.config.ts` - Cypress config file. Since Cypress 10, all plugins and configs for Cypress should be placed here. [How to config Cypress](https://docs.cypress.io/guides/references/configuration)

`fixtures` - contains files or data that are used in tests, such as images, json constants, etc.

`helpers` - contains data-generation methods for tests. As an example, there is a method for generating data for the tests called `base-helper.ts`.

`support` - contains files that are loaded automatically before every test, such as commands, etc.
- `commands.ts` - all custom commands that could be use in tests are placed in this file.
- `e2e.ts` - contains imports for our custom commands.

`types` - contains types ( Interfaces, enums ) for the tests. As an example, there are enums for the dates and css Values.

`screenshots` - contains screenshots of the failed runs. This folder is optional and can be removed or added to .gitignore.

`videos` - contains videos of the failed runs. This folder is optional and can be removed or added to .gitignore.

`downloads` - contains files that are downloaded during the tests. This folder is optional and can be removed or added to .gitignore.

<h2 align="center">How to run tests</h2>

> **Note:** All commands must be executed from the root directory of the project."

### Interactive mode

To run tests in interactive mode, run:

```bash
npm run cypress:debug
```

It will open Cypress Test Runner and allow to run tests in interactive mode:

![Cypress test runner](https://i.ibb.co/yssCZZX/Screenshot-2023-01-11-at-13-34-32.png)

First, select the browser in which the tests are to be executed. Next, initiate the tests by choosing the test name. 

>**Note:** Cypress is configured to use the Chrome browser as the default option.

Then, select the test that needs to be executed by selecting it.

![Cypress test runner](https://i.ibb.co/FqFWmP6/Screenshot-2023-01-11-at-13-40-50.png)

Here we go! Now the test is running in the browser.

![Cypress test runner](https://i.ibb.co/wJGQVtC/Screenshot-2023-01-11-at-13-43-41.png)

To debug the test, utilize the built-in browser [dev tools](https://developer.chrome.com/docs/devtools/open/). They allow for debugging the test.

![Console](https://i.ibb.co/rwQ9Zjm/Screenshot-2023-01-11-at-13-45-47.png)

### Headless mode

To run the tests in headless mode, run following command:

```bash
npm run cypress:run
```

The tests are executed in headless mode, which is useful for CI/CD. The system generates screenshots and videos of failed runs. These files can be found in the `cypress/screenshots` directory and the `cypress/videos` directory, respectively. Additionally, it creates a file named `mochawesome.html` in the `cypress/reports/mochawesome-report` directory, which contains the test run results. This file can be opened in a browser as a standard HTML file.

To begin the test run, execute the following command in the Terminal. This command will execute all the tests without building or starting the application. It is necessary to manually start the application before running the command, and then run only the specific test that is required.

```bash
npx cypress run --config-file cypress/config/cypress.config.ts --browser=chrome --spec "path_to_test"
```

For example:
```bash
npx cypress run --config-file cypress/config/cypress.config.ts --browser=chrome --spec "./advanced-api/automatic-vendor-sharing/e2e/*.cy.ts"
```

For ease of use, each sample includes a script that performs the following tasks: 
- building the sample, 
- starting the sample, and 
- executing the tests in headless mode. 

To execute the script, use the following command:

```bash
npx lerna run --scope="name_of_sample_in_sample_package.json" e2e:ci
```
![Sample package.json name](https://i.ibb.co/Tgcgp1C/Screenshot-2023-01-11-at-14-00-51.png)

For example:
```bash
npx lerna run --scope=automatic-vendor-sharing e2e:ci
```

This command will perform the following tasks in sequence: 
- building the application, 
- waiting for it to start on localhost, 
- starting the application, 
- executing the tests,
- and then providing a simple summary of the test results. 
 
It will exit with a code of 0 or 1, indicating whether the test run was successful or not.

>`0` means that all tests passed and `1` means that at least one test failed.

![Console](https://i.ibb.co/p0fn5Fz/Screenshot-2023-01-11-at-14-08-29.png)

>**Note:** This command does not stop the application after the test run. It must be manually stopped by executing the following command:
>
>```bash
>kill -9 $(lsof -ti:port_you_need_to_kill)
>```
>
>For example:
>```bash
>kill -9 $(lsof -ti:3001)
>```
### Test report

After you run tests in a Headless mode, you can find a report in the `cypress/results` directory. It is a `.json` files. It contains information about the test run, such as the number of tests, the number of passed tests, the number of failed tests, and the duration of the test run. To genarete HTML report, you can run:

```bash
npm run report:generate
```

And find the report in the `cypress/report` directory. It is a `.html` file. You can open it in a browser as a standard HTML file.

It looks like:

![Allure report](https://i.ibb.co/7Smkgts/Screenshot-2023-01-30-at-12-52-14.png)

In `Suites` tab you can find all the tests. And debug them.

![Allure report suites](https://i.ibb.co/ggrzwqd/Screenshot-2023-01-30-at-12-52-26.png)

>**Note:** On CI pipeline, the report will be generated automatically and added to your PR as a comment. Of course by workflow status.

Success:
![Allure report success comment](https://i.ibb.co/bRXZTJs/Screenshot-2023-02-03-at-13-13-07.png)

Failed:
![Allure report failed comment](https://i.ibb.co/BTj5Qvh/Screenshot-2023-02-03-at-13-13-17.png)

Cancelled:
![Allure report cancelled comment](https://i.ibb.co/5BgYrJ6/Screenshot-2023-02-03-at-13-18-27.png)

In comment you can find a link to the report and a link to the workflow itself, so you can go to the report by clicking on the link in the comment 🔥

<h2 align="center">How to write tests</h2>

### Create a test

First, create a new, empty test file. It should be located in the `sample/e2e` directory. The file name should end with the `.cy.ts` extension, and should have a simple, self-explanatory name.

For example:
- hostChecks.cy.ts
- name_of_sample.cy.ts
- etc.

Then, import the `common` methods and `PageObject` for the test.

As an example:

```typescript
import { BaseMethods } from '../../../cypress/common/base';

const basePage: BaseMethods = new BaseMethods()
```

Create the describe (suite) for the test:

```typescript
describe(`Example test`, () => {

})
```
Sometimes it isn't nessesary to use `before` & `beforeEach` hooks. But if you need to do some actions before the test, you can use them. Put `before` or `beforeEach` hook into `describe` block. It will be executed before each test (means `beforeEach`) or before all the tests (means `before`) in the suite.

As an example, our hook opens needed localhost before every test in the suite:

```typescript
describe(`Example test`, () => {
    beforeEach(() => {
        cy.visit('https"//localhost:3001')
    })
})
```

And finally, add the test case into the `describe` block by adding `it` block:

```typescript
describe(`Example test`, () => {
    beforeEach(() => {
        cy.visit('https"//localhost:3001')
    })

    it(`Should open localhost`, () => {
        cy.url().should('include', 'localhost:3001')
    })
})
```

Voilà, it is done! 😃

>**Note:** When writing tests, it is recommended to use the existing methods located in the `common` directory. If a new method is required, it should be added to the `common/base.ts` file. However, if the new method will only be used in a single test, it can be added to the `sample/e2e/methods.ts` file.

The following is an example of how the test will appear when utilizing the pre-existing common methods:

```typescript
describe(`Example test`, () => {
    beforeEach(() => {
        basePage.openLocalhost(3001)
    })

    it(`Should open localhost`, () => {
        basePage.checkUrlText(3001)
    })
})
```

### Create methods

If a new method is needed, and it will be reused across multiple test for multiple samples, it should be added to the `common/base.ts` file.

>**Note:** New methods should only be added to the `base.ts` file if they will be used in more than one sample.

If the new method will only be used in a single sample, a new methods folder should be created within the `sample/e2e/` directory and a `methods.ts` file should be added to it. The new method can then be added to the `methods.ts` file, allowing it to be used only in the specific sample where it was created.

Don't forget to import it in the test, as shown:

```typescript
import {ExampleMethods} from "../methods/methods";
```

And then use it in the test:

```typescript
describe(`Example test`, () => {
    beforeEach(() => {
        basePage.openLocalhost(3001)
    })

    it(`Should open localhost`, () => {
        exampleMethods.checkSomething('Thing😎')
    })
})
```

<h2 align="center">Best Practices & Rules</h2>

## Rules
### File rules

##### `base.ts`

- Only for reusable methods;
- All methods should be clearly and correctly named, in an understandable matter:
  - Method names should include the validation type, element, and state (optional). For example: `checkElementExist` or `fillFormField`;
  - Method names should be in camelCase;
- Every method should return something, whether it is `: void` if we don't return anything (but it is set explicitly) or `: string | number | object` if we return some string, number or object etc.;
- Methods need be added in the strict order:
  - `public` (at the beginning);
  - `protected` (in between `public` and `private`);
  - `private` (at the end);
- All methods inside file grouped in multiple sections  
  - `Clicks Section` -> for methods related to click actions
  - `Checks Section` -> for methods related to check actions (checkElementVisibility, checkElementContainText, etc)
  - `Writes Section` -> for methods related to write actions (fillField, etc)
  - `Helpers Section` -> for methods related to base actions (openLocalhost, reloadPage, etc)
  - `Activities Section` -> for methods related to specific actions (addUser, compareInfoBetweenHosts, etc)
  - `Privates Section` -> for privates methods only
- NOTE: Do not add almost similar methods (like checkElementVisibility & checkChildELementVisibility), if existed methods do not have enough functionality for specific case, find a way to increase it
- NOTE: If new method should be added, always add it to the right section according to logic

##### `selectors.ts`

- There are several blocks where `selectors/locators` can be added:
  - `baseSelectors` block includes `tags`, `css` and `ids` blocks. According to types only the most common selectors which can be found on the almost every page (like div, button, etc) should be added there;
  - `commonSelectors` block should include selectors which is used for multiple samples but not so common and basic like the ones in `baseSelectors` block;
  - `selectors` block should include specific selectors which is used for specific sample
  - `updatedSelectors` block includes both common and specific selectors which created by combining of two different selectors
- NOTE Please follow added structure, for example if you add selector in `baseSelectors` block always search for suitable block for it
- NOTE For `selectors` and `updatedSelectors` blocks please combine selectors under appName just like it's already added, it will help selectors file to be more clear and readable 
- NOTE Added blocks types should be enough to cover all selectors needs, so it should be unnecessary to create new selectors blocks (only new blocks inside existed ones, for example blocks of selectors for the newest sample inside `selectors` block)   
- Try to avoid duplicating `selectors/locators` by utilizing/moving existing ones;
- If a `selector/locator` appears to be common, but has an incorrect name, please rename it correctly and move to another block if necessary (e.g. `button` to `commonButton`) and make sure to update all places where it is used.

##### `constants.ts`

- All `constants` should be added to their corresponding blocks based on logic:
  - Files path (if you need to reach some system file by test) to `filesPath` block;
  - Selectors parts (which used to create selector with replace element) to `selectorParts` block;
  - Common constants data (which can be used in multiple places throughout constants or in multiple samples) to `commonConstantsData` block;
  - updated constants data (combined constants from multiple elements) to `updatedConstantsData` block;
  - elements text to `elementsText` block;
  - different phrases from samples to `commonPhrases` block;
  - values related to elements color (rgb/non rgb) to `color` block;
  - links elements to `hrefs` block;
  
  NOTE: Please combine all constants inside block by sample name, for example `commonPhrases` -> `sample name` -> constants inside object. You can create such objects in all constants types which you need
- If a suitable block does not exist, consider if it is necessary to create a new one with a clear and understandable name;
- Try to avoid duplicating `constants` by moving common constant to `commonConstantsData` block and updating of all usage places 
- If a constant has an incorrect name, please rename it correctly (e.g. `buttonText` to `commonButtonText`) and make sure to update all places where it is used.

##### `commonData.ts`

The main reason of commonData.ts file is to store test which can be used for multiple samples, for example if we declare similar array of data in multiple samples it can be moved to commonData.ts and called from this file instead of redeclaring multiple times 

## Best Practices
### Add and Use data-e2e locators

For instance, if there are two or more elements on the page that have similar names, tags, and classes, but you only need to select one of them. 😢

In this case, you can use the data-e2e attribute to target the specific element you need. To do so, add the data-e2e attribute to the HTML or other relevant file of the sample.

```html
<div class="form-group">
  <input
    type="text"
    class="form-control"
    formControlName="name"
    placeholder="Name"
    #name
    data-e2e="FORM_FIELD__NAME"
  />
  <div *ngIf="angForm.controls['name'].invalid && (angForm.controls['name'].dirty || angForm.controls['name'].touched)" class="alert alert-danger">
    <div *ngIf="angForm.controls['name'].errors.required">
      Name is required.
    </div>
  </div>
</div>
```
And use it in the test:

```typescript
basePage.fillField({
    selector: '[data-e2e="FORM_FIELD__NAME"]',
    text: 'Module Federation is Cool 😎'
})
```

> **Note:** Please be careful, some samples are auto-reloading after changes and some are not. So carefully check what's needed when you change the source code. 🧐

#### Reusable data-e2e locators

To keep it DRY we can create reusable data-e2e locators. For example, we have a lot of buttons on the page. We can create a reusable data-e2e locator for all the buttons. And then use it in our tests:

```html
<button data-e2e="COMMON_BUTTON__FIRST">First</button>
<button data-e2e="COMMON_BUTTON__SECOND">Second</button>
<button data-e2e="COMMON_BUTTON__THIRD">Third</button>
```
Next, we need to create a selector and a get method that will replace the `{buttonName}` text in the selector with the desired text.

```typescript
const commonSelectors = {
    button: '[data-e2e="COMMON_BUTTON__{buttonName}"]'
}
```

```typescript
public getButtonName(buttonName: string): string {
    return commonSelectors.button.replace('{buttonName}', buttonName).toUpperCase();
}
```

In the end we get `data-e2e="COMMON_BUTTON` selector with the needed name.

For example:

```typescript
basePage.getButtonName('First') // will return us `data-e2e="COMMON_BUTTON__FIRST`
```

And we can use it an argument for the `check` or `click`, etc. methods

```typescript
basePage.isElementExist({
    selector: basePage.getButtonName('First')
})
```
### Use objects

#### Testing Identical Apps

When more than one app will be tested, and both apps are almost identical:

Example:

App1
![App1](https://i.ibb.co/26kNLXQ/Screenshot-2023-01-11-at-14-59-59.png)

App2
![App2](https://i.ibb.co/tZGn3F0/Screenshot-2023-01-11-at-15-00-03.png)

We have two apps `app1` and `app2` they are similar. So we can create one object for both apps. And then use it in our tests:

```typescript
const appsData = [
    {
        headerSelector: baseSelectors.tags.headers.h1,
        subHeaderSelector: baseSelectors.tags.headers.h2,
        buttonSelector: baseSelectors.tags.coreElements.button,
        headerText: Constants.elementsText.automaticVendorContent,
        appNameText: Constants.elementsText.automaticVendorFirstAppName,
        buttonColor: Constants.color.red,
        host: 3001
    },
    {
        headerSelector: baseSelectors.tags.headers.h1,
        subHeaderSelector: baseSelectors.tags.headers.h2,
        buttonSelector: baseSelectors.tags.coreElements.button,
        headerText: Constants.elementsText.automaticVendorContent,
        appNameText: Constants.elementsText.automaticVendorSecondAppName,
        buttonColor: Constants.color.deepBlue,
        host: 3002
    }
]
```

And then use it in our tests:

```typescript
appsData.forEach(
    (property: {
        headerSelector: string
        subHeaderSelector: string
        buttonSelector: string,
        headerText: string,
        appNameText: string,
        buttonColor: string,
        host: number
    }) => {
        describe(`Check example ${property.appNameText}`, () => {
            beforeEach(() => {
                basePage.openLocalhost(property.host)
            })

            it(`Check that ${property.appNameText} header is exist`, () => {
                basePage.checkElementWithTextPresence({
                    selector: property.headerSelector,
                    text: property.headerText
                })
            })
        })
    })
```

It will generate two `describes` and two `its` for each test, and our test run will look like the following:

![Test run](https://i.ibb.co/41KZJnc/Screenshot-2023-01-11-at-17-18-37.png)

### Separate common checks and uncommon

As a suggestion, if you have two or more applications with similar functionality, you can create a separate file for shared checks, named `commonChecks.ts`, and add your created object with common checks there.
NOTE: You can use `commonChecks.ts`, not only fot different apps but for similar checks in one app (for example similar checks of different buttons in one app)

So, your `e2e` directory will look like the following:

```
sample
├── some_system_files
└── e2e
    ├── methods (optional)
    │   └── methods.ts (optional)
    ├── hostChecks.cy.ts (for uncommon checks)
    ├── commonChecks.cy.ts (for common checks)
    └── runAllTest.cy.ts (for common and uncommon checks)
```
- `hostChecks.cy.ts` for non-similar checks. It contains all non-similar checks for each app;
- `commonChecks.cy.ts` for similar checks. It contains all similar checks for each app;
- `runAllTest.cy.ts` for similar and non-simillar checks. It contains all checks for each app. You don't need to duplicate code here, only import from your `commonChecks` and `hostChecks` files and that's all.

```typescript
import './hostChecks.cy'
import './commonChecks.cy'
```

### Managing Multiple Constants

When there is a need to add new constant, or change an existing one, and that app will contain more than one constant, create an object for it:

Example:

```typescript
testedAppsName: [
    App1: {
        name: 'App1'
        someConstant...
    },
    App2: {
        name: 'App2'
        someConstant...
    },
    App3: {
        name: 'App3'
        someConstant...
    }
]
```

Then, use it in your tests:

```typescript
import { BaseMethods } from '../../../cypress/common/base';
import { baseSelectors } from '../../../cypress/common/selectors';
import { Constants } from '../../../cypress/fixtures/constants';

const basePage: BaseMethods = new BaseMethods()

describe(`Check ${appName}`, () => {
    beforeEach(() => {
        basePage.openLocalhost(host)
    })
    it(`Check ${appName} built and running`, () => {
        basePage.checkElementWithTextPresence({
            selector: baseSelectors.tags.headers.header,
            text: Constants.testedAppsName.App1.name
        })
    })
})
```

### Skip tests with `skipWhen()` method

Sometimes you need to skip some tests. For example, you need to skip tests for the sample that don't have such elements on the page or even have another business logic in it. For that case you can use `skipWhen()` method.

> **Note:** This method was added to Cypress using the custom command functionality. Learn more about adding custom commands by proceeding to official Cypress [custom commands documentation](https://docs.cypress.io/api/cypress-api/custom-commands)

Usage:

🤔 Imagine, you have two apps with one button, but the button in the first app creates the user, and button in the second app deletes the user, and that buttons exist on separate hosts. So you write the tests to check creating the user and deleting the user. It looks like the following:

```typescript
const appData = [
    {
        host: 3001
    },
    {
        host: 3002
    }
]

appsData.forEach(
    (property: {
        host: number
    }) => {
        describe(`Check example apps`, () => {
            beforeEach(() => {
                basePage.openLocalhost(host)
            })

            it(`User should be created & added`, () => {
                basePage.clickElementBySelector({
                    selector: baseSelectors.createButton
                })
                basePage.checkUserCreated(true)
            })

            it(`User should be deleted`, () => {
                basePage.clickElementBySelector({
                    selector: baseSelectors.deleteButton
                })
                basePage.checkUserDeleted(true)
            })
        })
    })
```

It will run your testCases on every host, as an example on 3001 and 3002. So you need to skip user deletion on 3001 host, and user creation user on 3002. Let's do this!

Check how we already added `skipWhen()` custom command and keep in mind that you can add any custom command as simple as that if you need so. All custom commands are added to `cypress/support/commands.ts` file:

```typescript
declare global {
    namespace Cypress {
        interface Chainable {
            skipWhen(condition: boolean): void;
        }
    }
}

Cypress.Commands.add('skipWhen', function (condition) {
    if (condition) {
        this.skip()
    }
})
```

Then add it to `cypress/common/base.ts` file, because we are going to use it as global:

```typescript
public skipTestByCondition(condition: any): void {
    cy.skipWhen(condition)
}
```

And finally, use it in our testCase:

```typescript
const appData = [
    {
        host: 3001
    },
    {
        host: 3002
    }
]

appsData.forEach(
    (property: {
        host: number
    }) => {
        describe(`Check example apps`, () => {
            beforeEach(() => {
                basePage.openLocalhost(host)
            })

            it(`User should be created & added`, () => {
                basePage.skipTestByCondition(property.host === 3002)
                basePage.clickElementBySelector({
                    selector: baseSelectors.createButton
                })
                basePage.checkUserCreated(true)
            })

            it(`User should be deleted`, () => {
                basePage.skipTestByCondition(property.host === 3001)
                basePage.clickElementBySelector({
                    selector: baseSelectors.deleteButton
                })
                basePage.checkUserDeleted(true)
            })
        })
    })
```

`skipTestByCondition(condition)` will skip the test if the app is hosted on 3001 or 3002 respectively. Isn't it cool? 🔥🔥🔥

<h2 align="center" style="font-family: 'Great Vibes', cursive;">The End</h2>

<p align="center">Thank you for reading that 👏 </br> Have a great day & take care of yourself 👉 </br> If you have any Ideas💡 or Proposals 💬 please Welcome </br>
And don't forget to star this repo if you like it 😎</p>
