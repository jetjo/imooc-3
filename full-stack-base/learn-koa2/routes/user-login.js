// user - login.js
const router = require('koa-router')();

const { User } = require('../db/user-model')

router.prefix('/api/user/')

//路径前面必须加“/”
router.post('/login', async (ctx, next) =>
{
  const body = ctx.request.body;
  if (!body.name || !body.password)
  {
    ctx.response.status = 400;
    await next();
    return;
  }
  const existUser = await User.find({ username: body.name, password: body.password })
  if (!existUser.length)
  {
    ctx.response.status = 400;
    ctx.response.message = 'the user not existed!!!'
    await next();
    return;
  }
  const user = existUser[0];
  ctx.session.user = user;
  ctx.response.status = 204;
})

router.get('/', async (ctx) =>
{
  ctx.body = ctx.session.user;
});

router.get('/loginOut', async (ctx) =>
{
  delete ctx.session.user;
  ctx.response.status = 204;
});

module.exports = router;
