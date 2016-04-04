var https   = require("https");
var q       = require("q");
var cache   = require("./cache-manager.js");
var config  = require("./config.json");
var baseUrl = "https://hacker-news.firebaseio.com/v0/";

// Makes get request and returns the a promise
// containing the JSON result
function getJSON(url) {
    var deferred = q.defer();
    https.get(url, function(res) {
        var ret = "";
        res.on("data", function(d) {
            ret += d;
        }).on("end", function() {
            deferred.resolve(JSON.parse(ret));
        });
    });
    return deferred.promise;
}

// takes an id and gets the hacker news item
function makeItem(id) {
    return getJSON(baseUrl + "item/" + id + ".json");
}

// Returns a list of items from the given endpoint
function hnGet(endPoint) {
    var deferred = q.defer();
    var check    = cache.get(endPoint);
    if (check) {
        deferred.resolve(check);
        return deferred.promise;
    }

    getJSON(baseUrl + endPoint)
        .then(function (x) {
            return q.all(x.map(makeItem));
        }).then(function (x) {
            cache.put(endPoint, x);
            deferred.resolve(x);
        })

    return deferred.promise;
}

exports.get = function(x) {
    return hnGet(x);
}
