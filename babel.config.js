const path = require('path');

module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    [
      '@babel/preset-env',
      {
        targets: { node: 'current' },
      },
    ],
    '@babel/preset-typescript',
  ],
  env: {
    test: {
      plugins: ['react-native-config-node/transform'],
    },
    e2e: {
      plugins: ['react-native-config-node/transform'],
    },
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        alias: {
          '@app': path.resolve(__dirname, './app'),
          '@e2e': path.resolve(__dirname, './e2e'),
          '@features': path.resolve(__dirname, './app/features'),
          '@feature': path.resolve(__dirname, './app/features'),
        },
        cwd: 'babelrc',
        root: ['./app', './jest'],
        extensions: [
          '.e2e.ts',
          '.e2e.tsx',
          '.d.ts',
          '.ts',
          '.tsx',
          '.js',
          '.ios.js',
          '.android.js',
        ],
      },
    ],
    // ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
  ],
};
