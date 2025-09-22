import axios from 'axios';
import './products.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Products = () => {
  const nav = useNavigate();
  const [addProduct, setAddProduct] = useState({ Products: '', price: '' });

  const getData = async () => {
    const response = await axios.post(
      'http://localhost:8000/product',
      addProduct
    );
    nav('/');
  };

  const onChange = (e, key) => {
    setAddProduct({ ...addProduct, [key]: e.target.value });
  };

  return (
    <div className="get-products">
      <div className="input-section">
        <label>Product</label>
        <input
          type="text"
          onChange={e => {
            onChange(e, 'Product');
          }}
        />
      </div>
      <div className="input-section">
        <label>price</label>
        <input
          type="text"
          onChange={e => {
            onChange(e, 'price');
          }}
        />
      </div>
      <button onClick={() => getData()}>Add Products</button>
    </div>
  );
};
export default Products;
