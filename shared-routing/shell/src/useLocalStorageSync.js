import React from 'react';

export function useLocalStorageSync(key) {
  const [value, setValue] = React.useState(loadFromLocalStorage);

  function loadFromLocalStorage() {
    return JSON.parse(localStorage.getItem(key));
  }

  function setItem(value) {
    localStorage.setItem(key, JSON.stringify(value));
    setValue(value);
  }

  return {
    value,
    setItem,
  };
}
