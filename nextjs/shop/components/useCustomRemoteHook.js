import { useState, useEffect } from 'react';

function useCustomRemoteHook(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    console.log('some custom hook');
  }, []);

  return 'Custom hook from localhost:3002 works!';
}
export default useCustomRemoteHook;
