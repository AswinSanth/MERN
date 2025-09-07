import { useParams } from 'react-router-dom';
import './dynamic.css';

const Dynamic = () => {
  const { data } = useParams();
  return (
    <div className="dynamic">
      <h1>Dynamic</h1>
      <h2>{data}</h2>
    </div>
  );
};
export default Dynamic;
