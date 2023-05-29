const { isDev, isProDev } = require('../utils/env');

let fileName = 'dev.js';
if(isProDev) fileName = 'prd-dev.js';

const conf = require(`./${fileName}`);

module.exports = conf;