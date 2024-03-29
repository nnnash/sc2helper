/* eslint-disable */
const { useBabelRc, override, addWebpackModuleRule } = require('customize-cra')

module.exports = override(
  useBabelRc(),
  addWebpackModuleRule({
    test: /\.(js|tsx)$/,
    use: [
      { loader: 'babel-loader' },
      {
        loader: '@wyw-in-js/webpack-loader',
        options: {
          cacheDirectory: 'src/.linaria_cache',
          sourceMap: process.env.NODE_ENV !== 'production',
        },
      },
    ],
  }),
  addWebpackModuleRule({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  })
)
