import { useState } from 'react';
import './login.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate,Link } from 'react-router';
const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const onChange = (e, key) => {
    setForm(prevData => ({ ...prevData, [key]: e.target.value }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      console.log(form);
      const res = await axios.post('http://localhost:8000/user/login', form);

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user._id);

      navigate('/Home');
    } catch (e) {
      console.log(e);
    }
  };
  const handleForgotPassword = async () => {
    if (!form.email) {
      // alert('Please enter your email first');
      toast.error('Please enter your email first',{ position: 'top-center' });
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/user/forgot', { email: form.email });
      toast.success('Password reset link sent to your email',{ position: 'top-center' });
    } catch (err) {
      console.error(err);
      toast.error('Error sending reset link. Please try again.',{ position: 'top-center' });
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Login</h2>
      

      <div className="signup-input-group">
        <label>Email: </label>
        <input
          type="email"
          onChange={e => {
            onChange(e, 'email');
          }}
        />
      </div>
      <div className="signup-input-group">
        <label>Password: </label>
        <input
          type="password"
          onChange={e => {
            onChange(e, 'password');
          }}
        />
      </div>

      <div className="signup-btn-area">
        <button onClick={handleSubmit}>Login</button>
        <p className="signup-login-text">
          Forgot Password  <span className='clickhere'
            onClick={handleForgotPassword}
            style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Click here    </span>
        </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
