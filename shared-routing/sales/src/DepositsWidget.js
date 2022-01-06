import React from 'react';
import { Box, Button, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function DepositsWidget() {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="column" flex={1}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Recent Deposits
      </Typography>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on 15 March, 2019
      </Typography>
      <div>
        <Button color="primary">View balance</Button>
      </div>
    </Box>
  );
}
