import React from 'react';
import { ReactAdaperProvider } from 'react-version-adapter';

export interface ImageProps {}

const Image: React.FC<ImageProps> = () => {
  return (
    <div
      style={{
        width: '500px',
        padding: '1rem',
        borderRadius: '0.25rem',
        border: '4px dashed #4169e1',
      }}
    >
      <h2>Remote 2: Image (React v17.0.2)</h2>
      <p>Hey there! This is the image component from remote2. It is being rendered server-side.</p>
      <button
        style={{ marginBottom: '1rem' }}
        onClick={() => alert('Client side Javascript works!')}
      >
        Click me to test i'm interactive!
      </button>
      <img
        src="https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_960_720.jpg"
        style={{ width: '100%' }}
        alt="serge"
      />
    </div>
  );
};

export const Adapted = React.forwardRef<ReactAdaperProvider<ImageProps>, ImageProps>(
  (props, ref) => {
    return <ReactAdaperProvider {...props} component={Image} ref={ref} />;
  },
);

export default Image;
