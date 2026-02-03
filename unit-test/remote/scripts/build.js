process.env.NODE_ENV = 'production';
require('./overrides/webpack-config');
require('react-scripts/scripts/build');
