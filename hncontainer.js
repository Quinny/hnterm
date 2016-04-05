var blessed = require("blessed");
var hn      = require("./hn.js");
var config  = require("./config.json");

// Manages all of the views and the interactions between the views

exports.container = function() {
    this.view = "stories";
    this.screen = blessed.screen({
        smartCSR: true
    });
    this.title = require("./views/title-box.js");
    this.screen.append(this.title);

    this.views = {
        "stories":   require("./views/topstories.js"),
        "jobs":      require("./views/jobstories.js"),
        "text-post": require("./views/text-post.js")
    }

    this.screen.key(config.keys.jobs,    (ch, key) => this.changeView("jobs", {}));
    this.screen.key(config.keys.stories, (ch, key) => this.changeView("stories", {}))

    this.screen.on("keypress", (ch, key) =>
            this.views[this.view].emit(key.name, this));

    this.screen.key(config.keys.quit, (ch, key) => process.exit(0));
    this.changeView = (view, options) => {
        this.views[this.view].emit("close", this);
        this.view = view;
        this.views[view].emit("render", this, options);
    };

    this.views[this.view].emit("render", this);
}
