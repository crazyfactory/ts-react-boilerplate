module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'cleanup',
        'docs',
        'feat',
        'fix',
        'followup',
        'improve',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'unfeat'
      ]
    ]
  }
};
