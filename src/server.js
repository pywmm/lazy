const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const mount = require('koa-mount');
const { createBundleRenderer } = require('vue-server-renderer');
const setUpDevServer = require('./../build/setup-dev-server');

const isProd = process.env.NODE_ENV === 'production';
const app = new Koa();
const resolve = file => path.resolve(__dirname, file);
const template = fs.readFileSync(path.resolve(__dirname, './index.html'), {
  encoding: 'utf-8',
});

function createRenderer(bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    runInNewContext: false,
    template, // （可选）页面模板
    // basedir: resolve('../dist'),
  }));
}

let renderer;
if (isProd) {
  const bundle = require('./../dist/vue-ssr-server-bundle.json');
  const clientManifest = require('./../dist/vue-ssr-client-manifest.json');
  // eslint-disable-line global-require, import/no-dynamic-require, max-len
  renderer = createRenderer(bundle, {
    clientManifest, // （可选）客户端构建 manifest
  });
} else {
  setUpDevServer(
    app,
    (bundle, options) => {
      renderer = createRenderer(bundle, options);
    },
  );
}

app.use(mount('/', serve(resolve('./../dist/'), {
  maxage: 9999999999,
  setHeaders(res) {
    res.setHeader('Last-Modified', 'Tue, 19 Jun 2011 08:12:57 GMT');
  },
})));

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err && err.code === 404) {
      ctx.status = 404;
      ctx.body = '404 error';
    } else if (err && err.code === 401) {
      ctx.status = 401;
      ctx.body = '401 | Unauthorized';
      ctx.redirect(err.redirectUrl || '/');
    } else if (err && err.code === 302) {
      ctx.status = 302;
      ctx.redirect(err.redirectUrl || '/');
    } else {
      ctx.type = 'html';
      ctx.status = 500;
      ctx.body = '500';
    }
  }
});


app.use(async (ctx) => {
  if (!renderer) {
    ctx.type = 'html';
    ctx.status = 200;
    ctx.body = 'waiting for compilation... refresh in a moment.';
    return;
  }

  ctx.set('Content-Type', 'text/html');
  // ctx.set('Server', serverInfo);

  ctx.type = 'text/html; charset=utf-8';
  ctx.status = 200;

  const startTime = Date.now();


  // context is a reference object, will pass entry-server
  const context = {
    url: ctx.url,
    protocol: ctx.req.headers.scheme === 'https' ? 'https' : 'http',
    host: ctx.host,
    userAgent: ctx.req.headers['user-agent'],
    startTime,
    now: Date.now(),
    // appName: name,
    miniProgram: ctx.query.miniProgram,
    isProd,
    renderExtraScripts() {
      // return renderExtraScripts({
      //   isDesktop: name === 'desktop',
      //   miniProgram: ctx.query.miniProgram,
      //   isProd,
      // });
    },
    supportSW: Boolean(ctx.query.supportSW),
  };
  ctx.body = await renderer.renderToString(context).catch((err) => {
    throw err;
  });
});

app.listen(9000, () => {
  console.log('🌏  http server started at localhost:9000');
  // logger.info(`🌏  http server started at localhost:${port}`);
});
