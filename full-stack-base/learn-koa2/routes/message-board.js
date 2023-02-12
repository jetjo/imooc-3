const router = require('koa-router')();

const { MessageBoard } = require('../db/model');

const { LoginCheck } = require('../middleware/logon-check')

router.prefix('/api/message-board');

router.get('/', LoginCheck, async (ctx, next) =>
{
  console.log('请求的查询参数：', ctx.query);
  //NOTE: passing user-defined objects as query filters !!!
  // const data = await MessageBoard.find(ctx.query).sort({ _id: -1 })
  const data = await MessageBoard.find({ name: ctx.query.name }).setOptions({ sanitizeFilter: true }).sort({ _id: -1 })
  // const data = await MessageBoard.find({ name: ctx.query.name, propNotInSchema: 1 }).setOptions({ sanitizeFilter: true }).sort({ _id: -1 })
  ctx.body = {
    errno: 0,
    data
  };
})

router.post('/', LoginCheck, async (ctx, next) =>
{
  const body = ctx.request.body;
  // console.log('请求的body：', body);
  //NOTE: 不能直接传递用户信息到数据库！！！
  // const data = new MessageBoard(body);
  const data = new MessageBoard({ name: body.name, content: body.content });
  const res = await data.save();
  ctx.body = {
    errno: 0,
    data: res
  };
})

module.exports = router;
