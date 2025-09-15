import Confetti from 'react-confetti';
import { useState, useEffect } from 'react';

import './App.css';

const App = () => {
  const shape = ['circle', 'triangle', 'square'];
  const shape1 = ['triangle', 'square', 'circle'];

  const [matched, setMatched] = useState({});

  const [hidden, sethidden] = useState({});

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDrop = (topShape, e) => {
    const draggedShape = e.dataTransfer.getData('shape');

    if (draggedShape == topShape) {
      setMatched(prev => ({ ...prev, [topShape]: true }));
      sethidden(prev => ({ ...prev, [draggedShape]: true }));
    }
  };
  const isGameWon = shape.every(item => matched[item]);

  return (
    <div className="container">
      <h2>shapes</h2>
      <div className="matching">
        <div className="shapes">
          {shape.map(item => {
            return (
              <div
                className="box"
                onDragOver={e => e.preventDefault()}
                onDrop={e => {
                  handleDrop(item, e);
                }}
              >
                <div
                  className={`${item} ${matched[item] ? 'matched' : ''}`}
                ></div>
              </div>
            );
          })}
        </div>
        <div className="objects">
          {shape1.map(item => {
            return (
              <div
                className={item}
                draggable
                style={{ display: hidden[item] ? 'none' : 'block' }}
                onDragStart={e => e.dataTransfer.setData('shape', item)}
              ></div>
            );
          })}
        </div>
      </div>
      {shape.every(item => matched[item]) && <h2>🎉 Game Wins! 🎉</h2>}
      {isGameWon && (
        <Confetti width={windowSize.width} height={windowSize.height} />
      )}
    </div>
  );
};
export default App;
