import './button2.css';

const Button2 = ({ children, onPrintadd }) => {
  return (
    <button onClick={onPrintadd} className="btn2">
      {children}
    </button>
  );
};

export default Button2;
