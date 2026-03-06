import styles from './index.module.less';
import React, { useState } from 'react';

const LandingPage = (props: any): JSX.Element => {
  const [count, setCount] = useState(0);
  console.log(props);
  return <div className={styles.libRow}>landing-page react 18 {count} </div>;
};

export default LandingPage;
