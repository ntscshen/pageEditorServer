const { redisConfig } = require('../config');
console.log('redisConfig222 :>> ', redisConfig);
const Redis = require('ioredis');
const redisClient = new Redis(redisConfig);

module.exports = redisClient;
