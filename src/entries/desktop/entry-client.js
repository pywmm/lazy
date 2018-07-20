import { createApp } from './app';

// 客户端特定引导逻辑……

const { app, store, router } = createApp();

if (window.__INITIAL_STATE__) { // eslint-disable-line no-underscore-dangle
  store.replaceState(window.__INITIAL_STATE__); // eslint-disable-line no-underscore-dangle
}

// app.$mount('#test');


// 这里假定 App.vue 模板中根元素具有 `id="app"`
router.onReady(() => {
  console.log('router on ready');
  // 添加路由钩子函数，用于处理 asyncData.
  // 在初始路由 resolve 后执行，
  // 以便我们不会二次预取(double-fetch)已有的数据。
  // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);
    console.log('matched -----');
    console.dir(matched);
    console.log('preMatched -----');
    console.dir(prevMatched);

    // 我们只关心非预渲染的组件
    // 所以我们对比它们，找出两个匹配列表的差异组件
    let diffed = false;
    const activated = matched.filter((c, i) => {
      if (diffed) {
        return true;
      }
      diffed = prevMatched[i] !== c;
      return diffed;
      // return diffed || (diffed = (prevMatched[i] !== c));
    });

    if (!activated.length) {
      return next();
    }

    // 这里如果有加载指示器(loading indicator)，就触发

    Promise.all(activated.map((c) => {
      if (c.asyncData) {
        return c.asyncData({ store, route: to });
      }
      return false;
    })).then(() => {
      // 停止加载指示器(loading indicator)

      next();
    }).catch(next);
  });

  app.$mount('#test');
});
