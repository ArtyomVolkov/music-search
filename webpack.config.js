const webpack = require('webpack');
const path = require("path");
const DefinePlugin = require('webpack/lib/DefinePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const extractCSS = new ExtractTextPlugin('common.css');

// ENV vars
const NODE_ENV = process.env.NODE_ENV || 'DEV';
const ENV_PROD = NODE_ENV === 'PROD';

new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
});

// Loaders
const RULES = {
  styles: {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader!sass-loader',
    })
  },
  scripts: {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [ 'react', 'es2015' ],
        plugins: [ 'react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy' ]
      }
    }
  }
};
// Module
const MODULE = {
  rules: [
    RULES.styles,
    RULES.scripts
  ]
};
// Plugins
const PLUGINS = !ENV_PROD ? [extractCSS] : [
  extractCSS,
  new UglifyJsPlugin({
    minimize: true,
    compress: {
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
    },
    output: {
      comments: false
    },
  })
];

// CONFIG
module.exports = {
  entry: './src/index.js',
  devtool: "inline-source-map",
  output: {
    filename: 'main.min.js',
    path: path.join(__dirname, '/build')
  },
  resolve: {
    extensions: [ '.js', '.scss' ],
    modules: [
      path.resolve(__dirname, 'node_modules')
    ],
  },
  module: MODULE,
  plugins: PLUGINS,
  stats: {
    children: false
  }
};