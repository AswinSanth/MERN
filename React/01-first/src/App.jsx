import Card from './Components/Card/card';
import Navbar from './Components/Navbar/Navbar.jsx';
import Button from './Components/Button';
import './App.css';

const App = () => {
  const username = 'jhon';
  const heading = [<h2>heading1</h2>, <h2>heading2</h2>, <h2>heading3</h2>];
  const fruit = ['apple', 'orange', 'mango'];
  // const list = [];
  // for (let i of fruit) {
  //   list.push(<li>{i}</li>);
  // }

  const users = [
    { firstname: 'jhon', lastname: 'david', age: 45, place: 'Kochi' },
    { firstname: 'mark', lastname: 'dane', age: 45, place: 'Kollam' },
    { firstname: 'elon', lastname: 'musk', age: 45, place: 'Kozhikode' },
    { firstname: 'charles', lastname: 'babbbge', age: 45, place: 'Kannur' },
  ];

  const onBtnClick = () => {
    console.log('hello');
    console.log('hii');
  };

  const onSave = () => {
    console.log('on Save');
  };
  // const add=()=>

  // {

  // const a=0;
  //   a++}

  const isLoggedIn = false; // for giving condition
  let text = 'please login';
  if (isLoggedIn) text = 'welcome user';
  return (
    <div>
      <Navbar head="React" arr={['home', 'about', 'settings']} />
      {heading}
      <Button text="Click" />
      <Button text="Download" bgcolor="green" />

      <button onClick={onBtnClick}> click to console </button>

      <Button clickSave={onSave} text="save" />
      {/* <h1>{a}</h1> */}
      {/* <Button clickAdd={add} title="+"/> */}

      <Card
        title="hello"
        des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime adipisci
        iure aliquam ullam ea pariatur aperiam ipsa! Sed ad blanditiis vel,
        eveniet dolorem obcaecati numquam dolores quisquam. Magni, fugiat alias."
      />

      <Card title="welcome" />
      <h1>{isLoggedIn ? 'welcome user' : 'please login'}</h1>
      {/* <ul>{list}</ul>  */}
      <ul>
        {fruit.map(item => (
          <li>{item}</li>
        ))}
      </ul>
      <h1>Welcome to my webpage</h1>
      <h2>{username}</h2>
      <h2>{3 + 4}</h2>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident
        porro natus quasi unde suscipit hic quaerat non maiores autem, quae ab!
        Repellendus repudiandae explicabo asperiores doloremque nam rerum
        consequuntur culpa!
      </p>

      <div className="container">
        {users.map(item => {
          return (
            <div className="box">
              <h3>firstname:{item.firstname}</h3>
              <h3>lastname:{item.lastname}</h3>
              <h3>age:{item.age}</h3>
              <h3>place:{item.place}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default App;
