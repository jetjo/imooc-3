// message - board - create.js

module.exports = (req, res, route) =>
{
  const result = {
    errno: 0,
    data: undefined,
    message: '留言创建成功!!!'
  }
  res.writeHead(200, { 'Content-type': 'application/json' });
  const reqType = req.headers['content-type'];
  const chunks = [];
  let asyncResFlag = false;
  req.on('data', chunkStream =>
  {
    chunks.push(chunkStream.toString());
  });
  req.on('end', () =>
  {
    if (reqType === 'application/json')
    {
      // debugger
      const message = JSON.parse(chunks.join(''));
      message.id = parseInt(Math.random() * 10000);
      result.data = message;
      // res.end(JSON.stringify({ ...result, data: message }));//异步的
      console.log(`接收到数据【${ route || req.url }】：`, message);
      // return;//防止后续的同步end调用
    }
    else
    {
      result.errno = '-1';
      result.message = '数据格式错误！'
    }
    res.end(JSON.stringify(result));//异步的
    // return;//防止后续的同步end调用
    asyncResFlag = true;
  });
  // return;//防止后续的同步end调用
  // ;;//...若干逻辑
  // if (!asyncResFlag) res.end(JSON.stringify(result));//同步的
  setTimeout(() =>
  {
    ;;//...若干逻辑
    if (!asyncResFlag) res.end(JSON.stringify(result));//同步的
  }, 0);
}

// const utils = require('util');
const ACTION_TIMEOUT = 5000;
const onEnd = (req, res) =>
{
  return new Promise((_res, _rej) =>
  {
    setTimeout(() =>
    {
      res.writeHead(400, { 'Content-type': 'application/json' });//TODO；http code 该是多少
      _rej(new Error('数据接收超时！'))
    }, ACTION_TIMEOUT);
    req.on('end', () => _res());
  })
}
module.exports = async (req, res, route) =>
{
  const result = {
    errno: 0,
    data: undefined,
    message: '留言创建成功！'
  }
  const reqType = req.headers['content-type'];
  const chunks = [];
  req.on('data', chunkStream =>
  {
    chunks.push(chunkStream.toString());
  });
  try
  {
    await onEnd(req, res);
    if (reqType === 'application/json')
    {
      try
      {
        const message = JSON.parse(chunks.join(''));
        message.id = parseInt(Math.random() * 10000);
        result.data = message;
        console.log(`接收到数据【${ route || req.url }】：`, message);
        // throw new Error('模拟服务端异常！')
        res.writeHead(200, { 'Content-type': 'application/json' });//TODO: 应该不能重复多次设置？
      } catch (error)
      {
        res.writeHead(500, { 'Content-type': 'application/json' });
        throw error;
      }
    }
    else
    {
      res.writeHead(400, { 'Content-type': 'application/json' });
      throw new Error('数据格式错误！')
    }
  } catch (error)
  {
    delete result.data;
    result.errno = '-1';
    result.message = (error?.message) || error || '未知错误！';
  }
  // ;;//...若干逻辑
  res.end(JSON.stringify(result));//异步的
}
