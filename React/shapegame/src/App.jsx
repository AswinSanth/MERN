import './App.css';

const App = () => {
  const shape = ['circle', 'triangle', 'square'];
  const shape1 = ['triangle','square' ,'circle'] ;
  
  return (
    <div className="container">
      <h2>shapes</h2>
      <div className="matching">
        <div className="shapes">
        {shape.map(item => {
          return (
            <div className="box">
              <div className={item}></div>
            </div>
          );
        })}
        </div>
        <div className="objects">
        {shape1.map(item => {
          return (
              <div className={item}></div>
         
          );
        })}
        </div>
      </div>
    </div>
  );
};
export default App;
