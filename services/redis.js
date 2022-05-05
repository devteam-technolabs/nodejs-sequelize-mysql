const { redisClient } = require('../config/v1/redis');

module.exports = class RedisService {
    async setCache(key, data, expiration = 3600) {
        console.log('RedisService@setCache');
        let cache = await redisClient.set(key, JSON.stringify(data), 'EX', expiration);

        if (!cache) {
            console.log('failed to cache');
            console.log(cache);
            return false;
        }

        return true
    }

    async getAllKeys() {
        console.log('RedisService@getAllKeys');
        let keys = await redisClient.keys(`*`);

        if (keys.length < 1) {
            return false;
        }

        return keys;
    }

    async getAllApplicationKeys(appName) {
        console.log('RedisService@getAllApplicationKeys');
        let keys = await redisClient.keys(`${appName}_*`);

        if (keys.length < 1) {
            return false;
        }

        return keys;
    }

    async getMatchingKeys(key) {
        console.log('RedisService@getMatchingKeys');
        let keys = await redisClient.keys(`${key}*`);

        if (keys.length < 1) {
            return false;
        }

        return keys;
    }

    async getCache(key) {
        console.log('RedisService@getCache');
        let data = await redisClient.get(key);

        if (!data) {
            console.log('failed to get cache data');
            console.log(data);
            return false;
        }

        return JSON.parse(data);
    }

    async clearCache(key) {
        console.log('RedisService@clearCache');
        let clearCache = await redisClient.del(key);

        if (clearCache < 1) {
            return false;
        }

        return true;
    }

    async clearMatchingKeys(key) {
        console.log('RedisService@clearMatchingKeys');
        let keys = await this.getMatchingKeys(key);

        if (!keys) {
            return true;
        }

        for (let x = 0; x < keys.length; x++) {
            await this.clearCache(keys[x])
        }

        return true;
    }

    async flushAll() {
        console.log('RedisService@flushAll');
        let flushAll = await redisClient.flushall();

        if (flushAll < 1) {
            return false;
        }

        return true;
    }
}