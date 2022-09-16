import { createApp } from 'vue';
import Layout from './Layout.vue';

import webpackContent from 'webpack-side/Content';
const app = createApp(Layout);

app.component('webpack-content', webpackContent);

app.mount('#root');
