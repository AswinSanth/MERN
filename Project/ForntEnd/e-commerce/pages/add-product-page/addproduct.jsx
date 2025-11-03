import './addProduct.css';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
const AddProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [addProduct, setAddProduct] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    inStock: '',
    category: '',
    sellerId: userId,
  });
  const handlesubmit = async () => {
    if (id) {
      try {
        await axios.patch(
          `http://localhost:8000/product/editProduct/${id}`,
          addProduct
        );
        navigate('/Home');
      } catch (e) {
        console.error('Error fetching Products', e);
      }
    } else {
      try {
        const response = await axios.post(
          'http://localhost:8000/product/addProduct',
          addProduct
        );

        navigate('/Home');
      } catch (e) {
        console.error('Error fetching Products', e);
      }
    }
  };
  const getProductById = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/product/${id}`);
      console.log(response.data);
      setAddProduct(response.data);
    } catch (error) {
      console.error('Failed to fetch product', error);
    }
  };

  useEffect(() => {
    if (id) getProductById();
  }, []);
  const onChange = (e, key) => {
    setAddProduct(prevData => ({ ...prevData, [key]: e.target.value }));
    console.log(addProduct);
  };

  const onFile = async e => {
    const formData = new FormData();
    formData.append('img', e.target.files[0]);
    const response = await axios.post(
      'http://localhost:8000/product/imageUpload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log(response.data.url);
    setAddProduct({ ...addProduct, image: response.data.url });
  };
  return (
    <div className="edit">
      <h1>{!id ? 'AddBook ' : 'Edit Dook Details'}</h1>
      <div className="editinput">
        <label>Title</label>
        <input
          type="text"
          value={addProduct.title}
          onChange={e => {
            onChange(e, 'title');
          }}
        />
      </div>
      <div className="editinput">
        <label>Price</label>
        <input
          type="text"
          value={addProduct.price}
          onChange={e => {
            onChange(e, 'price');
          }}
        />
      </div>
      <div className="editinput">
        <label>FileUpload</label>
        <input type="file" onChange={onFile} />
        <img className="editimg" src={addProduct.image} />
      </div>
      <div className="editinput">
        <label>Description</label>
        <input
          value={addProduct.description}
          type="text"
          onChange={e => {
            onChange(e, 'description');
          }}
        />
      </div>
      <div className="editinput">
        <label>InStocK</label>
        <input
          type="text"
          value={addProduct.inStock}
          onChange={e => {
            onChange(e, 'inStock');
          }}
        />
      </div>

      <div className="editinput">
        <label>Category</label>
        <input
          value={addProduct.category}
          type="text"
          onChange={e => {
            onChange(e, 'category');
          }}
        />
      </div>
      <button className="addbtn" onClick={handlesubmit}>
        {id ? 'Update Product' : 'Add Product'}
      </button>
    </div>
  );
};
export default AddProduct;
