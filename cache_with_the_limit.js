const TimeLimitedCache = function () {
    this.cache = new Map()
};

/**
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */


TimeLimitedCache.prototype.createCacheValue = function (key, value, duration) {
    const cachedValue = {value}
    cachedValue.timeoutCancelId = setTimeout(
        () => {this.cache.delete(key)},
        duration,
    )
    this.cache.set(key, cachedValue)
}

TimeLimitedCache.prototype.set = function (key, value, duration) {
    const didExist = this.cache.has(key)
    if (didExist) {
        const existingValue = this.cache.get(key)
        clearTimeout(existingValue.timeoutCancelId)
        this.cache.delete(key)
    }
    this.createCacheValue(key, value, duration)
    return didExist
};

/**
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function (key) {
    return this.cache.get(key)?.value ?? -1;
};

/**
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function () {
    return this.cache.size;
};


async function sleep(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
}


async function executeTest() {
    const results = []
    const timeLimitedCache = new TimeLimitedCache()
    console.log(results.push(timeLimitedCache.set(1, 42, 50))); // false
    await sleep(40)
    console.log(results.push(timeLimitedCache.set(1, 50, 100)));
    await sleep(10)
    console.log(results.push(timeLimitedCache.get(1)))
    await sleep(70)
    results.push(timeLimitedCache.get(1))

    console.log(results)
}

executeTest()