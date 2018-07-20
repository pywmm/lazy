// const fs = require('fs');
// const path = require('path');
const Koa = require('koa');
const { createBundleRenderer } = require('vue-server-renderer');

const app = new Koa();

const Router = require('koa-router');

const home = new Router();

const bundle = require('../../dist/vue-ssr-server-bundle.json');

// eslint-disable-line global-require, import/no-dynamic-require, max-len
const renderer = createBundleRenderer(bundle, {
  runInNewContext: false, // 推荐
  // template, // （可选）页面模板
  // clientManifest // （可选）客户端构建 manifest
});

// 在服务器处理函数中……
// home.get('*', (req, res) => {
//   const context = { url: req.url };
//   // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
//   // 现在我们的服务器与应用程序已经解耦！
//   renderer.renderToString(context, (err, html) => {
//     // 处理异常……
//     res.end(html);
//   });
// });

home.get('/test', async (ctx) => {
  ctx.body = 'waring.....';
  renderer.renderToString(ctx, (err, html) => {
    console.dir(err);
    // 处理异常……
    ctx.body = html;
  });
});

// 加载路由中间件
app.use(home.routes()).use(home.allowedMethods());

app.listen(9000, () => {
  // logger.info(`🌏  http server started at localhost:${port}`);
});
