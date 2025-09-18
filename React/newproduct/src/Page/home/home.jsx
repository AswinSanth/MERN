import { useNavigate } from 'react-router-dom';
import './home.css';
import { useEffect, useState } from 'react';

const Home = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="box">
        {data.map(item => (
          <div
            className="datas"
            onClick={() => {
              navigate(`/details/${item.id}`);
            }}
          >
            <div className="products">
              <img src={item.image} alt="" />
              <h2>Title:{item.title}</h2>
              <p>price{item.price}$</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
