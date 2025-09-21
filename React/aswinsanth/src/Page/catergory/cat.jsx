import './cat.css';
import { useEffect, useState } from 'react';

const Category = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const getData = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    setData(data);
  };
  useEffect(() => {
    getData(), [];
  });
  const handleCat = e => {
    const selcteditem = e.target.value;
    const newData = data.filter(i => i.category == selcteditem);
    setFilter(newData);
  };
  return (
    <div className="items">
      <div className="options">
        <select name="items" onChange={handleCat}>
          <option value="electronics">electronics</option>
          <option value="women's clothing">women's clothing</option>
          <option value="jewelery">jewelery</option>
          <option value="men's clothing">men's clothing</option>
        </select>
      </div>
      <div className="filtered">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {filter.map(item => (
              <tr>
                <td>
                  <img src={item.image} alt={item.title} />
                </td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
              </tr>
            ))}
          </tbody>
                  
        </table>
      </div>
    </div>
  );
};
export default Category;
