import React from "react";

export default ({caption = "Remote Button"}) =>
  <button style={{
    backgroundColor: 'skyblue',
    border: '1px solid white',
    color: 'white',
    padding: '15px 30px',
    textAlign: 'center',
    textDecoration: 'none',
    fontSize: '18px',
}}>{caption}</button>;
