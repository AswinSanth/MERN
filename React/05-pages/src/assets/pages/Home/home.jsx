import { Link, useNavigate } from 'react-router-dom';

import './home.css';

const Home = () => {
  const navigate = useNavigate();
  const onClick = () => {
    console.log('Hello');

    navigate('/about');
  };
  return (
    <div className="home">
      <h1>Welcome to Home Page</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas facilis
        magnam modi velit nobis aspernatur unde odit voluptatum. Minus, hic
        enim. Officiis et quas iusto deleniti magni voluptate ab sequi. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Sapiente maiores odio
        hic fuga blanditiis officiis nemo at sit, consectetur assumenda? Et
        quasi maxime sapiente animi amet mollitia placeat excepturi sunt?
      </p>
      <button onClick={onClick}>Go toAbout Page</button>
      {/* <div className="para">
       <p> go to <Link to="/about">About</Link> page</p>
      </div> */}
    </div>
  );
};
export default Home;
