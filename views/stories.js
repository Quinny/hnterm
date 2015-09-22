var blessed = require("blessed");
var views   = require("./view.js");
var hn      = require("../hn.js");
var spawn   = require('child_process').spawn

var postList = blessed.list({
    top: 'center',
    left: 'center',
    width: '80%',
    height: '80%',
    tags: true,
    border: {
        type: 'line'
    },
    style: {
        border: {
            fg: '#f0f0f0'
        },
        selected: {
            bg: "#ff0000"
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
            postList.add((i + 1).toString() + ". " + s[i].title + " " + s[i].type);
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
