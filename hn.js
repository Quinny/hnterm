var https = require("https");
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
        var ids = [];
        getJSON(baseUrl + endPoint, function (itemIds) {
            last = itemIds[itemIds.length - 1];
            var ret = [];
            itemIds.forEach(function(id) {
                makeItem(id, function(d) {
                    ret.push(d);
                    if (id == last)
                        callback(ret);
                });
            });
        });
    };
}

exports.topStories = hnGet("topstories.json");
