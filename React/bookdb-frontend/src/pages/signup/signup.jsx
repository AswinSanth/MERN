import './signup.css';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import { useState } from 'react';
const SignUp = () => {
  const [adduser, setAddUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: '',
  });
  const onChange = (e, key) => {
    setAddUser({ ...adduser, [key]: e.target.value });
  };
  const nav = useNavigate();
  const SetUser = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/user/sign-up',
        adduser
      );
      nav('/');
    } catch (e) {
      console.error('Error fetching books:', e);
    }
  };
  return (
    <div className="signuppage">
      <div className="head">
        <h2>Sign Up</h2>
      </div>
      <div className="inputfields">
        <label>First Name: </label>
        <input
          type="text"
          onChange={e => {
            onChange(e, 'firstName');
          }}
        />
      </div>
      <div className="inputfields">
        <label>Last Name: </label>
        <input
          type="text"
          onChange={e => {
            onChange(e, 'lastName');
          }}
        />
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
        <label>Address: </label>
        <input
          type="text"
          onChange={(e) => {
            onChange(e, 'address');
          }}
        />
      </div>
      {/* <div className="inputfields">
        <label>PH Number </label>
        <input type="Number"   onChange={()=>{
          onChange(e,)
        }}/>
      </div> */}
      <div className="inputfields">
        <label>Password</label>
        <input
          type="text"
          onChange={(e) => {
            onChange(e, "password");
          }}
        />
      </div>
      <div className="inputfields">
        <label>Confirm Password </label>
        <input
          type="text"
          onChange={(e) => {
            onChange(e, "confirmPassword");
          }}
        />
      </div>
      <div className="btn-area">
        <button onClick={() => SetUser()}>SignUp</button>
        <p>
          Are you already a member?<Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
