require('dotenv').config();
const redis = require('redis');
// use the util module from nodejs to promisify redis requests
const util = require('util');

const redisUrl = `redis://${process.env.REDIS_URL}:${process.env.REDIS_PORT}`;

const redisClient = redis.createClient(redisUrl);
redisClient.get = util.promisify(redisClient.get);
redisClient.set = util.promisify(redisClient.set);
redisClient.keys = util.promisify(redisClient.keys);
redisClient.del = util.promisify(redisClient.del);
redisClient.flushall = util.promisify(redisClient.flushall);

module.exports = {
    redisClient,
};
