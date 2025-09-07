console.log('start');

const getData = async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  const data = await response.json();
  console.log(data);
};
getData();
concole.log('end');
