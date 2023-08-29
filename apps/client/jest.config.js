module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy', // Mock CSS modules
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
