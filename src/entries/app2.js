import Vue from 'vue';

import(/* webpackChunkName: "prefetch", webpackPrefetch: true */ './prefetch.js');
import(/* webpackChunkName: "preload", webpackPreload: true */ './preload.js');

import(/* webpackChunkName: "dynamic" */ './dynamic.js').then(() => {
});

export function createApp() {
  const app = new Vue({
    data: 1,
  });
  return app;
}
