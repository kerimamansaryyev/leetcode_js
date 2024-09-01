/**
 * @param {number} capacity
 */
const LRUCache = function(capacity) {
    this.capacity = capacity;
    this.table = new Map()
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if(!this.table.has(key)){
        return -1
    }
    const val = this.table.get(key)
    this.table.delete(key)
    this.table.set(key, val)
    return this.table.get(key)
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if(this.table.has(key)){
        this.table.set(key, value)
        this.get(key)
        return;
    }
    if(this.table.size >= this.capacity){
        const [firstKey] = this.table.keys()
        this.table.delete(firstKey)
    }
    this.table.set(key, value)
};

function testPossibleCases(){
    const lRUCache = new LRUCache(2);
    lRUCache.put(1, 1);
    console.log(lRUCache.table); // cache is {1=1}
    lRUCache.put(2, 2);
    console.log(lRUCache.table); // cache is {1=1, 2=2}
    console.log(lRUCache.get(1))    // return 1
    lRUCache.put(3, 3);
    console.log(lRUCache.table) // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
    lRUCache.get(2);    // returns -1 (not found)
    lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
    lRUCache.get(1);    // return -1 (not found)
    lRUCache.get(3);    // return 3
    lRUCache.get(4);    // return 4
}

testPossibleCases()