import axios from 'axios';
import './products.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Products = () => {
  const nav = useNavigate();
  const [addProduct, setAddProduct] = useState({
    Products: '',
    price: '',
    image: '',
  });

  const getData = async () => {
    if (id) {
      const response = await axios.patch(
        `http://localhost:8000/product/${id}`,
        addProduct
      );
      nav('/');
    } else {
      const response = await axios.post(
        'http://localhost:8000/product',
        addProduct
      );
      nav('/');
    }
  };

  const onChange = (e, key) => {
    setAddProduct({ ...addProduct, [key]: e.target.value });
  };

  const onFile = async e => {
    const formData = new FormData();
    formData.append('img', e.target.files[0]);

    const response = await axios.post(
      'http://localhost:8000/upload-image',
      formData
    );
    setAddProduct({ ...addProduct, image: response.data.url });
  };

  const { id } = useParams();

  const getProductById = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/product/${id}`);
      console.log(response.data);
      setAddProduct(response.data);

      console.log(addProduct);
    } catch (error) {
      console.error('Failed to fetch product', error);
    }
  };
  useEffect(() => {
    getProductById();
  }, []);
  return (
    <div className="get-products">
      <h1>{id ? 'Edit Product' : 'AddProucts'}</h1>
      <div className="input-section">
        <label>Product</label>
        <input
          type="text"
          onChange={e => {
            onChange(e, 'Products');
          }}
          value={addProduct.Products}
        />
      </div>

      <div className="input-section">
        <label>price</label>
        <input
          type="text"
          onChange={e => {
            onChange(e, 'price');
          }}
          value={addProduct.price}
        />
      </div>
      <div className="input-section">
        <label>FileUpload</label>
        <input type="file" onChange={onFile} />
        <img className="editimg" src={addProduct.image} alt="product" />
      </div>
      <button className="addbtn" onClick={() => getData()}>
        {id ? 'Update Product' : 'Add Products'}
      </button>
    </div>
  );
};
export default Products;
