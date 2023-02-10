const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const static = require('koa-static');

const index = require('./routes/index')
const users = require('./routes/users')
const messageBoard = require('./routes/message-board')

// error handler
onerror(app)

//#region middlewares
//#region 实现从body中解析出json
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
//#endregion

app.use(logger())
app.use(static(__dirname + '/public'))//设置静态资源的物理根目录

//设置html模版，pug是一种类似yml的html模版
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger 管道⌛️
app.use(async (ctx, next) =>
{
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ ctx.method } ${ ctx.url } - ${ ms }ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(messageBoard.routes(), messageBoard.allowedMethods())
//#endregion

// error-handling
app.on('error', (err, ctx) =>
{
  console.error('server error', err, ctx)
});

module.exports = app
