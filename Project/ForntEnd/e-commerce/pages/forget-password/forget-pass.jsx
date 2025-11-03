import { useState } from 'react';
import './forget-pass.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
const Reset = () => {
  const navigate = useNavigate();
  const token  = useParams();
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const onChange = (e, key) => {
    setForm(prevData => ({ ...prevData, [key]: e.target.value }));
  };
  const handleReset = async () => {
    if (!form.email || !form.password || !form.confirmPassword) {
      alert('All fields are required');
      return;
    }
    try {
      const res = await axios.post('http://localhost:8000/user/reset', {
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        token:token.id
      });
      alert('Password reset successful');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      console.error(err);
      console.error(form);
      console.error(token.id);
      alert('Something went wrong');
    }
  };
  return (
    <div className="signuppage">
      <div className="head">
        <h2>Reset Password</h2>
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
      <div className="inputfields">
        <label>ConfirmPassword: </label>
        <input
          type="text"
          onChange={e => {
            onChange(e, 'confirmPassword');
          }}
        />
      </div>

      <div className="btn-area">
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Reset;
