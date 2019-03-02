const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV === 'production'
    ? process.env.NODE_ENV
    : 'development',
  devtool: 'source-map',
  entry:
    process.env.NODE_ENV === 'production'
      ? './src/index.ts'
      : './src/test-usage/test-usage.ts',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader',
            options: {
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/typescript',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '__[hash:base64:6]',
                },
              },
            ],
          },
          {
            use: [
              'style-loader',
              'css-loader',
            ],
          },
        ],
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true,
            // attrs: [':data-src']
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
