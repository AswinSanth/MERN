import { useEffect, useState } from 'react';
import HomeNavbar from '../../components/home-nav/home-nav';
import axios from 'axios';
import './myOrder-page.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyOrder = () => {
  const nav = useNavigate();
  const [myOrder, setMyOrder] = useState([]);
  const userId = localStorage.getItem('userId');

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/order/${userId}`);
      setMyOrder(res.data);
      console.log(res.data);
    } catch (e) {
      setMyOrder([]);
      console.log('error while fetching the Data', e);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  // const handleDeleteOrder = async (orderId) => {
  //   if (!window.confirm('Are you sure you want to delete this order?')) return;

  //   try {
  //     await axios.delete(`http://localhost:8000/order/delete/${orderId}`);
  //     toast.success('Order deleted successfully', { position: 'top-center' });
  //     fetchOrders();
  //   } catch (e) {
  //     console.log('Error deleting order:', e);
  //     toast.error('Failed to delete order', { position: 'top-center' });
  //   }
  // };

  const handleDeleteOrder = async orderId => {
    const result = await Swal.fire({
      title: 'Delete this order?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:8000/order/delete/${orderId}`);
      Swal.fire('Deleted!', 'The order has been deleted.', 'success');
      fetchOrders();
    } catch (e) {
      console.log('Error deleting order:', e);
      Swal.fire('Error', 'Failed to delete order.', 'error');
    }
  };

  return (
    <div className="myorder">
      <HomeNavbar />
      <div className="myorder-container"></div>
      <h2 className="orders-title">My Orders</h2>
      {myOrder.length === 0 ? (
        <div className="no-orders">
          <p>No orders yet.</p>
          <button onClick={() => nav('/Home')}>Shop Now</button>
        </div>
      ) : (
        <div className="orders-list">
          {myOrder.map((order, index) => (
            <div key={index} className="order-card">
              <div className="order-header">
                <p>
                  <strong>Order ID:</strong> {order._id}
                </p>
                <span className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>

              {order.products.map((item, i) => (
                <div key={i} className="order-item">
                  <img
                    src={item.productId?.image}
                    alt={item.productId?.title}
                  />
                  <div className="item-details">
                    <h4>{item.productId?.title}</h4>
                    <p>₹{item.productId?.price}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}

              <div className="order-footer">
                <p>
                  <strong>Total:</strong> ₹{order.totalAmount}
                </p>
                <p>
                  <strong>Placed on:</strong>{' '}
                  {new Date(order.createdAt).toLocaleDateString()}
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteOrder(order._id)}
                  >
                    Delete Order
                  </button>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default MyOrder;
