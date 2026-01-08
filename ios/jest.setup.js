/**
 * Jest setup file
 * This file runs before each test suite
 */

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Silence console errors and warnings during tests
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
};
