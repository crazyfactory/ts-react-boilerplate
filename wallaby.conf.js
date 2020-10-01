module.exports = function(wallaby) {
  return {
    files: [
      'src/**/*.ts',
      'src/**/*.tsx',
      '__mocks__/**/*',
      'config/**/*',
      '!src/**/*.test.ts',
      '!src/**/*.test.tsx'
    ],
    tests: [
      'src/**/*.test.ts',
      'src/**/*.test.tsx'
    ],
    env: {
      type: 'node'
    },
    testFramework: 'jest'
  };
};
