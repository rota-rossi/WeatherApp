module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./src'],
        alias: {
          src: './src',
          api: './src/api',
          store: './src/store',
          types: './src/types',
          hooks: './src/hooks',
          components: './src/components',
          features: './src/features',
          assets: './assets',
        },
      },
    ],
  ],
};
