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
    console.log('Infinite looping in progress')
  };

  const stop = () => {
    setIsPlaying(false);
    window.cancelAnimationFrame(animationId.current);
    animationId.current = undefined;
    console.log('Looping successfully stopped')
  };

  // TODO: Sometimes this function send error as undefined in tests, needs to be checked
  const tick = () => {
    cells.tick();
    board.current.textContent = cells.render();
    console.log('Game board successfully rerendered')
  };

  const reset = () => {
    cells.reset();
    board.current.textContent = cells.render();
    console.log('Game board successfully reset')
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
      <div data-e2e="GAME_BOARD" ref={board} />
    </main>
  );
};

export default App;
