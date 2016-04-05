var hn       = require("../hn.js");
var config   = require("../config.json");
var listView = require("./list-view.js");

module.exports = listView({
    title: "Job Stories",
    viewName: "jobs",
    fetchData: () => hn.get("jobstories.json"),
    extras: [
        {
            on:     config.keys.left,
            action: container => container.changeView("stories", {})
        }
    ]
});
