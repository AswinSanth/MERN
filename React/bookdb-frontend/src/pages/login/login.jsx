import { useState } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router';
const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const onChange = e => {
    const { name, value } = e.target;
    setForm(prevData => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async() => {
    try {
      console.log(form)
      const res = await axios.post('http://localhost:8000/user/login', form);
      
      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (e) {
      console.error(e);
     
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
          name="email"              
          onChange={(e ,email)=> {
            onChange(e, email);
          }}
        />
      </div>
      <div className="inputfields">
        <label>Password: </label>
        <input
          type="text"
          name="password"           
          onChange={(e,password) => {
            onChange(e, password);
          }}
        />
      </div>

      <div className="btn-area">
        <button
          onClick={() => {
            handleSubmit();
          }}
        >
          Login
        </button>
      </div>
      
    </div>
  );
};

export default Login;
