import './signup.css';
import { Link } from 'react-router';
const SignUp = () => {
  return (
    <div className="signuppage">
      <div className="head">
        <h2>Sign Up</h2>
      </div>
      <div className="inputfields">
        <laebel>First Name: </laebel>
        <input type="text" />
      </div>
      <div className="inputfields">
        <laebel>Last Name: </laebel>
        <input type="text" />
      </div>
      <div className="inputfields">
        <laebel>Email: </laebel>
        <input type="email" />
      </div>
      <div className="inputfields">
        <laebel>Address: </laebel>
        <input type="text" />
      </div>
      <div className="inputfields">
        <laebel>PH Number </laebel>
        <input type="Number" />
      </div>
      <div className="btn-area">
        <button>SignUp</button>
        <p>
          Are you already a member?<Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
