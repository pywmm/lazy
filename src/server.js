// const Koa = require('koa');
// const fs = require('fs');

// const app = new Koa();

// /**
//  * 用Promise封装异步读取文件方法
//  * @param  {string} page html文件名称
//  * @return {promise}
//  */
// function render(page) {
//   return new Promise((resolve, reject) => {
//     const viewUrl = `./src/${page}`;
//     console.log(viewUrl);
//     fs.readFile(viewUrl, 'binary', (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// }

// /**
//  * 根据URL获取HTML内容
//  * @param  {string} url koa2上下文的url，ctx.url
//  * @return {string}     获取HTML文件内容
//  */
// async function route(url) {
//   let view = '404.html';
//   switch (url) {
//     case '/':
//       view = 'index.html';
//       break;
//     case '/index':
//       view = 'index.html';
//       break;
//     case '/todo':
//       view = 'todo.html';
//       break;
//     case '/404':
//       view = '404.html';
//       break;
//     default:
//       break;
//   }
//   console.log(view);
//   const html = await render(view);
//   return html;
// }

// app.use(async (ctx) => {
//   const url = ctx.request.url;
//   const html = await route(url);
//   ctx.body = html;
// });

// app.listen(3000);
// console.log('[demo] route-simple is starting at port 3000');


const Koa = require('koa');
const fs = require('fs');

const app = new Koa();

const Router = require('koa-router');

const home = new Router();

// 子路由1
home.get('/', async (ctx) => {
  const html = `
    <ul>
      <li><a href="/page/helloworld">/page/helloworld</a></li>
      <li><a href="/page/404">/page/404</a></li>
    </ul>
  `;
  ctx.body = html;
});

// 子路由2
const page = new Router();
page.get('/404', async (ctx) => {
  ctx.body = '404 page!';
}).get('/helloworld', async (ctx) => {
  ctx.body = 'helloworld page!';
});

// 装载所有子路由
const router = new Router();
router.use('/', home.routes(), home.allowedMethods());
router.use('/page', page.routes(), page.allowedMethods());

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('[demo] route-use-middleware is starting at port 3000');
});
