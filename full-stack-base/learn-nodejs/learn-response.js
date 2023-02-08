// learn - response.js
const routes = require('./routes/index')
module.exports = (req, res, route) =>
{
  // debugger;
  const action = routes[route]
  if (action)
  {
    return action(req, res, route);
  }
  routes['404.htm'](req, res, route);
}
