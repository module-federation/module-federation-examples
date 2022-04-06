import { ClientOptions, RenderContext } from '@fmfe/genesis-core';
import Vue from 'vue';
import Meta from 'vue-meta';
import Router, { RouteConfig } from 'vue-router';

import App from './app.vue';

Vue.use(Meta).use(Router);

export function createApp(routes: RouteConfig[]) {
  return async (context: RenderContext | ClientOptions) => {
    const router = new Router({
      mode: 'history',
      routes,
    });
    const url = context.env === 'client' ? context.url : context.data.url;
    await router.push(url);
    const app = new Vue({
      router,
      render(h) {
        return h(App);
      },
    });
    if (context.env === 'server') {
      context.beforeRender(() => {
        const { title, link, style, script, meta } = app.$meta().inject();
        appendText(context.data, 'title', title?.text() ?? '');
        appendText(context.data, 'meta', meta?.text() ?? '');
        appendText(context.data, 'style', style?.text() ?? '');
        appendText(context.data, 'style', link?.text() ?? '');
        appendText(context.data, 'script', script?.text() ?? '');
      });
    }
    return app;
  };
}

function appendText(data: Record<string, string>, key: string, value: string) {
  if (typeof data[key] !== 'string') {
    data[key] = '';
  }
  if (value) {
    data[key] += value;
  }
}
