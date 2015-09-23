var blessed = require("blessed");
var hn      = require("./hn.js");
var config  = require("./config.json");

exports.container = function() {
    var hnui = this;
    hnui.view = "stories";

    hnui.screen = blessed.screen({
        smartCSR: true
    });

    hnui.views = {
        "stories": require("./views/topstories.js"),
        "jobs"   : require("./views/jobstories.js"),
        "job"    : require("./views/job.js")
    }

    hnui.screen.key(config.keys.up, function(ch, key) {
        hnui.views[hnui.view].upArrow(hnui);
    });

    hnui.screen.key(config.keys.down, function(ch, key) {
        hnui.views[hnui.view].downArrow(hnui);
    });

    hnui.screen.key(config.keys.enter, function(ch, key) {
       hnui.views[hnui.view].enterKey(hnui);
    });

    hnui.screen.key(config.keys.jobs, function(ch, key) {
        hnui.changeView("jobs", {});
    });

    hnui.screen.key(config.keys.stories, function(ch, key) {
        hnui.changeView("stories", {});
    });

    hnui.screen.key(config.keys.quit, function(ch, key) {
          return process.exit(0);
    });

    hnui.changeView = function(view, options) {
        hnui.views[hnui.view].close(hnui);
        hnui.view = view;
        hnui.views[view].render(hnui, options);
    };

    hnui.views[hnui.view].render(hnui);
}
