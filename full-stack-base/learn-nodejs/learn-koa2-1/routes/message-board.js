const router = require('koa-router')();

router.prefix('/api/message-board');

router.get('/', async (ctx, next) =>
{
  ctx.body = {
    errno: 0,
    data: [
      { id: 0, 'user': '张三', content: '留言1' },
      { id: 1, 'user': '李四', content: '留言2' },
    ]
  };
})

module.exports = router;
