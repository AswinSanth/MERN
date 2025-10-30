// import './signup.css';
// import { Link, useNavigate } from 'react-router';
// import axios from 'axios';
// import { useState } from 'react';
// const SignUp = () => {
//   const [adduser, setAddUser] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     address: '',
//     password: '',
//     confrimPassword: '',
//   });
//   const onChange = (e, key) => {
//     setAddUser({ ...adduser, [key]: e.target.value });
//   };
//   const nav = useNavigate();
//   const SetUser = async () => {
//     try {
//       const response = await axios.post(
//         'http://localhost:8000/user/signUp',
//         adduser
//       );
//       nav('/Login');
//     } catch (e) {
//       console.log(e);
//       console.error('Error ', e);
//     }
//   };
//   return (
//     <div className="signuppage">
//       <div className="head">
//         <h2>Sign Up</h2>
//       </div>
//       <div className="inputfields">
//         <label>First Name: </label>
//         <input
//           type="text"
//           onChange={e => {
//             onChange(e, 'firstName');
//           }}
//         />
//       </div>
//       <div className="inputfields">
//         <label>Last Name: </label>
//         <input
//           type="text"
//           onChange={e => {
//             onChange(e, 'lastName');
//           }}
//         />
//       </div>
//       <div className="inputfields">
//         <label>Email: </label>
//         <input
//           type="email"
//           onChange={e => {
//             onChange(e, 'email');
//           }}
//         />
//       </div>
//       <div className="inputfields">
//         <label>Address: </label>
//         <input
//           type="text"
//           onChange={e => {
//             onChange(e, 'address');
//           }}
//         />
//       </div>

//       <div className="inputfields">
//         <label>Password</label>
//         <input
//           type="text"
//           onChange={e => {
//             onChange(e, 'password');
//           }}
//         />
//       </div>
//       <div className="inputfields">
//         <label>Confirm Password </label>
//         <input
//           type="text"
//           onChange={e => {
//             onChange(e, 'confrimPassword');
//           }}
//         />
//       </div>
//       <div className="btn-area">
//         <button onClick={() => SetUser()}>SignUp</button>
//         <p>
//           Are you already a member?<Link to="/Login">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

import './signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const SignUp = () => {
  const [addUser, setAddUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: {
      fullname: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      pincode: '',
    },
    password: '',
    confirmPassword: '',
  });

  const nav = useNavigate();

  const onChange = (e, key) => {
    setAddUser({ ...addUser, [key]: e.target.value });
  };

  const onAddressChange = (e, key) => {
    setAddUser({
      ...addUser,
      address: { ...addUser.address, [key]: e.target.value },
    });
  };

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
    <div className="signuppage">
      <div className="head">
        <h2>Sign Up</h2>
      </div>

      <div className="inputfields">
        <label>First Name:</label>
        <input type="text" onChange={e => onChange(e, 'firstName')} />
      </div>

      <div className="inputfields">
        <label>Last Name:</label>
        <input type="text" onChange={e => onChange(e, 'lastName')} />
      </div>

      <div className="inputfields">
        <label>Email:</label>
        <input type="email" onChange={e => onChange(e, 'email')} />
      </div>

      <h4>Address</h4>
      <div className="address-section">
        <input placeholder="Full Name" onChange={e => onAddressChange(e, 'fullname')} />
        <input placeholder="Phone" onChange={e => onAddressChange(e, 'phone')} />
        <input placeholder="Street" onChange={e => onAddressChange(e, 'street')} />
        <input placeholder="City" onChange={e => onAddressChange(e, 'city')} />
        <input placeholder="State" onChange={e => onAddressChange(e, 'state')} />
        <input placeholder="Pincode" onChange={e => onAddressChange(e, 'pincode')} />
      </div>

      <div className="inputfields">
        <label>Password:</label>
        <input type="password" onChange={e => onChange(e, 'password')} />
      </div>

      <div className="inputfields">
        <label>Confirm Password:</label>
        <input type="password" onChange={e => onChange(e, 'confirmPassword')} />
      </div>

      <div className="btn-area">
        <button onClick={handleSignup}>Sign Up</button>
        <p>
          Already a member? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
