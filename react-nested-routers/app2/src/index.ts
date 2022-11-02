import('./bootstrap').then(
  ({ mount }) => {
    const localRoot = document.getElementById('app2-local');

    mount({
      mountPoint: localRoot!,
      routingStrategy: 'browser',
    });
  }
);

export {};