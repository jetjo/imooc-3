// not - found.js
module.exports = (req, res, route) =>
{
  // res.writeHead(404, { 'Content-type': 'text/plain' });
  // res.end('404 Not Found');
  console.warn('404 Not Found', req.url);
  res.writeHead(404, { 'Content-type': 'text/html' });
  res.end(`
  <!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>404 Not Found</title>
    </head>

    <body>
        <h1>404 Not Found</h1>
        <pre>${ route || req.url }</pre>
    </body>

</html>

  `);
}
