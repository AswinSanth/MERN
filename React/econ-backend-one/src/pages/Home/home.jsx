import axios from 'axios';
import './home.css';
import { Pencil, Trash2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const [deleted, setDeleted] = useState(false);
  const productId = useRef(null);
  const getProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/product');
      setProducts(response.data);
      console.log(response);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const onDelete = async id => {
    try {
      await axios.delete(`http://localhost:8000/product/${id}`);
      getProducts();
      toast.success('Product Deleted');
      setDeleted(false);
    } catch (err) {
      toast.error('Failed to delete product:', err);
    }
  };

  return (
    <div className="Home">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
      <div
        className="cover"
        onClick={() => {
          setDeleted(false);
        }}
        style={{ display: deleted ? 'block' : 'none' }}
      ></div>
      
      <button className='addButton'><Link  to="/products">Add Products</Link></button>
   
      <div
        className="delete-modal"
        style={{ display: deleted ? 'block' : 'none' }}
      >
        <h2>Do You Want to Delete</h2>
        <div className="deletebuttons">
          <button onClick={() => onDelete(productId.current)}>Confrim</button>
          <button onClick={() => setDeleted(false)}>Cancel</button>
        </div>
      </div>

      <div className="Home-main">
        {products.map(item => (
          <div className="product-card">
            <img src={item.image} alt="images" className="product-image" />
            <h4>Product Name:{item.Products}</h4>
            <h4>Price:{item.price}</h4>
            <div className="card-actions">
              <Pencil
                onClick={() => {
                  navigate(`/Edit/${item.id}`);
                }}
              />
              <Trash2
                onClick={() => {
                  productId.current = item.id;
                  setDeleted(true);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
