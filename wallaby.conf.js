module.exports = function () {
  return {
    files: [
      // There are not only .ts files, also .tsx, .png used.
      // also config/main.js is used from one the files
      {pattern: 'config/main.js'},
      {pattern: 'src/**/*.ts*'},
      {pattern: 'src/**/*.png'},
      {pattern: 'src/**/*.test.ts*', ignore: true}
    ],
    tests: [
      {pattern: 'src/**/*.test.ts*'},
      {pattern: 'src/**/*.snap', ignore: true}
    ],
    env: {
      type: 'node',
      runner: 'node'
    },
    testFramework: 'jest'
  };
};
