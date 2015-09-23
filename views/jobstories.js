var blessed = require("blessed");
var spawn   = require('child_process').spawn

var view     = require("./view.js");
var hn       = require("../hn.js");
var config   = require("../config.json");
var postList = require("./post-list.js");

jobStoriesView = new view.View();
var selected = 0;
var stories = [];

jobStoriesView.render = function(container, options) {
    container.screen.append(postList);
    postList.focus();
    container.screen.render();

    hn.jobStories(function(s) {
        stories = s;
        postList.clearItems();
        for (var i = 0; i < s.length; ++i)
            postList.add((i + 1).toString() + ". " + s[i].title);
        container.screen.render();
    });
}

jobStoriesView.close = function(container) {
    container.screen.remove(postList);
}

jobStoriesView.upArrow = function(container) {
    if (selected > 0)
        --selected;
    postList.up(1);
    container.screen.render();
};

jobStoriesView.downArrow = function(container) {
    if (selected < stories.length)
        ++selected;
    postList.down(1);
    container.screen.render();
};

jobStoriesView.enterKey = function(container) {
    if (stories[selected].text) {
        container.changeView("job", stories[selected].text);
    }
}

module.exports = jobStoriesView;
