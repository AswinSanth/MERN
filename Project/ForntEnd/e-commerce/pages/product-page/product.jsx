import { useNavigate, useParams } from 'react-router-dom';
import './product.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import HomeNavbar from '../../components/home-nav/home-nav';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

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
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `http://localhost:8000/product/deleteProduct/${productId}`
        );
        Swal.fire('Deleted!', 'Your product has been deleted.', 'success');

        toast.success('Product deleted successfully', <ToastContainer />);
        navigate('/Home');
      } catch (e) {
        console.error('Error deleting product', e);
        Swal.fire('Error', 'Failed to delete product.', 'error');

      }
    }
  };

  useEffect(() => {
    getProducts();
  }, [id]);
  const handleAddToCart = async productId => {
    try {
      if (!userId) {
        toast.error('Please login first', { position: 'top-center' });
        navigate('/login');
        return;
      }
      await axios.post('http://localhost:8000/cart/add', {
        userId,
        productId,
        quantity: 1,
      });
      toast.success('Product added to cart', { position: 'top-center' });
    } catch (e) {
      console.error('Error adding to cart', e);
      toast.error('Failed to add to cart', { position: 'top-center' });
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
    <>
      <HomeNavbar />
      <div className="product-detail-page">
        <div className="product-container">
          <div className="left">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="right">
            <div className="description">
              <h5>Description</h5>
              <p>{product.description}</p>
            </div>
            <div className="product-card-rating">
              <span>⭐ {product.rating || 5.0}</span>
              <span>({product.reviews || 0} Reviews)</span>
            </div>
            <p className="product-card-price">${product.price}</p>
            <p>inclusive of all taxes</p>
            <div className="card-buttons">
              {product.sellerId != userId ? (
                <>
                  <button
                    className="add-cart-btn"
                    onClick={() => handleAddToCart(product._id)}
                  >
                    Add to Cart
                  </button>

                  <button className="buy-now-btn" onClick={handleBuyNow}>
                    Buy Now
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};
export default Product;
