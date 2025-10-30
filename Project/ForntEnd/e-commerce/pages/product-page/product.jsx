import { useNavigate, useParams } from 'react-router-dom';
import './product.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Product = () => {
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = localStorage.getItem('userId');

  const getProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/product/${id}`);
      setProduct(response.data);
    } catch (e) {
      console.error('Error fetching products', e);
    }
  };

  const handleDeleteproduct = async productId => {
    try {
      await axios.delete(
        `http://localhost:8000/product/deleteProduct/${productId}`
      );
      alert('Product deleted successfully');
      navigate('/Home');
    } catch (e) {
      console.error('Error deleting product', e);
    }
  };

  useEffect(() => {
    getProducts();
  }, [id]);
  const handleAddToCart = async productId => {
    try {
      if (!userId) {
        alert('Please login first');
        navigate('/login');
        return;
      }
      await axios.post('http://localhost:8000/cart/add', {
        userId,
        productId,
        quantity: 1,
      });
      alert('Product added to cart');
    } catch (e) {
      console.error('Error adding to cart', e);
      alert('Failed to add to cart');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }
  const handleBuyNow = item => {
    navigate('/order', {
      state: {
        product,
        userId,
        orderType: 'direct',
      },
    });
  };
  return (
    <div className="product-detail-page">
      <div className="product-detail-wrapper">
        <div className="product-card" key={product._id || product.id}>
          <span className="product-card-category">{product.category}</span>
          <img src={product.image} alt={product.title} />
          <h4>{product.title}</h4>

          <div className="product-card-rating">
            <span>⭐ {product.rating || 5.0}</span>
            <span>({product.reviews || 0} Reviews)</span>
          </div>

          <p className="product-card-price">${product.price}</p>

          <div className="card-buttons">
            <button
              className="add-cart-btn"
              onClick={() => handleAddToCart(product._id)}
            >
              Add to Cart
            </button>
            <button className="buy-now-btn" onClick={handleBuyNow}>
              Buy Now
            </button>
            <button
              className="product-delete-btn"
              onClick={() => handleDeleteproduct(product._id)}
            >
              Delete
            </button>
            <button
              className="product-edit-btn"
              onClick={() => navigate(`/EditProduct/${product._id}`)}
            >
              Edit Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Product;
