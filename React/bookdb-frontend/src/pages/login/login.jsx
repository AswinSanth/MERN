import './login.css';
import axios from "axios"
const Login = () => {
  // const getUser=async()=>{
  //   const response=await axios.
  // }
  return (
    <div className="signuppage">
      <div className="head">
        <h2>Login</h2>
      </div>

      <div className="inputfields">
        <label>Email: </label>
        <input type="email" />
      </div>
      <div className="inputfields">
        <label>Password: </label>
        <input type="text" />
      </div>
      <div className="inputfields">
        <label>Confrim Password: </label>
        <input type="text" />
      </div>

      <div className="btn-area">
        <button>Login</button>
      </div>
    </div>
  );
};

export default Login;
