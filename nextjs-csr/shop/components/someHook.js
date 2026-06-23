import { useState, useEffect } from 'react';

function customHook(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    console.log('some custom hook');
  }, []);
}
export default customHook;
