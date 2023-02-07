const http = require('http')

const server = http.createServer((req, res) =>
{
    debugger;
    a();
    const url = req.url
    const path = url.split('?')[0]
    res.end(path);
})

server.listen(3000);

console.log('服务已经在3000上启动！');
