var blessed  = require("blessed");
var spawn    = require('child_process').spawn
var view     = require("./view.js");
var hn       = require("../hn.js");
var config   = require("../config.json");
var postList = require("./post-list.js");

storiesView = new view.View();
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

storiesView.close = function(container) {
    container.screen.remove(postList);
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
