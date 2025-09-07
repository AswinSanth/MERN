import { useRef, useState } from 'react';
import './form.css';

const Form = () => {
  const lastnameRef = useRef();
  const ageRef = useRef();
  const placeRef = useRef();
  const buttonRef = useRef();
  const[output,setOutput]=useState(false)
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    age: '',
    place: '',
  });

  const onEnter = (e, tagName) => {
    if (e.key == 'Enter' && tagName == 'lastname') {
      lastnameRef.current.focus();
    } else if (e.key == 'Enter' && tagName == 'age') {
      ageRef.current.focus();
    } else if (e.key == 'Enter' && tagName == 'place') {
      placeRef.current.focus();
    }
   else if (e.key == 'Enter' && tagName == 'button') {
    buttonRef.current.focus();
  }
  };
  // const onChange = (e, keyname) => {
  //   if (keyname == "firstname") {
  //     setUser({ ...user, firstname: e.target.value });
  //   } else if (keyname == 'lastname') {
  //     setUser({ ...user, lastname: e.target.value });
  //   } else if (keyname == 'age') {
  //     setUser({ ...user, age: e.target.value });
  //   } else if (keyname == 'place') {
  //     setUser({ ...user, place: e.target.value });
  //   }
  // };

  const onChange=(e,keyname)=>{
    setUser({...user,[keyname]:e.target.value})

  }
  const onDisplay = () => {
    console.log(user);
  };

  return (
    <div className="form">
      <div className="inputarea">
        <input
          type="text"
          placeholder="Enter Your first Name"
          onKeyDown={e => {
            onEnter(e, 'lastname');
          }}
          onChange={e => {
            onChange(e, 'firstname');
          }}
        />
        <input
          type="text"
          placeholder="ENter your lastName"
          ref={lastnameRef}
          onKeyDown={e => {
            onEnter(e, 'age');
          }}
          onChange={e => {
            onChange(e, 'lastname');
          }}
        />
        <input
          type="text"
          placeholder="ENter your Age"
          ref={ageRef}
          onKeyDown={e => {
            onEnter(e, 'place');
          }}
          onChange={e => {
            onChange(e, 'age');
          }}
        />
        <input
          type="text"
          placeholder="Enter your Place"
          ref={placeRef}
          onKeyDown={e => {
            onEnter(e, 'button');
          }}
          onChange={e => {
            onChange(e, 'place');
          }}
        />
        <button ref={buttonRef} onClick={()=>{
            onDisplay();
            setOutput(true)
        }}>
          ADD
        </button>
      </div>
      <div className="outputarea" style={{display :output?"block":"none"}}>
    <p>hai,my name is {user.firstname} {user.lastname}. I'm {user.age} years old. I'm coming from {user.place}</p>
      </div>
    </div>
  );
};
export default Form;
