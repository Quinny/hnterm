var blessed = require("blessed");
var config  = require("../config.json");
var EventEmitter = require( "events" ).EventEmitter;
var entities = require("entities");

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

var pipeline = new EventEmitter();
var previousView = "";

function fixNewLines(str) {
    return str.replace(/<p>/g, '\n\n');
}

pipeline.on("render", function(container, options) {
    container.screen.append(box);
    box.focus();
    container.title.content = options.post.title;
    box.content = fixNewLines(entities.decodeHTML(options.post.text));
    previousView = options.from;
    container.screen.render();
});

pipeline.on("close", function(container) {
    container.screen.remove(box);
});

pipeline.on(config.keys.left, function(container) {
    container.changeView(previousView, {});
});

pipeline.on(config.keys.up, function(container) {
    box.scroll(-10);
    container.screen.render();
});

pipeline.on(config.keys.down, function(container) {
    box.scroll(10);
    container.screen.render();
});

module.exports = pipeline;
