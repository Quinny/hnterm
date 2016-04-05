var fs     = require('fs');
var config = require("./config.json");

// Manage a simple cache of JSON objects with expiration times
//
// Each object is cached to a file to prevent making multiple API requests

// Write an object to a file
function writeObject(obj, filename) {
    fs.writeFile(filename, JSON.stringify(obj), function (err) {
        if (err) throw err;
    });
}

// Put data into the cache with the corresponding look up code
exports.put = (code, data) => {
    var expires = new Date();
    expires.setHours(expires.getHours() + config.cache.expires_in_hours);
    var cacheObj = {
        expires: expires,
        data:    data
    };
    writeObject(cacheObj, config.cache.dir + code);
}

// Get an object from the cache by look up code
// If the object does not exist OR has expired, false is returned
exports.get = code => {
    var cacheObj = {};
    try {
        cacheObj = require(config.cache.dir + code);
    }
    catch (e) {
        return false;
    }
    var now = new Date();
    if (now > new Date(cacheObj.expires))
        return false;
    return cacheObj.data;
}
