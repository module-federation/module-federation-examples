import React from 'react';
import { CircularProgress, makeStyles, Paper, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
  },
}));

function Loading() {
  return (
    <Box display="flex" flex={1} justifyContent="center" alignItems="center">
      <CircularProgress />
    </Box>
  );
}

export default function Widget(props) {
  const classes = useStyles();
  return (
    <Paper style={{ height: props.height }} className={classes.paper}>
      <React.Suspense fallback={<Loading />}>{props.children}</React.Suspense>
    </Paper>
  );
}
