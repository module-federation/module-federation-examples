import React, { useLayoutEffect, useRef, useState } from 'react';
import * as GameOfLife from 'GameOfLifeModule/GameOfLifeModule';

const App = () => {
  const [cells, setCells] = useState(undefined);
  const board = useRef();

  const animationId = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  useLayoutEffect(() => {
    GameOfLife.then(({ Universe }) => {
      if (!cells) {
        setCells(Universe.new());
      }
    });
  }, []);

  const loop = () => {
    cells.tick();
    board.current.textContent = cells.render();
    start();
  };

  const start = () => {
    setIsPlaying(true);
    animationId.current = window.requestAnimationFrame(loop);
  };

  const stop = () => {
    setIsPlaying(false);
    window.cancelAnimationFrame(animationId.current);
    animationId.current = undefined;
  };

  const tick = () => {
    cells.tick();
    board.current.textContent = cells.render();
  };

  const reset = () => {
    cells.reset();
    board.current.textContent = cells.render();
  };

  const toggle = () => {
    animationId.current ? stop() : start();
  };

  return (
    <main>
      <h1>Host App</h1>
      <button onClick={toggle}>{isPlaying ? 'Stop 🛑' : 'Play ▶️'}</button>
      <button onClick={tick}>Tick 🔂</button>
      <button onClick={reset}>Reset ♻️</button>
      <div ref={board} />
    </main>
  );
};

export default App;
