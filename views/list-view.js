var spawn        = require('child_process').spawn
var EventEmitter = require( "events" ).EventEmitter;

var hn       = require("../hn.js");
var config   = require("../config.json");
var postList = require("./post-list.js");

function make(createOptions) {
    var selected = 0;
    var stories  = [];
    var pipeline = new EventEmitter();

    pipeline.on("render", function (container, renderOptions) {
        container.screen.append(postList);
        postList.focus();
        container.title.content = createOptions.title;
        container.screen.render();

        createOptions.fetchData().then(function (s) {
            stories = s;
            postList.clearItems();
            for (var i = 0; i < s.length; ++i)
                postList.add((i + 1).toString() + ". " + s[i].title);
            postList.select(selected);
            container.screen.render();
        });
    });

    pipeline.on("close", function(container) {
        container.screen.remove(postList);
    });

    pipeline.on(config.keys.up, function(container) {
        selected = Math.max(selected - 1, 0);
        postList.up(1);
        container.screen.render();
    });

    pipeline.on(config.keys.down, function(container) {
        selected = Math.min(selected + 1, stories.length);
        postList.down(1);
        container.screen.render();
    });

    pipeline.on(config.keys.enter, function(container) {
        if (stories[selected].url) {
            spawn('open', [stories[selected].url]);
        }
        else {
            context = {
                post: stories[selected],
                from: createOptions.viewName
            };
            container.changeView("text-post", context);
        }
    });

    createOptions.extras.forEach(function (key) {
        pipeline.on(key.on, key.action);
    });

    return pipeline;
}

module.exports = make;
