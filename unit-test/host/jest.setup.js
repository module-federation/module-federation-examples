const { setupFederationTest } = require('../mf-test');

module.exports = async () => {
  await setupFederationTest(require('./modulefederation.config'));
};
