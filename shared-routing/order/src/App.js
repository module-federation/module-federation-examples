import React from 'react';
import { makeStyles, CircularProgress, Typography } from '@material-ui/core';
const Shell = React.lazy(() => import('shell/Shell'));

function App() {
  return (
    <React.Suspense fallback={<LoadingShell />}>
      <Shell />
    </React.Suspense>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  text: {
    marginTop: theme.spacing(3),
  },
}));

function LoadingShell() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress />
      <Typography className={classes.text}>Loading Shell</Typography>
    </div>
  );
}

export default App;
