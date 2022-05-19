const path = require('path');
const globule = require('globule');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const buildDefault = {
  mode: process.env.NODE_ENV,
  entry: './src/js/main.js',
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js(|x)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/react',
                [
                  '@babel/preset-env',
                  {
                    'targets': {
                      'browsers': [
                        'last 2 versions',
                        '>= 5% in JP'
                      ]
                    }
                  }
                ]
              ],
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false,
    })],
  },
  plugins: [],
  target: ['web', 'es5']
};

const reactFiles = globule.find('src/**/*.jsx', {
  ignore: ['src/**/_*.jsx']
});
reactFiles.forEach((react) => {
  const html = react.split('/').slice(-1)[0].replace('.jsx', '.html');
  buildDefault.plugins.push(
    new HtmlWebpackPlugin({
      inject: false,
      filename: `${path.resolve(__dirname, 'dist')}/${html}`,
      template: react,
      minify: false
    })
  )
});

module.exports = buildDefault;