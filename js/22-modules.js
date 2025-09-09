// const fs = require('fs');

// fs.readFile('22-text.txt', 'utf-8', (err, data) => {
//   console.log(data);
// });

// fs.appendFile('22-text.txt', '\nhello', 'utf-8', err => {
//   console.log('file.written');
// });

// console.log("hello")

// fs.readFile('22-text.txt', 'utf-8', (err, data) => {
//   let upper = data.toUpperCase();

//   fs.writeFile('22-text.txt', upper, 'utf-8', err => {
//     console.log('file written');
//   });
// });

// fs.mkdir('apple', err => {
//   console.log('folder created');
// });

// fs.mkdir('orange', err => {
//   console.log('folder created');

//   let hai = 'hello User \napple \n orange';
//   fs.writeFile('orange/hello.txt', hai, 'utf-8', err => {
//     console.log('file written');
//   });
// });

// fs.unlink('22-text.txt', err => {

//   console.log('file deleted');
//   if(err) throw err;
//   console.log(err);
// });

const os = require('os');

console.log(os.platform());
console.log(os.arch());
console.log(os.type());
console.log(os.release());
console.log(os.hostname());
