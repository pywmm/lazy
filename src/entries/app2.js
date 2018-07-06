import Vue from 'vue';

import(/* webpackChunkName: "prefetch", webpackPrefetch: true */ './prefetch.js');
import(/* webpackChunkName: "preload", webpackPreload: true */ './preload.js');

import(/* webpackChunkName: "dynamic" */ './dynamic.js').then(() => {
  console.log('dynamic has downloaded');
});

console.log('i am app2 myself');


export function createApp() {
  const app = new Vue({
    data: 1,
  });
  return app;
}
