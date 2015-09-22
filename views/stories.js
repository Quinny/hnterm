var blessed = require("blessed");
var views   = require("./view.js");
var hn      = require("../hn.js");

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
storiesView.render = function(container, options) {
    container.screen.append(postList);
    postList.focus();
    container.screen.render();

    hn.topStories(function(s) {
        postList.clearItems();
        for (var i = 0; i < s.length; ++i)
            postList.add((i + 1).toString() + ". " + s[i].title);
        container.screen.render();
    });
}

storiesView.upArrow = function(container) {
    postList.up(1);
    container.screen.render();
};

storiesView.downArrow = function(container) {
    postList.down(1);
    container.screen.render();
};

module.exports = storiesView;
