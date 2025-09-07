import './button.css';

const Button = ({ children, onOperation, className = '' }) => {
  return (
    <button className={`btn ${className}`} onClick={onOperation}>
      {children}
    </button>
  );
};
export default Button;
