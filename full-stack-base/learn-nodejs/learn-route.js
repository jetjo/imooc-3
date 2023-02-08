const responseSet = require('./learn-response')

const routeCheck = (req, res) =>
{
  const { url, method: _method } = req;
  const path = url.split('?')[0];
  const method = _method.toUpperCase();
  const route = `${ method } ${ path }`;
  console.log(`请求路由：`, route);
  responseSet(req, res, route)
}

module.exports = routeCheck;
