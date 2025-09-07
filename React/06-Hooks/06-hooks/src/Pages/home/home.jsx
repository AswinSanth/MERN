import './home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="box1">
      <h2>Pages</h2>
      <ul>
        <li>
          <Link to="/reference">Reference</Link>
        </li>
        <li>
          {' '}
          <Link to="/form">Form</Link>
        </li>
        <li>
          {' '}
          <Link to="/lib">Lib</Link>
        </li>
        <li>
          {' '}
          <Link to="/useeffect">useEffect</Link>
        </li>
        <li>
          {' '}
          <Link to="/sample">Sample</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
