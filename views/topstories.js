var hn       = require("../hn.js");
var config   = require("../config.json");
var listView = require("./list-view.js");

module.exports = listView({
    title: "Top Stories",
    viewName: "stories",
    fetchData: () => hn.get("topstories.json"),
    extras: [
        {
            on:     config.keys.right,
            action: container => container.changeView("jobs", {})
        }
    ]
});
