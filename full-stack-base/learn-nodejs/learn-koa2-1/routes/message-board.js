const router = require('koa-router')();

router.prefix('/api/message-board');

router.get('/', async (ctx, next) =>
{
  console.log('请求的查询参数：', ctx.query);
  ctx.body = {
    errno: 0,
    data: [
      { id: 0, 'user': '张三', content: '留言1' },
      { id: 1, 'user': '李四', content: '留言2' },
    ]
  };
})

router.post('/', async (ctx, next) =>
{
  const body = ctx.request.body;
  console.log('请求的body：', body);
  ctx.body = {
    errno: 0,
    data: {
      ...body,
      id: parseInt(Math.random() * 10000)
    }
  };
})

module.exports = router;
