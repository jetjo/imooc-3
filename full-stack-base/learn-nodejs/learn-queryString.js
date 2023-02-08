// learn - queryString.js
const { nameValueStr2Obj } = require("./utils/name-value-str-parser");
const queryString = require('querystring');
const { URL, URLSearchParams } = require('url');

const queryStringCheck = (req, res) =>
{
  // debugger;
  const queryStr = req.url.split('?')[1];
  const search = new URLSearchParams(queryStr);
  console.log('request query is：', [...search]);
  return;

  console.log('request query is', queryString.parse(queryStr));
  return;
  if (queryStr)// 浏览器会在加载页面时自动发起“GET /favicon.ico”请求以获取Tab的图标，这个请求的queryStr是undefined
  {
    const queryObj = nameValueStr2Obj(queryStr)
    // console.log(`request queryString：${ JSON.stringify(queryObj) }`);
    console.log('request query is', queryObj);
  }
}

module.exports = queryStringCheck;
