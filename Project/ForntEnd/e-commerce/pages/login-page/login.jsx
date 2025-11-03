import { useState } from 'react';
import './login.css';
import axios from 'axios';
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
      alert('Please enter your email first');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/user/forgot', { email: form.email });
      alert('Password reset link sent to your email');
    } catch (err) {
      console.error(err);
      alert('Error sending reset link. Please try again.');
    }
  };

  return (
    <div className="signuppage">
      <div className="head">
        <h2>Login</h2>
      </div>

      <div className="inputfields">
        <label>Email: </label>
        <input
          type="email"
          onChange={e => {
            onChange(e, 'email');
          }}
        />
      </div>
      <div className="inputfields">
        <label>Password: </label>
        <input
          type="text"
          onChange={e => {
            onChange(e, 'password');
          }}
        />
      </div>

      <div className="btn-area">
        <button onClick={handleSubmit}>Login</button>
        <p>
          Forgot Password  <span
            onClick={handleForgotPassword}
            style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Click here    </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
