import React from 'react';
import { createRoot } from 'react-dom/client';
import Content from './Content';
import LoaderContext from './LoaderContext';
const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss());
  return () => removeCss.forEach(dispose => dispose());
};
const App = () => (
  <LoaderContext.StyleContext.Provider value={{ insertCss }}>
    <Content />
  </LoaderContext.StyleContext.Provider>
);

createRoot(document.getElementById('app')).render(<App />);
