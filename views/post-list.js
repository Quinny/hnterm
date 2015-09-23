var blessed = require("blessed");
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

module.exports = postList;
