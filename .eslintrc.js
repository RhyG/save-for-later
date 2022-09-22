module.exports = {
  root: true,
  extends: ['@react-native-community'],
  plugins: ['detox', 'jasmine', '@typescript-eslint', 'import'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    jsx: true,
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
  env: {
    browser: true,
    jasmine: true,
    'detox/detox': true,
    node: true,
    jest: true,
  },
  rules: {
    'no-catch-shadow': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    // 'no-cycle': 2,
    radix: 0,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.android.tsx', '.ios.tsx', '.android.js', '.ios.js'],
      },
      'babel-module': {},
    },
    react: {
      version: 'detect',
    },
  },
};
