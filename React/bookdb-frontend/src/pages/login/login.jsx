import './login.css';

const Login = () => {
  return (
    <div className="signuppage">
      <div className="head">
        <h2>Login</h2>
      </div>

      <div className="inputfields">
        <laebel>Email: </laebel>
        <input type="email" />
      </div>
      <div className="inputfields">
        <laebel>Password: </laebel>
        <input type="text" />
      </div>
      <div className="inputfields">
        <laebel>Confrim Password: </laebel>
        <input type="text" />
      </div>

      <div className="btn-area">
        <button>Login</button>
      </div>
    </div>
  );
};

export default Login;
