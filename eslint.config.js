const cypress = require('eslint-plugin-cypress')

module.exports = [
  {
    files: ['cypress/**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        cy: 'readonly',
        Cypress: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        before: 'readonly',
        beforeEach: 'readonly',
        expect: 'readonly'
      }
    },
    plugins: {
      cypress
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      semi: ['error', 'never'],
      quotes: ['error', 'single', { avoidEscape: true }]
    }
  }
]