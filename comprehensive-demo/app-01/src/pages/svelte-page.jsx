import React from 'react';
import Page from '../Page';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import loadApp from 'app_04/loadApp';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const SveltePage = () => {
  const [name, setName] = React.useState('federation');
  const mountEl = React.useRef();
  const classes = useStyles();

  React.useEffect(() => {
    if (mountEl.current.innerHTML.length === 0) {
      loadApp('app_04', name);
    }
  });

  const handleChange = e => {
    setName(e.target.value);
    const event = new CustomEvent('change-name', {
      detail: {
        name: e.target.value,
      },
      bubbles: true,
      cancelable: true,
      composed: true, // makes the event jump shadow DOM boundary
    });
    let source = e.target || e.srcElement;
    source.dispatchEvent(event);
  };

  return (
    <Page title="Svelte Demo">
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Name" value={name} onChange={e => handleChange(e)} />
        <div id="app_04" ref={mountEl}></div>
      </form>
    </Page>
  );
};

export default SveltePage;
