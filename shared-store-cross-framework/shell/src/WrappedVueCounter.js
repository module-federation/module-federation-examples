import React, { useRef, useEffect } from 'react';
import { mount } from 'vue_counter/VueCounter';

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
};
