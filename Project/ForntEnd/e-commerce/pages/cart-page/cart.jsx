import axios from 'axios';
import HomeNavbar from '../../components/home-nav/home-nav';
import './cart.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [empty, setempty] = useState(false);
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');
  const getCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/cart/${userId}`);
      setCart(response.data);
      if (!response.data.items || response.data.items.length === 0) {
        setempty(true);
        setCart({ items: [], totalPrice: 0 });
      } else {
        setempty(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const UpadateItem = async (productId, newQuantity) => {
    try {
      await axios.put('http://localhost:8000/cart/update', {
        userId,
        productId,
        quantity: newQuantity,
      });
      getCartItems();
    } catch (e) {
      console.log(e);
    }
  };
  const deleteItem = async productId => {
    try {
      await axios.delete('http://localhost:8000/cart/delete', {
        data: { userId, productId },
      });
      getCartItems();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCartItems();
  }, [userId]);
  if (!cart) {
    return (
      <div className="cart">
        <HomeNavbar />
        <div className="cart-main">
          <h1 className="cart-title">Loading your cart...</h1>
        </div>
      </div>
    );
  }
    
  return (
    <div className="cart">
      <HomeNavbar />
      <div className="cart-main">
        <h1 className="cart-title">{empty?"Cart is Empty":"Your Cart"}</h1>
        <div className="art-items">
          {console.log(cart)}
          {cart.items.map(item => (
            <div className="cart-item-card">
              <div className="item-image">
                {console.log(item.image)}
                <img src={item.product.image} alt={item.product.title} />
              </div>

              <div className="item-deatals">
                <h2>{item.product.title}</h2>
                <p>Price: ₹{item.product.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className="item-actions">
                <button
                  onClick={() =>
                    UpadateItem(item.product._id, item.quantity - 1)
                  }
                >
                  –
                </button>
                <button
                  onClick={() =>
                    UpadateItem(item.product._id, item.quantity + 1)
                  }
                >
                  +
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteItem(item.product._id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cart-summary">
        <h2>Total Price: ₹{cart.totalPrice.toFixed(2)}</h2>
        <button
          className="checkout-btn"
          onClick={() =>
            navigate('/Order', {
              state: { cartItems: cart.items, userId, orderType: 'cart' },
            })
          }
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};
export default Cart;
