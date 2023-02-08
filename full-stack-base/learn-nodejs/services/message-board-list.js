// message - board - list.js
module.exports = (req, res, route) =>
{
  const result = {
    errno: 0,
    data: [
      { id: 0, 'user': '张三', content: '留言1' },
      { id: 1, 'user': '李四', content: '留言2' },
    ]
  }
  res.writeHead(200, { 'Content-type': 'application/json' });
  res.end(JSON.stringify(result));//同步的
}
