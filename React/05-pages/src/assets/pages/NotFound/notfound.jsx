import './notfound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="notfound">
      <img src="404.jpg" alt="not Found" />
      <h3>
        Go Back to <Link to="/">Home</Link>
      </h3>
    </div>
  );
};
export default NotFound;
