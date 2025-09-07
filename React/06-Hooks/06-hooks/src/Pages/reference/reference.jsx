import './reference.css';

import { useRef } from 'react';

const Reference = () => {
  const boxRef = useRef();
  const bgcolor = useRef('red');
  const onClick = () => {
    // boxRef.current.style.backgroundColor = 'blue';
    boxRef.current.style.backgroundColor =
      bgcolor.current == 'red' ? 'blue' : 'red';
    bgcolor.current = bgcolor.current== 'red' ? 'blue' : 'red';
  };

  //   const [color, setColor] = useState(false);
  return (
    <div className="container">
      <div
        ref={boxRef}
        className="box"
        // style={{ background: color ? 'blue' : 'red' }}
      ></div>
      <button onClick={onClick}>Click Here</button>
    </div>
  );
};
export default Reference;
