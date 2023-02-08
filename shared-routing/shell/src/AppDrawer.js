import React from 'react';
import {
  makeStyles,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  Person as UserIcon,
} from '@material-ui/icons';
import clsx from 'clsx';

import { Link, useMatch } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: 240,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
}));

function ListItemLink(props) {
  const selected = useMatch(props.to);
  const CustomLink = React.useMemo(
    () => React.forwardRef((linkProps, ref) => <Link ref={ref} to={props.to} {...linkProps} />),
    [props.to],
  );

  return (
    <li>
      <ListItem selected={selected} button component={CustomLink}>
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText primary={props.text} />
      </ListItem>
    </li>
  );
}

function Menu() {
  return (
    <List data-e2e="NAVIGATION_BUTTONS_BLOCK">
      <ListItemLink to="dashboard" icon={<DashboardIcon />} text="Dashboard" />
      <ListItemLink to="orders" icon={<ShoppingCartIcon />} text="Orders" />
      <ListItemLink to="profile" icon={<UserIcon />} text="Profile" />
    </List>
  );
}

export default function AppDrawer(props) {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !props.drawer.open && classes.drawerPaperClose),
      }}
      open={props.open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton data-e2e="CLOSE_SIDE_MENU__BUTTON" onClick={props.drawer.closeDrawer}>
          <ChevronLeftIcon/>
        </IconButton>
      </div>
      <Divider />
      <Menu />
    </Drawer>
  );
}
