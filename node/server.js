const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.method);
  console.log(req.url);
  res.write('hello');
  res.end();
});
server.listen(3000, () => {
  console.log('app  is runnning');
});
