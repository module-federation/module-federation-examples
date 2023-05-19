import React from "react";
import ReactDOM from "react-dom";
import Content from "./Content";
import LoaderContext from './LoaderContext';
const insertCss = (...styles) => {
    const removeCss = styles.map(style => style._insertCss());
    return () => removeCss.forEach(dispose => dispose());
};
const App = () => (<LoaderContext.StyleContext.Provider value={{ insertCss }}>
    <Content />
</LoaderContext.StyleContext.Provider>);

ReactDOM.render(<App />, document.getElementById("app"));
