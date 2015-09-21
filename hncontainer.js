var blessed = require("blessed");
var hn = require("./hn.js");

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

    hnui.screen.key(['escape', 'q', 'C-c'], function(ch, key) {
          return process.exit(0);
    });

    hnui.views[hnui.view].render(hnui);
}
