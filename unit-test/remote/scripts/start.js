process.env.NODE_ENV = process.env.NODE_ENV || 'development';
require('./overrides/webpack-config');
require('react-scripts/scripts/start');
