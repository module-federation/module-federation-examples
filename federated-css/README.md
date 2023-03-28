# Federated Styles Example

- `expose-remotes` apps exposes components with a different types of components styling.
- `consumers-nextjs` NextJs apps consumes exposed components in different combinations.
- `consumers-react` React apps consumes exposed components in different combinations.

# Reason

To show examples of how different types of styling could be federated.

# Comparison Table

|           Exposed Styling | React                            | NextJs                           |
|--------------------------:|----------------------------------|----------------------------------|
| Css                       | can import (affect global)       | can import (affect global)       |
| Scss                      | can import (affect global)       | can import (affect global)       |
| Less                      | can import (affect global)       | can import (affect global)       |
| Css Module                | can import (affect encapsulated) | can import (affect encapsulated) |
| react-jss                 | can import (affect encapsulated) | can import (affect encapsulated) |
| styled-components         | can import (affect encapsulated) | can import (affect encapsulated) |
| tailwind css (as module)  | can import (affect encapsulated) | can import (affect encapsulated) |
| tailwind styled component | can import (affect encapsulated) | can import (affect encapsulated) |
| Css variables in css      | can import (affect global)       | can import (affect global)       |


# Running Expose Remotes
Command `start:expose-all` will run remotes `http://localhost:4000-4008/` with exposed components


# Running Demo React
Commands will run host react App on `http://localhost:3001-3008/`

- `start:react:jss-tailwind-component`
- `start:react:css-styled-component`
- `start:react:less-scss`
- `start:react:css-module-and-jss`
- `start:react:tailwind-global-and-less`
- `start:react:tailwind-module-and-jss`
- `start:react:combination-of-5`
- `start:react:combination-of-4`

Since there are 9! variants of remotes combinations you are able to create and run your own `start:react:any-combination --scopes=@federated-css/{REQUIRED_COMBINATION_OF_REMOTES}`

ex. `yarn start:react:any-combination --scope=@federated-css/{expose-css,expose-scss,expose-less,expose-tailwind-css-global}`
it will run all required expose remotes and creates host app with provided depth.
Note. you don't need to start required remotes separately for this command.


|           Available Scopes |
|---------------------------:|
|                 expose-css |
|          expose-css-module |
|                 expose-jss |
|                expose-less |
|                expose-scss |
|    expose-styled-component |
| expose-tailwind-css-global |
| expose-tailwind-css-module |

# Running Demo NextJs
Commands will run host NextJs App on `http://localhost:8081-8084/`.

-`start:nextjs:combination-of-4`
-`start:nextjs:jss-tailwind-global`
-`start:nextjs:jss-css-and-tailwind-module`
-`start:nextjs:less-and-styled-component`

Since there are 9! variants of remotes combinations you are able to create and run your own `start:nextjs:any-combination --scopes=@federated-css/{REQUIRED_COMBINATION_OF_REMOTES}`

ex. `yarn start:nextjs:any-combination --scope=@federated-css/{expose-css,expose-scss,expose-less,expose-tailwind-css-global}`
it will run all required expose remotes and creates host app with provided depth.
Note. you don't need to start required remotes separately for this command.


|           Available Scopes |
|---------------------------:|
|                 expose-css |
|          expose-css-module |
|                 expose-jss |
|                expose-less |
|                expose-scss |
|    expose-styled-component |
| expose-tailwind-css-global |
| expose-tailwind-css-module |



- [localhost:3001](http://localhost:3001/) (React HOST)
- [localhost:8080](http://localhost:8080/) (NextJs HOST)
- [localhost:4000](http://localhost:4000/) (STANDALONE REMOTE)
- [localhost:4001](http://localhost:4001/) (STANDALONE REMOTE)
- [localhost:4002](http://localhost:4002/) (STANDALONE REMOTE)
- [localhost:4003](http://localhost:4003/) (STANDALONE REMOTE)
- [localhost:4004](http://localhost:4004/) (STANDALONE REMOTE)
- [localhost:4005](http://localhost:4005/) (STANDALONE REMOTE)
- [localhost:4006](http://localhost:4006/) (STANDALONE REMOTE)
- [localhost:4007](http://localhost:4007/) (STANDALONE REMOTE)
- [localhost:4008](http://localhost:4008/) (STANDALONE REMOTE)
  <img src="https://ssl.google-analytics.com/collect?v=1&t=event&ec=email&ea=open&t=event&tid=UA-120967034-1&z=1589682154&cid=ae045149-9d17-0367-bbb0-11c41d92b411&dt=ModuleFederationExamples&dp=/email/FederatedStyles">
