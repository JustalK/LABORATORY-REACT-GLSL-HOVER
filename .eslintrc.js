module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb/base',
    'plugin:prettier/recommended'
  ],
  plugins: ['react', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      alias: {
        map: [
          ['@src', './src'],
          ['@pages', './src/pages'],
          ['@constants', './src/constants'],
          ['@styles', './src/styles'],
          ['@components', './src/components'],
          ['@services', './src/services']
        ]
      }
    }
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        parser: 'flow',
        trailingComma: 'none',
        semi: false
      }
    ],
    'arrow-body-style': 0,
    'react/prop-types': 0,
    'no-return-assign': 0
  }
}
