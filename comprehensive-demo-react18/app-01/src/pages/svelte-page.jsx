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

// Avoid ID collisions with the remote container global name (`app_04`).
const SVELTE_MOUNT_ID = 'app_04_svelte_mount';

const loadSvelteApp = async () => {
  const retries = 5;
  for (let attempt = 0; attempt < retries; attempt += 1) {
    try {
      const mod = await import('app_04/loadApp');
      const candidate = mod?.default ?? mod?.loadApp ?? mod;
      if (typeof candidate === 'function') {
        return candidate;
      }
      if (candidate && typeof candidate.default === 'function') {
        return candidate.default;
      }
      return null;
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

const SvelteMount = React.memo(({ mountRef }) => <div id={SVELTE_MOUNT_ID} ref={mountRef}></div>);

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
      loadApp(SVELTE_MOUNT_ID, name);
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
    window.dispatchEvent(event);
  };

  return (
    <Page title="Svelte Demo">
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Name" value={name} onChange={e => handleChange(e)} />
        <SvelteMount mountRef={mountEl} />
      </form>
    </Page>
  );
};

export default SveltePage;
