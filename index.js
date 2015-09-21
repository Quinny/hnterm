var blessed = require('blessed');
var hn = require("./hn.js");

var screen = blessed.screen({
  smartCSR: true
});

screen.title = 'my window title';

var postList = blessed.list({
    top: 'center',
    left: 'center',
    width: '50%',
    height: '50%',
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
        //'hey',
        //'there',
        //'fucker'
    ]
});

screen.append(postList);

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

screen.key("up", function(ch, key) {
    postList.up(1);
    screen.render();
});

screen.key("down", function(ch, key) {
    postList.down(1);
    screen.render();
});

hn.topStories(function(s) {
    for (var i = 0; i < s.length; ++i)
        postList.add((i + 1).toString() + ". " + s[i].title);
    screen.render();
});

// Focus our element.
postList.focus();

// Render the screen.
screen.render();

//hn.topStories(console.log);
