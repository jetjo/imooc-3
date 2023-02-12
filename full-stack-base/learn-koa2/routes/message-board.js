const router = require('koa-router')();

const { MessageBoard } = require('../db/model');

router.prefix('/api/message-board');

router.get('/', async (ctx, next) =>
{
  console.log('请求的查询参数：', ctx.query);
  //NOTE: passing user-defined objects as query filters !!!
  // const data = await MessageBoard.find(ctx.query).sort({ _id: -1 })
  const data = await MessageBoard.find({ name: ctx.query.name, propNotInSchema: 1 }).setOptions({ sanitizeFilter: true }).sort({ _id: -1 })
  ctx.body = {
    errno: 0,
    data
  };
})

router.post('/', async (ctx, next) =>
{
  const body = ctx.request.body;
  // console.log('请求的body：', body);
  const data = new MessageBoard(body);
  const res = await data.save();
  ctx.body = {
    errno: 0,
    data: res
  };
})

module.exports = router;
