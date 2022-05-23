const path = require('path');
const globule = require('globule');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const MODE = process.env.NODE_ENV;
const enabledSourceMap = MODE === 'development';

const buildDefault = {
  mode: MODE,
  entry: './src/js/main.js',
  devtool: 'source-map',
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      /* ===== JS/JSX Build ===== */
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
          }
        ],
      },
      /* ===== SCSS Build ===== */
      {
        test: /\.scss/,
        use: [
          // 'style-loader',
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: enabledSourceMap,
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: enabledSourceMap,
              postcssOptions: {
                plugins: [
                  ['autoprefixer', { grid: true }]
                ]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: enabledSourceMap
            }
          }
        ]
      },
      /* ===== Images Build ===== */
      {
        test: /\.(gif|png|jpg|svg)$/,
        type: 'dist/images',
      },
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false,
    })],
  },
  plugins: [
    /* ===== CSS minify ===== */
    new MiniCssExtractPlugin({
      filename: 'css/main.css',
      ignoreOrder: true,
    }),
  ],
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