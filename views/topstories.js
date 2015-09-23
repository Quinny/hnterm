var blessed      = require("blessed");
var spawn        = require('child_process').spawn
var EventEmitter = require( "events" ).EventEmitter;
var view     = require("./view.js");
var hn       = require("../hn.js");
var config   = require("../config.json");
var postList = require("./post-list.js");

var selected = 0;
var stories  = [];
var pipeline = new EventEmitter();

pipeline.on("render", function(container, options) {
    container.screen.append(postList);
    postList.focus();
    container.screen.render();

    hn.topStories(function(s) {
        stories = s;
        postList.clearItems();
        for (var i = 0; i < s.length; ++i)
            postList.add((i + 1).toString() + ". " + s[i].title);
        container.screen.render();
    });
})

pipeline.on("close", function(container) {
    container.screen.remove(postList);
})

pipeline.on(config.keys.up, function(container) {
    if (selected > 0)
        --selected;
    postList.up(1);
    container.screen.render();
});

pipeline.on(config.keys.down, function(container) {
    if (selected < stories.length)
        ++selected;
    postList.down(1);
    container.screen.render();
});

pipeline.on(config.keys.enter, function() {
    spawn('open', [stories[selected].url]);
})

module.exports = pipeline;
