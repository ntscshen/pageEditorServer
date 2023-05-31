const { isDev, isProDev } = require('../utils/env');

console.log('isProDev :>> ', isProDev);
let fileName = 'dev.js';
if(isProDev) fileName = 'prd-dev.js';

const conf = require(`./${fileName}`);

module.exports = conf;