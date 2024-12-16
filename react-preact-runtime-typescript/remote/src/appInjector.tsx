import App from './App';
import { render } from 'preact';

let root: HTMLElement | null = null;

export const inject = (parentElementId: string) => {
  const parentElement = document.getElementById(parentElementId);
  if (!parentElement) {
    console.error(`Element with id '${parentElementId}' not found.`);
    return;
  }

  root = parentElement;
  render(<App />, root);
};

export const unmount = () => {
  if (root) {
    render(null, root);
    root = null;
  } else {
    console.warn(
      'Root is not defined. Ensure inject() is called before unmount().',
    );
  }
};
