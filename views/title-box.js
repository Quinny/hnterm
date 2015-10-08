var blessed = require("blessed");
var config = require("../config.json");

var textBox = blessed.text({
    top: '0',
    left: 'center',
    width: config.size.width,
    height: "10%",
    tags: true,
    border: {
        type: 'line'
    },
    style: {
        fg: config.colors.font,
        border: {
            fg: config.colors.border
        },
    },
    content: "hello"
});

module.exports = textBox;
