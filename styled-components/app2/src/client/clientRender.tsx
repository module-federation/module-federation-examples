import React from 'react';
import { hydrate } from 'react-dom';

import App from './components/App';

hydrate(<App />, document.getElementById('root'));
