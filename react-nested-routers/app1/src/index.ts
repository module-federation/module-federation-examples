import('./bootstrap').then(
  ({ mount }) => {
    const localRoot = document.getElementById('app1-local');

    mount({
      mountPoint: localRoot!,
      routingStrategy: 'browser',
    });
  }
);

export {};
