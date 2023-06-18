const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpackConfig = require('./webpack.common.config');

let config = { ...webpackConfig };
config.mode = 'production';
config.output.publicPath = 'https://workflow.structuredweb.com/';

config.plugins = [
    new HtmlWebpackPlugin({
        template: './public/prod/index.html',
    }),
    new CleanWebpackPlugin(),
];

module.exports = config;
