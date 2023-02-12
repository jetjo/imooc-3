const http = require('http')
const PORT = 3000;

const server = http.createServer((req, res) =>
{
  //获取cookie
  const cookie = req.headers.cookie;
  console.log('获取到的cookie', cookie);

  //设置cookie
  //NOTE:  cookie的path属性默认是当前请求的路径
  // res.setHeader('Set-Cookie', 'age=28')
  // max-age设置了一天后过期，expires设置了在此时此刻过期（new Date().toUTCString()，Greenwich Mean Time， 获取当前时刻的UTC+0形式）
  res.setHeader('Set-Cookie', `age=28; path=/; Max-Age=${ 10 * 360 * 24 * 60 * 60 * 1000 }`)//设置10年后失效
  // // 立马失效
  // res.setHeader('Set-Cookie', `age=28; path=/; max-age=${ -1 }`)
  const experis = new Date();
  // experis.setHours(experis.getHours() + 1, 0, 0, 0);
  experis.setMinutes(experis.getMinutes() + 1, 0, 0);
  const expires = experis.toUTCString();
  // NOTE: 同一个响应头名字，后面的会彻底覆盖前面的
  // res.setHeader('Set-Cookie', `age=28; path=/; expires=${ experis.toUTCString() }`)
  //NOTE:  HttpOnly必须是驼峰格式 Pascal
  // res.setHeader('Set-Cookie', `age=28; path=/; expires=${ expires }; http-only`)
  // res.setHeader('Set-Cookie', `age=28; path=/; expires=${ expires }; http-only=1`)
  // res.setHeader('Set-Cookie', `age=28; path=/; expires=${ expires }; http-only=true`)
  res.setHeader('Set-Cookie', `age=28; path=/; expires=${ new Date('2050-01-01').toUTCString() }; HttpOnly`)
  // res.setHeader('Set-Cookie', `age=28; path=/; expires=${ expires }; HttpOnly`)
  // res.setHeader('Set-Cookie', `age=28; path=/; expires=${ expires }; HttpOnly=false`)
  // res.setHeader('Set-Cookie', `age=28; path=/; expires=${ expires }; HttpOnly=true`)
  // res.setHeader('Set-Cookie', `age=28; path=/; expires=2023-02-12T08:45:00.000Z`)无效，必须是toUTCString的格式。。。

  //NOTE: 不可以指明utf-8编码，浏览器端中文乱码
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end(`获取到了cookie：${ cookie }`)
});

server.listen(PORT);

console.log('服务端已经在' + PORT + '端口运行！');
