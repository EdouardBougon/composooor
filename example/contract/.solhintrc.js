module.exports = {
  extends: 'solhint:default',
  rules: {
    'max-line-length': [
      'warn',
      120
    ],
    'compiler-version': [
      'error',
      '>=0.8.9'
    ],
    'reason-string': [
      'warn',
      {
        maxLength: 120
      }
    ],
    'no-empty-blocks': 'off',
    'mark-callable-contracts': 'off',
    'not-rely-on-time': 'off'
  }
}
