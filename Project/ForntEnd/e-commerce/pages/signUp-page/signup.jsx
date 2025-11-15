
import './signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const SignUp = () => {
  const [addUser, setAddUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    // address: {
    //   fullname: '',
    //   phone: '',
    //   street: '',
    //   city: '',
    //   state: '',
    //   pincode: '',
    // },
    password: '',
    confirmPassword: '',
  });

  const nav = useNavigate();

  const onChange = (e, key) => {
    setAddUser({ ...addUser, [key]: e.target.value });
  };

  // const onAddressChange = (e, key) => {
  //   setAddUser({
  //     ...addUser,
  //     address: { ...addUser.address, [key]: e.target.value },
  //   });
  // };

  const handleSignup = async () => {
    if (addUser.password !== addUser.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      await axios.post('http://localhost:8000/user/signUp', addUser);
      alert('Signup successful!');
      nav('/login');
    } catch (e) {
      console.error('Error:', e);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Sign Up</h2>
   

      <div className="signup-input-group">
        <label>First Name:</label>
        <input type="text" onChange={e => onChange(e, 'firstName')} />
      </div>

      <div className="signup-input-group">
        <label>Last Name:</label>
        <input type="text" onChange={e => onChange(e, 'lastName')} />
      </div>

      <div className="signup-input-group">
        <label>Email:</label>
        <input type="email" onChange={e => onChange(e, 'email')} />
      </div>


      <div className="signup-input-group">
        <label>Password:</label>
        <input type="password" onChange={e => onChange(e, 'password')} />
      </div>

      <div className="signup-input-group">
        <label>Confirm Password:</label>
        <input type="password" onChange={e => onChange(e, 'confirmPassword')} />
      </div>

      <div className="signup-btn-area">
        <button onClick={handleSignup}>Sign Up</button>
        <p className="signup-login-text">
          Already a member? <Link to="/login">Login</Link>
        </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
