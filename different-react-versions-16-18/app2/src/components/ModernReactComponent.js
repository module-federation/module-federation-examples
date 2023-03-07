import React, { useEffect } from 'react';
import ReactAdaperProvider from './ReactAdaperProvider';

const ModernReactComponent = props => {
  const { children, input } = props;

  useEffect(() => {
    console.log('some effect from app2 based component');
  }, []);

  return (
    <div>
      <strong>
        This Component uses hooks, if loaded on localhost:3001, it should work, even though that
        host does not support React Hooks
      </strong>
      <br />
      <h2>Text form legacy React app: {input}</h2>
      {children}
    </div>
  );
};

export const Adapted = React.forwardRef((props, ref) => {
  return <ReactAdaperProvider {...props} component={ModernReactComponent} ref={ref} />;
});

export default ModernReactComponent;
