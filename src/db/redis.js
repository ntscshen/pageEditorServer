const { redisConfig } = require('../config/dev');
console.log('redisConfig222 :>> ', redisConfig);
const Redis = require('ioredis');
const redisClient = new Redis(redisConfig);

module.exports = redisClient;
