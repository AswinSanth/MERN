import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './order.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Order = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { userId, product, orderType, cartItems } = location.state || {};

  const [user, setUser] = useState(null);
  const [useDefaultAddress, setUseDefaultAddress] = useState(true);
  const [shippingAddress, setShippingAddress] = useState({
    fullname: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    
  });

  const [paymentMode, setPaymentMode] = useState('Cash on Delivery');

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      try {
        const res = await axios.get(`http://localhost:8000/user/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };
    fetchUser();
  }, [userId]);

  const handlePlaceOrder = async () => {
    try {
      if (!user || !orderType) {
        toast.error('Missing user or order details!',{ position: 'top-center' });
        return;
      }

      const payload = {
        userId: user._id,
        type: orderType,
        productId: orderType === 'direct' ? product._id : undefined,
        quantity: orderType === 'direct' ? 1 : undefined,
        cartItems: orderType === 'cart' ? cartItems : undefined,

        shippingAddress: useDefaultAddress ? undefined : shippingAddress,
      };
      console.log(payload);
      await axios.post('http://localhost:8000/order/add', payload);
      toast.success('Order placed successfully!', { position: 'top-center' });
      navigate('/Home');
    } catch (e) {
      console.log(e);
    }
  };

  
  if (!user) {
    return <h3>Loading user details...</h3>;
  }

  return (
    <div className="order-page">
      <h2>Shipping Address</h2>

      {useDefaultAddress && user?.address ? (
        <div className="default-address">
          <p>
            <strong>{user.address.fullname}</strong>
          </p>
          <p>{user.address.street}</p>
          <p>
            {user.address.city}, {user.address.state}, {user.address.pincode}
          </p>
          <p>Phone: {user.address.phone}</p>

          <button onClick={() => setUseDefaultAddress(false)}>
            Add New Address
          </button>
        </div>
      ) : (
        <div className="new-address">
          <input
            placeholder="Full Name"
            onChange={e =>
              setShippingAddress({
                ...shippingAddress,
                fullname: e.target.value,
              })
            }
          />
          <input
            placeholder="Phone"
            onChange={e =>
              setShippingAddress({ ...shippingAddress, phone: e.target.value })
            }
          />
          <input
            placeholder="Street"
            onChange={e =>
              setShippingAddress({ ...shippingAddress, street: e.target.value })
            }
          />
          <input
            placeholder="State"
            onChange={e =>
              setShippingAddress({ ...shippingAddress, state: e.target.value })
            }
          />
          <input
            placeholder="City"
            onChange={e =>
              setShippingAddress({ ...shippingAddress, city: e.target.value })
            }
          />
          <input
            placeholder="Pincode"
            onChange={e =>
              setShippingAddress({
                ...shippingAddress,
                pincode: e.target.value,
              })
            }
          />
        </div>
      )}
       <div className="payment-section">
        <h3>Payment Method</h3>
        <label>
          <input
            type="radio"
            value="Cash on Delivery"
            checked={paymentMode === 'Cash on Delivery'}
            onChange={e => setPaymentMode(e.target.value)}
          />
          Cash on Delivery
        </label>

        <label>
          <input
            type="radio"
            value="UPI"
            checked={paymentMode === 'UPI'}
            onChange={e => setPaymentMode(e.target.value)}
          />
          UPI / Wallet
        </label>

        <label>
          <input
            type="radio"
            value="Card Payment"
            checked={paymentMode === 'Card Payment'}
            onChange={e => setPaymentMode(e.target.value)}
          />
          Credit / Debit Card
        </label>
      </div>
      

      <button className="place-order-btn" onClick={handlePlaceOrder}>
        Place Order
      </button>
      <ToastContainer />
    </div>
  );
};

export default Order;
