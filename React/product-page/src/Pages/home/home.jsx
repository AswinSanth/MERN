import { Link, useNavigate } from 'react-router-dom';
import './home.css';
import { useState, useEffect } from 'react';
const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const navigate = useNavigate();
  return (
    <div className="container">
      {/* <ul><li><Link to="/details">Details</Link></li></ul> */}
      {/*             
       <h2><Link to="/details">Details</Link></h2> */}
      <div className="box">
        {!loading ? (
          data.map(item => (
            <div
              className="products"
              onClick={() => {
                navigate(`/details/${item.id}`);
              }}
            >
              <img src={item.image} alt="image" />
              <h3>TiTle:{item.title}</h3>
              <p>Price: {item.price}</p>
              <p>Catergory: {item.category}</p>
              <p>Rating: {item.rating.rate}</p>
              <p>Count:{item.rating.count}</p>
            </div>
          ))
        ) : (
          <h1>loading....</h1>
        )}
      </div>
    </div>
  );
};
export default Home;
