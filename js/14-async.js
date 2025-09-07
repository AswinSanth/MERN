// console.log('start');
// fetch('https://fakestoreapi.com/products').then(res => {
//   res.json().then(data => {
//     console.log(data);
//   });
// });

// console.log('end');

console.log('start');

const getData = async () => {
  const response =await  fetch('https://fakestoreapi.com/products');
  const data = await response.json();
  console.log(data);
};
getData();
console.log('end');
