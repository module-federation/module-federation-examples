const config = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    'Remote/Button': '<rootDir>/../remote/src/components/Button',
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '!**/__tests__/**/*.cy.[jt]s?(x)']
};

module.exports = config;
