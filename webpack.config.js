const path = require('path');
require('dotenv').config();
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/, // Targets CSS files
        use: ['style-loader', 'css-loader'], // Uses style-loader and css-loader to process CSS files
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        GIT_API_KEY: JSON.stringify(process.env.GIT_API_KEY),
        IMAGE_NOT_FOUND: JSON.stringify('https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'),
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'node_modules',
      '/src/tests',
    ],
  },
};
