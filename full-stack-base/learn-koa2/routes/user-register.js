// user - register.js
const router = require('koa-router')();
const { User } = require('../db/user-model');

router.prefix('/api/user');
router.post('/register', async (ctx, next) =>
{
  const body = ctx.request.body;
  if (!body.name)
  {
    ctx.response.status = 400;
    next()
    return;
  }
  const existUser = await User.find({ username: body.name })//.toArray();
  if (existUser.length)
  {
    ctx.response.status = 400;
    // ctx.response.message = '用户已存在'TypeError[ERR_INVALID_CHAR]: Invalid character in statusMessage
    ctx.response.message = 'the username has been used!!!'
    next()
    return;
  }
  const _newUser = new User({ username: body.name, password: body.password })
  const res = await _newUser.save();
  ctx.body = {
    errno: 0,
    data: res
  }
});

module.exports = router;
