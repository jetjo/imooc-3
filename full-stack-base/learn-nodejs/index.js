const http = require('http')
const routeCheck = require("./learn-route");
const queryStringCheck = require('./learn-queryString');

const PORT = 3000;

const server = http.createServer((req, res) =>
{
  // debugger
  // a();
  // console.log('已经收到请求！');
  //地址中除了http://domain:port之后的部分
  const url = req.url;
  // console.log(`请求地址：${ url }`);
  queryStringCheck(req, res);
  routeCheck(req, res);


  // res.end(`hello world!`);
});

server.listen(PORT);

console.log(`服务已经在${ PORT }端口上运行！`);
