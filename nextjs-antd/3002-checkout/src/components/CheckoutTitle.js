import React, { useEffect, useState } from 'react';

const CheckoutTitle = () => {
  const [hookData, setHookData] = useState('');

  useEffect(() => {
    setHookData('with hooks data');
  }, []);

  return (
    <h3 className="title">
      This title came from <code>checkout</code> {hookData}!!!
    </h3>
  );
};

export default CheckoutTitle;
