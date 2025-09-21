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
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr
                onClick={() => {
                  navigate(`/details/${item.id}`);
                }}
              >
                <td>
                  <img src={item.image} alt={item.title} />
                </td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
              </tr>
            ))}
          </tbody>
                  
        </table>
      </div>
    </div>
  );
};
export default Home;
