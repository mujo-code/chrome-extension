const path = require('path')

const resolveRoot = dir => path.resolve(__dirname, '../', dir)

module.exports = {
  coverageThreshold: {
    global: {
      statments: 75,
      branches: 55,
      functions: 70,
      lines: 75,
    },
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/background/storage/migrations/*.js',
  ],
  setupFiles: [
    'react-app-polyfill/jsdom',
    '@mujo/jest-webextension-mock',
  ],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  testEnvironment: 'jest-environment-jsdom-fourteen',
  transform: {
    '^.+\\.js$': path.resolve(
      __dirname,
      './babel-jest.transformer.js'
    ),
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  modulePaths: [],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '^react$': resolveRoot('./node_modules/react'),
    '^@mujo/plugins$': resolveRoot('./node_modules/@mujo/plugins'),
    '^@mujo/ingress$': resolveRoot('./node_modules/@mujo/ingress'),
    '^@mujo/ui$': resolveRoot('./node_modules/@mujo/ui'),
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: [
    'web.js',
    'js',
    'web.ts',
    'json',
    'web.jsx',
    'jsx',
    'node',
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}
