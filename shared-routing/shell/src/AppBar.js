import React from 'react';
import {
  AppBar as MuiAppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import clsx from 'clsx';
import { useServiceContext } from './Service';

const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingRight: 24,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: 240,
    width: `calc(100% - 240px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
}));

export default function AppBar(props) {
  const classes = useStyles();
  const serviceContext = useServiceContext();

  return (
    <MuiAppBar
      position="absolute"
      className={clsx(classes.appBar, props.drawer.open && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={props.drawer.openDrawer}
          className={clsx(classes.menuButton, props.drawer.open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          {serviceContext.title}
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
}
