var https   = require("https");
var cache   = require("./cache-manager.js");
var config  = require("./config.json");
var baseUrl = "https://hacker-news.firebaseio.com/v0/";

// Makes get request and calls callback with the returned JSON
function getJSON(url, callback) {
    https.get(url, function(res) {
        var ret = "";
        res.on("data", function(d) {
            ret += d;
        });
        res.on("end", function() {
            callback(JSON.parse(ret));
        });
    });
}

// takes an id and gets the hacker news item
function makeItem(id, callback) {
    getJSON(baseUrl + "item/" + id + ".json", callback);
}

function hnGet(endPoint) {
    return function(callback) {
        var check = cache.get(endPoint);
        if (check)
            return callback(check);
        getJSON(baseUrl + endPoint, function (itemIds) {
            last = itemIds[itemIds.length - 1];
            var ret = [];
            itemIds.forEach(function(id) {
                makeItem(id, function(d) {
                    ret.push(d);
                    if (id == last) {
                        var expires = new Date();
                        expires.setHours(expires.getHours() +
                                config.cache.expires_in_hours);
                        cache.put(endPoint, ret, expires);
                        callback(ret);
                    }
                });
            });
        });
    };
}

exports.topStories = hnGet("topstories.json");
exports.jobStories = hnGet("jobstories.json");
