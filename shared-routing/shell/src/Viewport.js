import React from 'react';
import { CssBaseline, makeStyles } from '@material-ui/core';

const useGlobalStyles = makeStyles(
  () => ({
    '@global': {
      '*:-webkit-full-screen': {
        height: '100%',
        width: '100%',
      },
      html: {
        position: 'fixed',
      },
      'html, body': {
        height: '100%',
        width: '100%',
      },
      '#root': {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
    },
  }),
  { name: 'ViewportGlobals' },
);

export default function Viewport(props) {
  useGlobalStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      {props.children}
    </React.Fragment>
  );
}
