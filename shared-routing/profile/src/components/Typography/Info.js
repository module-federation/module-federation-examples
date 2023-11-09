import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core';
// core components
import styles from '../../assets/jss/material-dashboard-react/components/typographyStyle.js';

const useStyles = makeStyles(styles);

export default function Info(props) {
  const classes = useStyles();
  const { children } = props;
  return <div className={classes.defaultFontStyle + ' ' + classes.infoText}>{children}</div>;
}

Info.propTypes = {
  children: PropTypes.node,
};
