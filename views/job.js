var blessed = require("blessed");
var view    = require("./view.js");
var config  = require("../config.json");

var box = blessed.box({
    top: 'center',
    left: 'center',
    scrollable: true,
    width: config.size.width,
    height: config.size.height,
    content: '',
    tags: true,
    border: {
        type: 'line'
    },
    style: {
        fg: config.colors.font,
        border: {
            fg: config.colors.border 
        },
    }
});

jobView = new view.View();

jobView.render = function(container, options) {
    container.screen.append(box);
    box.focus();
    box.content = options;
    container.screen.render();
}

jobView.downArrow = function(container) {
    box.scroll(-10);
    container.screen.render();
}

module.exports = jobView;
