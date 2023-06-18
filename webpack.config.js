const webpackConfig = require('./webpack.common.config');
const path = require('path');

let config = { ...webpackConfig };
config.entry = './src/index';
config.devtool = 'source-map';
config.devServer = {
    port: 8084,
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
};

module.exports = config;
