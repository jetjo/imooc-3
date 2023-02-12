
const Koa = require('koa')
const app = new Koa();

app.use((ctx, next) =>
{
  //获取cookie
  // const cookie = [...ctx.cookies]; ctx.cookies is not iterable
  const cookie = [ctx.cookies.get('name'), ctx.cookies.get('age')];

  //设置cookie
  ctx.cookies.set('name', 'yangbing', {
    expires: new Date('2050-01-01'),
    maxAge: 2 * 24 * 60 * 60 * 1000,
    httpOnly: true
  });

  ctx.body = `获取到的cookies是${ cookie }`;
});

const http = require('http')

const PORT = process.env.PORT || 3000;

const server = http.createServer(app.callback())

server.listen(PORT);

console.log(`服务端已经在${ PORT }端口运行！`);
