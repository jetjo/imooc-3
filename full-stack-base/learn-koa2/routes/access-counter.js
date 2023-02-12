// access - counter.js

//NOTE: 方法调用！！！
// const router = require('koa-router')
const router = require('koa-router')()

router.get('/session-count', async (ctx, next) =>
{
  if (!ctx.session.accessCount)
  {
    ctx.session.accessCount = 0;
  }
  ctx.session.accessCount++;
  ctx.body = {
    title: '访问次数',
    accessCount: ctx.session.accessCount
  }
})

module.exports = router;
