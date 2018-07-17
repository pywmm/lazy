const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const mount = require('koa-mount');
const koaPackageJson = require('koa/package.json');
const vueServerRenderer = require('vue-server-renderer');
// const logger = require('./utils/logger/server');
const setupDevServer = require('./../build/setup.dev.server');
const { NAVIGATION_STORAGE_KEY, NAVIGATION_RANKING_STORAGE_KEY } = require('./constants');
const { renderExtraScripts } = require('./render');

const isProd = process.env.NODE_ENV === 'production';

const serverInfo = `koa/${koaPackageJson.version} vue-server-renderer`;

function createServer(name, port = 3100) {
  const template = fs.readFileSync(path.resolve(__dirname, './index.html'), {
    encoding: 'utf-8',
  });
  const resolvePath = file => path.resolve(__dirname, file);
  const app = new Koa();

  function createRenderer(bundle, options) {
    return vueServerRenderer.createBundleRenderer(bundle, Object.assign(options, {
      template,
      basedir: resolvePath('../dist'),
      runInNewContext: false,
    }));
  }

  let renderer;
  if (isProd) {
    // const bundle = require(`../dist/${name}/vue-ssr-server-bundle.json`); // eslint-disable-line global-require, import/no-dynamic-require, max-len
    // const clientManifest = require(`../dist/${name}/converted-vue-ssr-client-manifest.json`); // eslint-disable-line global-require, import/no-dynamic-require, max-len
    // renderer = createRenderer(bundle, {
    //   clientManifest,
    // });
  } else {
    setupDevServer(app, name, (bundle, options) => {
      console.dir(bundle);
      renderer = createRenderer(bundle, options);
    });
  }

  app.use(mount('/dist/', serve(resolvePath('../dist/'), {
    maxage: 9999999999,
    setHeaders(res) {
      res.setHeader('Last-Modified', 'Tue, 19 Jun 2011 08:12:57 GMT');
    },
  })));

  app.use(mount('/assets/', serve(resolvePath('../assets/'), {
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
        ctx.body = 'error';
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
        ctx.body = isProd ? 'error' : `<pre>${typeof err === 'string' ? err : err.stack}</pre>`;
      }

      // logger.error(`error during render : ${ctx.url}`);
      // logger.error(err);
    }
  });

  app.use(async (ctx) => {
    if (!renderer) {
      ctx.type = 'html';
      ctx.status = 200;
      ctx.body = 'waiting for compilation... refresh in a moment.';
      return;
    }

    // logger.debug('start vue render: ', ctx.url);

    ctx.set('Content-Type', 'text/html');
    ctx.set('Server', serverInfo);

    ctx.type = 'text/html; charset=utf-8';
    ctx.status = 200;

    const startTime = Date.now();

    let accessToken;

    // context is a reference object, will pass entry-server
    const context = {
      url: ctx.url,
      protocol: ctx.req.headers.scheme === 'https' ? 'https' : 'http',
      host: ctx.host,
      accessToken,
      navigation: ctx.cookies.get(NAVIGATION_STORAGE_KEY),
      navigationRanking: ctx.cookies.get(NAVIGATION_RANKING_STORAGE_KEY),
      userAgent: ctx.req.headers['user-agent'],
      startTime,
      now: Date.now(),
      appName: name,
      miniProgram: ctx.query.miniProgram,
      isProd,
      renderExtraScripts() {
        return renderExtraScripts({
          isDesktop: name === 'desktop',
          miniProgram: ctx.query.miniProgram,
          isProd,
        });
      },
      supportSW: Boolean(ctx.query.supportSW),
    };

    ctx.body = await renderer.renderToString(context).catch((err) => {
      // logger.error('render error', err);
      throw err;
    });

    // logger.debug(`render time: ${context.matchedRouteName}: ${Date.now() - context.fetchedTime}ms`);
    // logger.debug(`data pre-fetch: ${context.matchedRouteName}: ${context.fetchedDuration}ms`);
    // logger.debug(`whole request: ${context.matchedRouteName}: ${Date.now() - startTime}ms`);
  });

  // const port = process.env.PORT || 3000;
  app.listen(port, () => {
    // logger.info(`🌏  http server started at localhost:${port}`);
  });
}

module.exports = createServer;
