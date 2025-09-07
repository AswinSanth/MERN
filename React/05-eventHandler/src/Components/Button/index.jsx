import './button.css';

const Button = (children, onOperation) => {
  return (
    <button className="btn" onClick={onOperation}>
      {children}
    </button>
  );
};

export default Button;
