import { useEffect, useState } from 'react';
import './details';
import { useParams } from 'react-router-dom';
const Details = () => {
  const [newData, setNewData] = useState({});
  const { id } = useParams();
  const idData = async () => {
    const getData = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await getData.json();
    setNewData(data);
  };

  useEffect(() => {
    idData(), [];
  });
  return (
    <div className="deatils">
      <div className="new">
        <img src={newData.image} alt="new Image" />
        <h2>title{newData.title}</h2>
        <p>price:{newData.price}</p>
      </div>
    </div>
  );
};
export default Details;
