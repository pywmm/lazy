import Vue from 'vue';
import Router from 'vue-router';

import Page from '@/views/desktop/Page';

Vue.use(Router);

export function createRouter() {
  return new Router({
    base: process.env.NODE_ENV === 'production' ? '/vinci/' : '/',
    mode: 'history',
    routes: [
      {
        path: '/',
        component: { template: '<div>index</div>' },
      },
      {
        path: '/page',
        name: 'page',
        component: Page,
      },
    ],
  });
}
