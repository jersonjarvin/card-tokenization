/* eslint-disable @typescript-eslint/no-var-requires */
const { compilerOptions } = JSON.parse(require('fs').readFileSync('./tsconfig.json', 'utf8'));
const { pathsToModuleNameMapper } = require('ts-jest');

module.exports = {
  verbose: true,
  rootDir: './',
  roots: ['<rootDir>'],
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test'
  },
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  preset: 'ts-jest',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules']
};
