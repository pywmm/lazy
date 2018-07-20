import Vue from 'vue';
import Router from 'vue-router';

import Page from '@/views/desktop/Page';

Vue.use(Router);

export function createRouter() {
  const router = new Router({
    base: process.env.NODE_ENV === 'production' ? '/vinci/' : '/',
    mode: 'history',
    routes: [
      {
        path: '/:id',
        component: { template: '<div>index{{ $route.params.id }}</div>' },
      },
      {
        path: '/page/:id',
        name: 'page',
        component: Page,
      },
    ],
  });
  // router.beforeEach((to, from, next) => {
  //   // ...
  //   next();
  // });
  return router;
}
