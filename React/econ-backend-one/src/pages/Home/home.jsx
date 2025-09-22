import axios from 'axios';
import './home.css';
import { Delete, Pencil, Trash2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [editIconPressed, setEditIconPressed] = useState(false);

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
      setEditIconPressed(false);
    } catch (err) {
      toast.error('Failed to delete product:', err);
    }
  };
  // const onPatch = async id => {
  //   try {
  //     await axios.patch(`http://localhost:8000/product/${id}`);
  //     getProducts();
  //   } catch (err) {
  //     console.error('Failed to delete product:', err);
  //   }
  // };

  return (
    <div className="Home">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
      <Link to="/products">Add Products</Link>
      <div
        className="modal"
        style={{ display: editIconPressed ? 'block' : 'none' }}
      >
        <label>Do You Want to delete?</label>
        <div className="modal-content">
          <div className="btns">
            <button onClick={() => onDelete(productId.current)}>Confirm</button>
            <button onClick={() => setEditIconPressed(false)}>Cancel</button>
          </div>
        </div>
      </div>
      <div className="Home-main">
        {products.map(item => (
          <div className="product-card">
            <h1>{item.Product}</h1>
            <h2>{item.price}</h2>
            <Pencil
              onClick={() => {
                navigate();
              }}
            />
            <Trash2
              onClick={() => {
                productId.current = item.id;
                setEditIconPressed(true);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
