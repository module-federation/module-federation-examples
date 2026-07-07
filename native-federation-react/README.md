# Module Federation using ESbuild

## Usage

1. npm install
2. npm run build
3. npm run start

Apps will be running on http://localhost:3000, http://localhost:3001

["Best Practices, Rules amd more interesting information here](../../playwright-e2e/README.md)

## Help Wanted

Commonjs support:

Right now we depend on importing commonjs libraries from esm.sh like:

```js
import React from 'https://esm.sh/react';
import ReactDOM from 'https://esm.sh/react-dom';
```

It would be nice if we can use:

```js
import React from 'react';
import ReactDOM from 'react-dom';
```

<img width="0" height="0" alt="" src="https://www.google-analytics.com/g/collect?v=2&tid=G-DRPXW0EEVT&cid=ae045149-9d17-0367-bbb0-11c41d92b411&en=readme_view&ep.repository=module-federation-examples&ep.example=native-federation-react&ep.readme_path=native-federation-react%2FREADME.md&dl=https%3A%2F%2Fgithub.com%2Fmodule-federation%2Fmodule-federation-examples%2Ftree%2Fmaster%2Fnative-federation-react&dt=ModuleFederationExamples+native-federation-react%2FREADME.md">
