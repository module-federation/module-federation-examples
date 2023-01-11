// @ts-ignore
import App from './App.svelte';

import { state } from 'shared';

state.message = 'Hello from host!';

const app = new App({
	target: document.getElementById('app'),
});

export default app;
