const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
};

// Conditionally add setupFilesAfterEnv if the file exists
const fs = require('fs');
if (fs.existsSync('./jest.setup.js')) {
  customJestConfig.setupFilesAfterEnv = ['<rootDir>/jest.setup.js'];
}

module.exports = createJestConfig(customJestConfig);
