const { redisConfig } = require('../config/dev');
const Redis = require('ioredis');
const redisClient = new Redis(redisConfig);

module.exports = redisClient;
