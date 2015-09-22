var fs     = require('fs');
var config = require("./config.json");

function writeObject(obj, filename) {
    fs.writeFile(filename, JSON.stringify(obj), function (err) {
        if (err) throw err;
    });
}

exports.put = function(code, data, expires) {
    var cacheObj = {
        expires: expires,
        data:    data
    };
    writeObject(cacheObj, config.cache.dir + code);
}

exports.get = function(code) {
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
