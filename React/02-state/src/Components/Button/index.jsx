import './button.css';

const Button = ({ text,onOperation,className=''}) => {
  return(
    
    <button
    className={`btn ${className}`}
    onClick={onOperation}>{text}
      </button>
  );
};
export default Button;
