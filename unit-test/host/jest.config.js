module.exports = {
    moduleNameMapper: {
      '^@src/(.*)$': '<rootDir>/src/$1'
    },
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.jsx?$': 'babel-jest'
    },
    setupFiles: ['<rootDir>/jest.setup.js']
  };
