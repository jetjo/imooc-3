// name - value - str - parser.js
const nameValueStr2Obj = (str) =>
{
  const result = {};
  if (str)
  {
    str.split('&').map(nv =>
    {
      const [key, value] = nv.split('=');
      result[key] = value;
    })
  }
  return result;
}

module.exports = {
  nameValueStr2Obj
}
