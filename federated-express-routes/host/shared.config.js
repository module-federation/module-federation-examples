const { dependencies: pkgDependencies } = require('./package.json');

const shared = { ...pkgDependencies };

shared.express = {
  requiredVersion: pkgDependencies.express,
  singleton: true,
  eager: true,
};

shared['express-session'] = {
  requiredVersion: pkgDependencies['express-session'],
  singleton: true,
  eager: true,
};

module.exports = { shared };
