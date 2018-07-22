const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const mount = require('koa-mount');
const { createBundleRenderer } = require('vue-server-renderer');

const app = new Koa();

const Router = require('koa-router');

const home = new Router();

const resolve = file => path.resolve(__dirname, file);

const bundle = require('../../dist/vue-ssr-server-bundle.json');
const clientManifest = require('../../dist/vue-ssr-client-manifest.json');

const template = fs.readFileSync(path.resolve(__dirname, './../index.html'), {
  encoding: 'utf-8',
});

// eslint-disable-line global-require, import/no-dynamic-require, max-len
const renderer = createBundleRenderer(bundle, {
  runInNewContext: false, // 推荐
  template, // （可选）页面模板
  clientManifest, // （可选）客户端构建 manifest
  basedir: resolve('./dist'),
});

app.use(mount('/', serve(resolve('../../dist/'), {
  maxage: 9999999999,
  setHeaders(res) {
    res.setHeader('Last-Modified', 'Tue, 19 Jun 2011 08:12:57 GMT');
  },
})));

home.get('/test', async (ctx) => {
  // ctx.body = 'waring.....';
  ctx.body = await renderer.renderToString(ctx).catch((err) => {
    // logger.error('render error', err);
    throw err;
  });
});

// 加载路由中间件
app.use(home.routes()).use(home.allowedMethods());

app.listen(9000, () => {
  // logger.info(`🌏  http server started at localhost:${port}`);
});
