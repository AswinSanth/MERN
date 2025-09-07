import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

import './details.css';
const Detail = () => {
  const { id } = useParams();
  const [newData, setnewData] = useState({});
  const getId = async () => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    setnewData(data);
  };

  useEffect(() => {
    getId();
  }, []);
  return (
    <div className="detail">
   
      {newData.image ? (
        <div className="new">
          <img src={newData.image} alt="image" />
          <h2>TiTle{newData.title}</h2>
          <h3>Price{newData.price}</h3>
          <h2>{newData.description}</h2>
          <h4>Rating{newData.rating?.rate}</h4>
        </div>
      ) : (
        <LoadingOutlined />
      )}
      
    </div>
  );
};
export default Detail;
