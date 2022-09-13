# Module Federation using ESbuild

## Usage

1. npm install
2. npm run build
3. npm run start

Apps will be running on http://localhost:3000, http://localhost:3001

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
