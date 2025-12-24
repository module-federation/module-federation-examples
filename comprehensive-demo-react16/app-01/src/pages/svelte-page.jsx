import React from 'react';
import Page from '../Page';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const loadSvelteApp = async () => {
  const retries = 5;
  for (let attempt = 0; attempt < retries; attempt += 1) {
    try {
      const mod = await import('app_04/loadApp');
      return mod.default;
    } catch (error) {
      if (attempt === retries - 1) {
        console.warn('[app_01] failed to load app_04/loadApp', error);
        return null;
      }
      await sleep(1000 * (attempt + 1));
    }
  }
  return null;
};

const SveltePage = () => {
  const [name, setName] = React.useState('federation');
  const mountEl = React.useRef();
  const classes = useStyles();

  React.useEffect(() => {
    const mount = async () => {
      if (!mountEl.current || mountEl.current.innerHTML.length !== 0) {
        return;
      }
      const loadApp = await loadSvelteApp();
      if (!loadApp || !mountEl.current || mountEl.current.innerHTML.length !== 0) {
        return;
      }
      loadApp('app_04', name);
    };

    mount();
  }, []);

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
