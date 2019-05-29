const send = require('koa-send');
const Koa = require('koa');
const app = new Koa();

// $ GET /package.json
// $ GET /

app.use(async (ctx) => {
  if ('/' == ctx.path) return ctx.body = 'Try GET /package.json';
  await send(ctx, ctx.path);
})

app.listen(9998);
console.log('listening on port 9998');