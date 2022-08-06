import React, { useEffect } from 'react';

const CheckoutTitle = () => {
  console.log('---------loading remote component---------');
  useEffect(() => {
    console.log('HOOKS WORKS');
  }, []);
  return (
    <h3 className="title">
      {' '}
      This title came from <code>checkout</code> !!!
    </h3>
  );
};

export default CheckoutTitle;
