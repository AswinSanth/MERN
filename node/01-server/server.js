const http = require('http');

const server = http.createServer((req, res) => {
  const products = [
    { Phone: 'apple', price: 50000 },
    { Phone: 'Samsung', price: 10000 },
  ];
  const user = [
    { Phone: 'akhil', Age: 21 },
    { Phone: 'Aswin', Age: 24 },
  ];
 

  res.writeHead(200, {
    // 'content-type': 'text/plain',
    // 'content-type': 'text/html,
    'Content-Type': 'application/json',
    Server: 'Node js',
  });

  console.log(req.method);
  // console.log(req.url);
  // res.write('hello');
  // res.write('hello');
  // res.end(jsonProducts);

  if (req.url === '/user') {
   
    res.write(JSON.stringify(user));

  }
  else{
    res.write(JSON.stringify(products));
  }
  res.end();
});
server.listen(3000, () => {
  console.log('app  is runnning');
});
