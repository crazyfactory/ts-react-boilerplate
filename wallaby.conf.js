module.exports = function () {
  return {
    files: ['src/**/*.ts', 'src/**/*.tsx', '!src/**/*.test.ts', '!src/**/*.test.tsx'],
    tests: ['src/**/*.test.ts', 'src/**/*.test.ts'],
    env: {
      type: 'node',
      runner: 'node'
    },
    testFramework: 'jest'
  };
};
