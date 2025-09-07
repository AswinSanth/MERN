import './Navbar.css';

const Navbar = props => {
  return (
    <div className="nav">
      <h1>{props.head}</h1>

      <div className="navbox">
        {props.arr.map(a => (
          <p>{a}</p>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
