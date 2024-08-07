

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

function root(__path) {
  return path.join(__dirname, __path);
};

const config = {
  entry: [root('./src/app/index.ts')],
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, './'),
    filename: 'index.js',
    library: '@zlux/widgets',
    libraryTarget: 'amd',
    umdNamedDefine: true
  },
  externals: [
    '@angular/core',
    '@angular/common',
    '@angular/compiler',
    '@angular/forms'
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
          'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader'
      },
      {
        /* External (or inline) file loader */
        test: /\.(jpg|png|gif|otf|ttf|woff|woff2|cur|ani)$/,
        loader: 'url-loader',
        options: {
          useRelativePath: true,
          limit: 10000,
          name: '[name].[hash:20].[ext]'
        }
      },
      {
        test: /\.css$/,
        exclude: root('./src/app'),
        use: [MiniCssExtractPlugin.loader, 'css-loader?sourceMap', 'style-loader']
      },
      {
        test: /\.css$/,
        include: root('./src/app/assets/css'),
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.css$/,
        include: root('./src/app/components'),
        use: ['css-to-string-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    modules: [
      "node_modules"
    ],
    extensions: [".js", ".ts"]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.WatchIgnorePlugin({
      paths: [
        /\.js$/,
        /\.d\.ts$/
      ]
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '**/*.metadata.json',
          to: '.'
        }
      ]
    }),
    new WebpackShellPluginNext({
      onBuildStart: {
        scripts: ['npm run metadata'],
        blocking: true,
        parallel: false
      }
    })
  ]
};

module.exports = config;


/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

