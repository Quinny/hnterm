var blessed = require("blessed");
var hn      = require("./hn.js");
var config  = require("./config.json");

// Manages all of the views and the interactions between the views

exports.container = function() {
    var hnui = this;
    hnui.view = "stories";
    hnui.screen = blessed.screen({
        smartCSR: true
    });
    hnui.title = require("./views/title-box.js");
    hnui.screen.append(hnui.title);

    hnui.views = {
        "stories":   require("./views/topstories.js"),
        "jobs":      require("./views/jobstories.js"),
        "text-post": require("./views/text-post.js")
    }

    hnui.screen.key(config.keys.jobs, function(ch, key) {
        hnui.changeView("jobs", {});
    });

    hnui.screen.key(config.keys.stories, function(ch, key) {
        hnui.changeView("stories", {});
    });

    hnui.screen.on("keypress", function(ch, key) {
        hnui.views[hnui.view].emit(key.name, hnui);
    });

    hnui.screen.key(config.keys.quit, function(ch, key) {
          return process.exit(0);
    });

    hnui.changeView = function(view, options) {
        hnui.views[hnui.view].emit("close", hnui);
        hnui.view = view;
        hnui.views[view].emit("render", hnui, options);
    };

    hnui.views[hnui.view].emit("render", hnui);
}
