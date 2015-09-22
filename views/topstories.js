var blessed = require("blessed");
var spawn   = require('child_process').spawn
var views   = require("./view.js");
var hn      = require("../hn.js");
var config  = require("../config.json");

var postList = blessed.list({
    top: 'center',
    left: 'center',
    width: config.size.width,
    height: config.size.height,
    tags: true,
    border: {
        type: 'line'
    },
    style: {
        fg: config.colors.font,
        border: {
            fg: config.colors.border
        },
        selected: {
            fg: config.colors.font,
            bg: config.colors.selected
        }
    },
    items: [
        "Loading..."
    ]
});

storiesView = new views.View();
var selected = 0;
var stories = [];

storiesView.render = function(container, options) {
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
}

storiesView.upArrow = function(container) {
    if (selected > 0)
        --selected;
    postList.up(1);
    container.screen.render();
};

storiesView.downArrow = function(container) {
    if (selected < stories.length)
        ++selected;
    postList.down(1);
    container.screen.render();
};

storiesView.enterKey = function() {
    spawn('open', [stories[selected].url]);
}

module.exports = storiesView;
