import './button.css';

const Button = ({ text = 'Click', bgcolor = 'red',clickSave}) => {
  return (
    <button
  
    onClick={clickSave}
      style={{
        backgroundColor: bgcolor,
      }}
      className="btn"
    >
      {text}
    </button>
  );
};
export default Button;
