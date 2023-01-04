import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { Paper } from '@material-ui/core';
import React from 'react';
import ReactMarkdown from 'markdown-to-jsx';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  listItem: {
    marginTop: theme.spacing(1),
  },
  blockquote: {
    margin: 0,
    padding: theme.spacing(2, 0, 2, 4),
    borderLeft: `${theme.spacing(1)}px solid ${theme.palette.divider}`,
    color: theme.palette.text.hint,
  },
});

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h5',
      },
    },
    h2: { component: Typography, props: { gutterBottom: true, variant: 'h6' } },
    h3: {
      component: Typography,
      props: { gutterBottom: true, variant: 'subtitle1' },
    },
    h4: {
      component: Typography,
      props: { gutterBottom: true, variant: 'caption', paragraph: true },
    },
    p: { component: Typography, props: { paragraph: true } },
    a: { component: Link },
    li: {
      component: withStyles(styles)(({ classes, ...props }) => (
        <li className={classes.listItem}>
          <Typography component="span" {...props} />
        </li>
      )),
    },
    pre: {
      component: Paper,
      props: { elevation: 0, style: { padding: '4px 8px' } },
    },
    blockquote: {
      component: withStyles(styles)(({ classes, ...props }) => (
        <blockquote className={classes.blockquote}>
          <Typography component="span" {...props} />
        </blockquote>
      )),
    },
  },
};

export default function Markdown(props) {
  return <ReactMarkdown options={options} {...props} />;
}
