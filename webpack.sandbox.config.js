const webpackConfig = require('./webpack.common.config');

let config = { ...webpackConfig };
config.mode = 'production';
config.output.publicPath = 'https://sandbox.workflow.structuredweb.com/';

module.exports = config;
