var blessed = require("blessed");
var hn      = require("./hn.js");

exports.container = function() {
    var hnui = this;
    hnui.view = "stories";
    hnui.screen = blessed.screen({
        smartCSR: true
    });

    hnui.views = {
        "stories": require("./views/stories.js")
    }

    hnui.screen.key("up", function(ch, key) {
        hnui.views[hnui.view].upArrow(hnui);
    });

    hnui.screen.key("down", function(ch, key) {
        hnui.views[hnui.view].downArrow(hnui);
    });

    hnui.screen.key("enter", function(ch, key) { 
       hnui.views[hnui.view].enterKey(hnui); 
    });

    hnui.screen.key(['escape', 'q', 'C-c'], function(ch, key) {
          return process.exit(0);
    });

    hnui.changeView = function(view, options) {
        hnui.view = view;
        hnui.views[view].render(hnui, options);
    };

    hnui.views[hnui.view].render(hnui);
}
