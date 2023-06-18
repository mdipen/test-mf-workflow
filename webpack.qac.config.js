const webpackConfig = require('./webpack.common.config');

let config = { ...webpackConfig };
config.mode = 'production';
config.output.publicPath = 'https://qac.workflow.structuredweb.com/';

module.exports = config;
